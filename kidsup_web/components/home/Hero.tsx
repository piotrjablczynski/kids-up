"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Hero({
  tagline,
  heading,
  headingHighlight,
  description,
}: {
  tagline: string;
  heading: string;
  headingHighlight: string;
  description: string;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #eef8ff 0%, #fdf3f8 50%, #fff8ea 100%)" }}
      aria-label="Sekcja powitalna"
    >
      <div
        aria-hidden="true"
        className="absolute top-6 right-6 w-72 h-72 blob-shape opacity-20 animate-blob"
        style={{ background: "var(--brand-blue)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-56 h-56 blob-shape opacity-20 animate-float-slow"
        style={{ background: "var(--brand-orange)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-24 h-24 blob-shape opacity-10 animate-float"
        style={{ background: "var(--brand-pink)" }}
      />

      <div className="container-site section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 text-white"
              style={{ backgroundColor: "var(--brand-blue)" }}
            >
              <Sparkles size={14} />
              {tagline}
            </span>

            <h1 className="text-[clamp(2.1rem,5vw,3.4rem)] font-black leading-tight mb-5">
              {heading}{" "}
              <span style={{ color: "var(--brand-pink)" }}>{headingHighlight}</span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/kontakt" className="btn-primary text-base">
                Umów wizytę
              </Link>
              <Link href="/oferta" className="btn-outline text-base">
                Zobacz ofertę
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: "Bez skierowania" },
                { label: "WWR bezpłatnie z dotacji" },
                { label: "Ząbki, blisko domu" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <ShieldCheck size={18} style={{ color: "var(--brand-green)" }} />
                  <span className="text-sm font-semibold text-dark">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute inset-0 blob-shape opacity-20 animate-blob"
                style={{ background: "var(--brand-cyan)" }}
              />
              <Image
                src="/images/hero-dzieci.jpg"
                alt="Dzieci podczas zajęć terapeutycznych w Kids Up"
                width={560}
                height={460}
                className="relative z-10 rounded-[2rem] shadow-xl object-cover w-full h-[380px]"
                priority
              />
              <motion.div
                className="absolute -bottom-6 -left-6 z-20 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="text-3xl">⭐</span>
                <div>
                  <p className="font-bold text-dark text-sm">Niepubliczna poradnia</p>
                  <p className="text-xs text-gray-400">Ząbki, powiat wołomiński</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
