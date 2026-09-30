import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z Niepubliczną Poradnią Psychologiczno-Pedagogiczną Kids Up w Ząbkach. Umów wizytę, zapytaj o WWR lub diagnozę dla dziecka.",
};

export default async function KontaktPage() {
  const page = await getPageContent("kontakt");

  const details = [
    { icon: MapPin, label: "Adres", value: (page?.address as string) ?? "" },
    { icon: Phone, label: "Telefon", value: (page?.phone as string) ?? "" },
    { icon: Mail, label: "E-mail", value: (page?.email as string) ?? "" },
    { icon: Clock, label: "Godziny", value: (page?.hours as string) ?? "" },
  ];

  return (
    <>
      <PageHero tagline="Skontaktuj się" heading="Kontakt" />

      <section className="section-padding">
        <div className="container-site grid lg:grid-cols-2 gap-12">
          <Reveal>
            {page?.content && (
              <div className="prose-content mb-8" dangerouslySetInnerHTML={{ __html: page.content }} />
            )}

            <div className="space-y-5">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                    <d.icon size={20} style={{ color: "var(--brand-blue)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{d.label}</p>
                    <p className="text-dark font-semibold">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="bg-surface rounded-2xl p-8 border border-border">
            <h2 className="font-bold text-dark text-xl mb-6">Formularz kontaktowy</h2>
            <form className="space-y-4">
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
              <button type="submit" className="btn-primary w-full justify-center">
                Wyślij wiadomość
              </button>
              <p className="text-xs text-gray-400 text-center">
                Formularz jest na razie makietą — podłączenie wysyłki (np. e-mail/API) zrobimy w kolejnym kroku.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
