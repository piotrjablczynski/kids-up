import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import EmailImage from "@/components/ui/EmailImage";
import { getPageContent } from "@/lib/content";
import { PORADNIA } from "@/lib/poradniaInfo";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z Niepubliczną Poradnią Psychologiczno-Pedagogiczną Kids Up w Ząbkach. Umów wizytę, zapytaj o WWR lub diagnozę dla dziecka.",
};

export default async function KontaktPage() {
  const page = await getPageContent("kontakt");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(PORADNIA.mapsQuery)}&output=embed`;

  return (
    <>
      <PageHero tagline="Skontaktuj się" heading="Kontakt" />

      <section className="section-padding">
        <div className="container-site max-w-2xl mx-auto">
          <Reveal>
            {page?.content && (
              <div className="prose-content mb-8" dangerouslySetInnerHTML={{ __html: page.content }} />
            )}

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} style={{ color: "var(--brand-blue)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Adres</p>
                  <p className="text-dark font-semibold">
                    {PORADNIA.ulica}, {PORADNIA.kodMiasto}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                  <Phone size={20} style={{ color: "var(--brand-blue)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Telefon</p>
                  <a href={PORADNIA.telefonHref} className="text-dark font-semibold hover:text-brand-blue transition-colors">
                    {PORADNIA.telefon}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--brand-blue)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">E-mail</p>
                  <EmailImage variant="dark" />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                  <Clock size={20} style={{ color: "var(--brand-blue)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Godziny</p>
                  <p className="text-dark font-semibold">{PORADNIA.godziny}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border shadow-card h-[280px]">
              <iframe
                src={mapSrc}
                title={`Mapa — Kids Up, ${PORADNIA.mapsQuery}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
