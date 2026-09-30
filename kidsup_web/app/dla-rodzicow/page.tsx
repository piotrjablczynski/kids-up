import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { getAllTematy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dla rodziców",
  description:
    "Praktyczne teksty o najczęstszych trudnościach rozwojowych dzieci — ADHD, WWR, spektrum autyzmu, dysleksja i inne tematy, przygotowane przez zespół Kids Up.",
};

const colors = ["var(--brand-blue)", "var(--brand-pink)", "var(--brand-orange)", "var(--brand-green)", "var(--brand-purple)", "var(--brand-cyan)"];

export default async function DlaRodzicowPage() {
  const tematy = await getAllTematy();

  return (
    <>
      <PageHero
        tagline="Poradnik"
        heading="Dla rodziców"
        description="Krótkie, praktyczne teksty o najczęstszych trudnościach rozwojowych dzieci — bez żargonu, za to z konkretną podpowiedzią, co robić dalej."
      />

      <section className="section-padding">
        <div className="container-site">
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tematy.map((temat, i) => (
              <Reveal key={temat.slug} delay={(i % 6) * 0.06}>
                <Link
                  href={`/dla-rodzicow/${temat.slug}`}
                  className="flex flex-col h-full bg-white rounded-2xl p-6 shadow-card card-hover border border-border"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${colors[i % colors.length]}1a` }}
                  >
                    <Icon name={temat.icon} size={22} />
                  </div>
                  <h2 className="font-bold text-dark mb-2 leading-snug">{temat.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{temat.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
