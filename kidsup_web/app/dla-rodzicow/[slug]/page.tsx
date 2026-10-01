import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { getAllTematy, getTemat, getAllOfertaItems, getAllWwrArticles } from "@/lib/content";

export async function generateStaticParams() {
  const tematy = await getAllTematy();
  return tematy.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const temat = await getTemat(slug);
  if (!temat) return {};
  return {
    title: temat.title,
    description: temat.excerpt,
  };
}

export default async function TematDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const temat = await getTemat(slug);
  if (!temat) notFound();

  const [allOferta, allWwr] = await Promise.all([getAllOfertaItems(), getAllWwrArticles()]);
  const related = allOferta.filter((o) => temat.relatedOferta?.includes(o.slug));
  const relatedWwr = allWwr.filter((a) => temat.relatedWwr?.includes(a.slug));

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #eff8ff 0%, #fdf3f8 55%, #fff9ec 100%)" }}
      >
        <div className="container-site section-padding relative z-10">
          <Reveal className="max-w-3xl">
            <Link href="/dla-rodzicow" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-blue mb-6">
              <ArrowLeft size={16} />
              Wróć do poradnika
            </Link>

            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-card mb-5">
              <Icon name={temat.icon} size={26} />
            </div>

            <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black leading-tight mb-4">{temat.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{temat.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site grid lg:grid-cols-3 gap-12">
          <Reveal className="prose-content lg:col-span-2">
            <div dangerouslySetInnerHTML={{ __html: temat.content }} />
          </Reveal>

          <div className="space-y-6">
            <Reveal className="bg-surface rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-dark mb-3">Umów konsultację</h3>
              <p className="text-sm text-gray-500 mb-4">Porozmawiajmy o Twoim dziecku — pomożemy dobrać dalsze kroki.</p>
              <Link href="/kontakt" className="btn-primary w-full justify-center">
                Umów wizytę
              </Link>
            </Reveal>

            {relatedWwr.length > 0 && (
              <Reveal delay={0.1} className="bg-surface rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-dark mb-3">Zobacz też</h3>
                <ul className="space-y-2">
                  {relatedWwr.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/wczesne-wspomaganie-rozwoju/${a.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:gap-2.5 transition-all"
                      >
                        {a.title}
                        <ArrowRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {related.length > 0 && (
              <Reveal delay={0.15} className="bg-surface rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-dark mb-3">Powiązana oferta</h3>
                <ul className="space-y-2">
                  {related.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/oferta/${o.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:gap-2.5 transition-all"
                      >
                        {o.title}
                        <ArrowRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
