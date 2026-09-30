import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { getAllOfertaItems, getOfertaItem, getAllTematy } from "@/lib/content";

export async function generateStaticParams() {
  const items = await getAllOfertaItems();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getOfertaItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function OfertaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getOfertaItem(slug);
  if (!item) notFound();

  const allTematy = await getAllTematy();
  const related = allTematy.filter((t) => item.relatedTematy?.includes(t.slug));

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #eff8ff 0%, #fdf3f8 55%, #fff9ec 100%)" }}
      >
        <div className="container-site section-padding relative z-10">
          <Reveal className="max-w-3xl">
            <Link href="/oferta" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-blue mb-6">
              <ArrowLeft size={16} />
              Wróć do oferty
            </Link>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-card flex-shrink-0">
                <Icon name={item.icon} size={26} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-black" style={{ color: "var(--brand-blue)" }}>
                  {item.price}
                </span>
                {item.duration && (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                    <Clock size={14} />
                    {item.duration}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black leading-tight mb-3">{item.title}</h1>
            {item.priceNote && <p className="text-sm text-gray-500 mb-4">{item.priceNote}</p>}
            <p className="text-gray-600 text-lg leading-relaxed">{item.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site grid lg:grid-cols-3 gap-12">
          <Reveal className="prose-content lg:col-span-2">
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </Reveal>

          <div className="space-y-6">
            <Reveal className="bg-surface rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-dark mb-3">Umów się</h3>
              <p className="text-sm text-gray-500 mb-4">Zadzwoń lub napisz — pomożemy dobrać termin.</p>
              <Link href="/kontakt" className="btn-primary w-full justify-center">
                Umów wizytę
              </Link>
            </Reveal>

            {related.length > 0 && (
              <Reveal delay={0.1} className="bg-surface rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-dark mb-3">Powiązane tematy</h3>
                <ul className="space-y-2">
                  {related.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/dla-rodzicow/${t.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:gap-2.5 transition-all"
                      >
                        {t.title}
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
