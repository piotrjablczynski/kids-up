import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Temat } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

const colors = ["var(--brand-blue)", "var(--brand-pink)", "var(--brand-orange)", "var(--brand-green)"];

export default function TematyPreview({ tematy }: { tematy: Temat[] }) {
  if (tematy.length === 0) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-title">Dla rodziców</h2>
          <p className="section-subtitle mx-auto">
            Krótkie, praktyczne teksty o najczęstszych trudnościach rozwojowych dzieci.
          </p>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tematy.map((temat, i) => (
            <Reveal key={temat.slug} delay={i * 0.07}>
              <Link
                href={`/dla-rodzicow/${temat.slug}`}
                className="block h-full bg-white rounded-2xl p-6 shadow-card card-hover border border-border"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${colors[i % colors.length]}1a` }}
                >
                  <Icon name={temat.icon} size={22} className="" />
                </div>
                <h3 className="font-bold text-dark mb-2 leading-snug">{temat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{temat.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal className="text-center mt-10">
          <Link href="/dla-rodzicow" className="inline-flex items-center gap-2 font-bold text-brand-blue hover:gap-3 transition-all">
            Zobacz wszystkie tematy
            <ArrowRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
