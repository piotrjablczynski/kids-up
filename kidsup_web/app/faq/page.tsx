import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — najczęstsze pytania",
  description:
    "Odpowiedzi na najczęstsze pytania rodziców o ofertę, WWR, ceny i zapisy w Niepublicznej Poradni Psychologiczno-Pedagogicznej Kids Up w Ząbkach.",
};

interface FaqItem {
  q: string;
  a: string;
}

export default async function FaqPage() {
  const page = await getPageContent("faq");
  const faq = (page?.faq as FaqItem[] | undefined) ?? [];

  return (
    <>
      <PageHero
        tagline={(page?.hero_tagline as string) ?? "Pytania i odpowiedzi"}
        heading={(page?.hero_heading as string) ?? "Najczęściej zadawane pytania"}
      />

      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <RevealGroup className="space-y-4">
            {faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05} className="bg-white rounded-2xl p-6 shadow-card border border-border">
                <h2 className="font-bold text-dark mb-2">{item.q}</h2>
                <p className="text-gray-500 leading-relaxed">{item.a}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
