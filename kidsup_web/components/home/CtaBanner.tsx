import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export default function CtaBanner() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <Reveal
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center"
          style={{ background: "linear-gradient(120deg, #fff3e0, #ffeef6)" }}
        >
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -left-10 w-72 h-72 blob-shape opacity-25 animate-blob"
            style={{ background: "var(--brand-orange)" }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="section-title">Porozmawiajmy o Twoim dziecku</h2>
            <p className="text-gray-600 text-lg mb-8">
              Umów pierwszą konsultację — pomożemy dobrać właściwą ścieżkę
              diagnozy albo terapii.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt" className="btn-primary text-base">
                Umów wizytę
              </Link>
              <Link href="/wczesne-wspomaganie-rozwoju" className="btn-secondary text-base">
                Zapytaj o WWR
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
