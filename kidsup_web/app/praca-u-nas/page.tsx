import type { Metadata } from "next";
import { Mail } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { getAllJobPostings, getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Praca u nas",
  description:
    "Kids Up, niepubliczna poradnia psychologiczno-pedagogiczna w Ząbkach, poszukuje specjalistów: neurologopedy, psychologa, terapeuty SI, fizjoterapeuty dziecięcego.",
};

export default async function PracaUNasPage() {
  const page = await getPageContent("praca-u-nas");
  const jobs = await getAllJobPostings();

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
            <Reveal className="prose-content mb-12">
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </Reveal>
          )}

          <RevealGroup className="space-y-6">
            {jobs.map((job, i) => (
              <Reveal key={job.slug} delay={i * 0.06} className="bg-white rounded-2xl p-7 shadow-card border border-border">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h2 className="font-bold text-dark text-xl">{job.role}</h2>
                  <span
                    className="badge-soft"
                    style={
                      job.status.toLowerCase().includes("pilnie")
                        ? { backgroundColor: "rgba(236,30,107,0.12)", color: "var(--brand-pink)" }
                        : { backgroundColor: "rgba(30,136,229,0.12)", color: "var(--brand-blue)" }
                    }
                  >
                    {job.status}
                  </span>
                </div>
                {job.note && <p className="text-xs text-gray-400 mb-4 italic">{job.note}</p>}
                <div className="prose-content" dangerouslySetInnerHTML={{ __html: job.content }} />
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="text-center mt-12 bg-surface rounded-2xl p-8 border border-border">
            <p className="text-gray-600 mb-4">
              Nie widzisz swojej specjalizacji? Napisz mimo wszystko — chętnie porozmawiamy.
            </p>
            <a
              href="mailto:kontakt@kids-up.pl?subject=Rekrutacja%20Kids%20Up"
              className="btn-primary inline-flex"
            >
              <Mail size={18} />
              kontakt@kids-up.pl
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
