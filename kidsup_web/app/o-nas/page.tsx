import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock3 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "O nas — zespół Kids Up",
  description:
    "Poznaj zespół Niepublicznej Poradni Psychologiczno-Pedagogicznej Kids Up w Ząbkach — psychologów, pedagogów, logopedów i terapeutów pracujących z dziećmi.",
};

interface TeamMember {
  role: string;
  desc: string;
  status: string;
}

export default async function ONasPage() {
  const page = await getPageContent("o-nas");
  const team = (page?.team as TeamMember[] | undefined) ?? [];

  return (
    <>
      <PageHero
        tagline={(page?.hero_tagline as string) ?? "Poznaj nas"}
        heading={(page?.hero_heading as string) ?? "Zespół, który słucha i rozumie"}
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
            <h2 className="section-title">{(page?.mission_heading as string) ?? "Nasz zespół"}</h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.role} delay={i * 0.06} className="bg-white rounded-2xl p-6 shadow-card border border-border">
                <h3 className="font-bold text-dark mb-2">{member.role}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{member.desc}</p>
                <span
                  className="badge-soft"
                  style={
                    member.status.toLowerCase().includes("od startu")
                      ? { backgroundColor: "rgba(124,179,66,0.15)", color: "#4f7a1f" }
                      : { backgroundColor: "rgba(30,136,229,0.12)", color: "var(--brand-blue)" }
                  }
                >
                  {member.status.toLowerCase().includes("od startu") ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Clock3 size={14} />
                  )}
                  {member.status}
                </span>
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
