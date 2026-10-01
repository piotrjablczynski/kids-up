import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "O nas — Kids Up",
  description:
    "Poznaj Niepubliczną Poradnię Psychologiczno-Pedagogiczną Kids Up w Ząbkach — obszary wsparcia i podejście do pracy z dziećmi.",
};

interface ExpertiseArea {
  role: string;
  desc: string;
}

export default async function ONasPage() {
  const page = await getPageContent("o-nas");
  const expertise = (page?.expertise as ExpertiseArea[] | undefined) ?? [];

  return (
    <>
      <PageHero
        tagline={(page?.hero_tagline as string) ?? "Poznaj nas"}
        heading={(page?.hero_heading as string) ?? "Poradnia, która słucha i rozumie"}
      />

      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <Reveal className="prose-content" >
            <div dangerouslySetInnerHTML={{ __html: page?.content ?? "" }} />
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-site">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">{(page?.mission_heading as string) ?? "Obszary, w których wspieramy dzieci"}</h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((area, i) => (
              <Reveal key={area.role} delay={i * 0.06} className="bg-white rounded-2xl p-6 shadow-card border border-border">
                <h3 className="font-bold text-dark mb-2">{area.role}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{area.desc}</p>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="text-center mt-10">
            <Link href="/praca-u-nas" className="btn-primary">
              Dołącz do zespołu
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
