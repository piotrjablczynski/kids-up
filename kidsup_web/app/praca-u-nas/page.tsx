import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Praca u nas",
  description:
    "Kids Up, niepubliczna poradnia psychologiczno-pedagogiczna w Ząbkach, buduje zespół specjalistów pracujących z dziećmi. Sprawdź, z kim chętnie nawiążemy współpracę.",
};

export default async function PracaUNasPage() {
  const page = await getPageContent("praca-u-nas");
  const specjalizacje = (page?.specjalizacje as string[] | undefined) ?? [];

  return (
    <>
      <PageHero
        tagline={(page?.hero_tagline as string) ?? "Dołącz do zespołu"}
        heading={(page?.hero_heading as string) ?? "Pracuj z nami w Kids Up"}
        description={page?.hero_description as string | undefined}
      />

      <section className="section-padding">
        <div className="container-site max-w-3xl">
          {page?.content && (
            <Reveal className="prose-content mb-10">
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </Reveal>
          )}

          <RevealGroup className="grid sm:grid-cols-2 gap-4 mb-12">
            {specjalizacje.map((s, i) => (
              <Reveal
                key={s}
                delay={i * 0.05}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-card border border-border"
              >
                <CheckCircle2 size={20} style={{ color: "var(--brand-green)" }} className="flex-shrink-0" />
                <span className="font-semibold text-dark text-sm">{s}</span>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="text-center bg-surface rounded-2xl p-8 border border-border">
            <p className="text-gray-600 mb-4">
              Nie widzisz swojej specjalizacji na liście? Napisz mimo wszystko — chętnie porozmawiamy
              o formie współpracy dopasowanej do Twojego doświadczenia.
            </p>
            <Link href="/kontakt" className="btn-primary inline-flex">
              Napisz do nas
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
