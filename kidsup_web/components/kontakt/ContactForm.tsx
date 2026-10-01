"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      // honeypot — pole niewidoczne dla ludzi, boty formularzowe często je wypełniają
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Nie udało się wysłać wiadomości.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Nie udało się wysłać wiadomości.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <CheckCircle2 size={48} style={{ color: "var(--brand-green)" }} className="mb-4" />
        <h3 className="font-bold text-dark text-lg mb-2">Wiadomość wysłana</h3>
        <p className="text-gray-500 text-sm">Odpowiemy najszybciej, jak się da.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-dark mb-1.5">
          Imię i nazwisko
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-dark mb-1.5">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-1.5">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-xl border border-border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-dark mb-1.5">
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-xl border border-border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

      {/* Honeypot — ukryte polem dla botów, ludzie go nie widzą ani nie wypełniają */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Firma</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-xl p-3">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full justify-center disabled:opacity-60">
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Wysyłanie...
          </>
        ) : (
          "Wyślij wiadomość"
        )}
      </button>
    </form>
  );
}
