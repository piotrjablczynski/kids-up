import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import {
  getAllWwrArticles,
  getWwrArticle,
  getAllOfertaItems,
  getAllTematy,
} from "@/lib/content";

export async function generateStaticParams() {
  const items = await getAllWwrArticles();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWwrArticle(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.metaDescription || item.excerpt,
  };
}

export default async function WwrArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getWwrArticle(slug);
  if (!item) notFound();

  const [allWwr, allOferta, allTematy] = await Promise.all([
    getAllWwrArticles(),
    getAllOfertaItems(),
    getAllTematy(),
  ]);

  const relatedWwr = allWwr.filter((a) => item.relatedWwr?.includes(a.slug));
  const relatedOferta = allOferta.filter((o) => item.relatedOferta?.includes(o.slug));
  const relatedTematy = allTematy.filter((t) => item.relatedTematy?.includes(t.slug));
  const hasRelated = relatedWwr.length + relatedOferta.length + relatedTematy.length > 0;

  const path = `/wczesne-wspomaganie-rozwoju/${item.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Strona główna", path: "/" },
          { name: "Wczesne Wspomaganie Rozwoju", path: "/wczesne-wspomaganie-rozwoju" },
          { name: item.title, path },
        ])}
      />
      <JsonLd data={articleJsonLd({ title: item.title, description: item.metaDescription || item.excerpt, path })} />
      {item.faq && item.faq.length > 0 && <JsonLd data={faqJsonLd(item.faq)} />}

      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #eff8ff 0%, #fdf3f8 55%, #fff9ec 100%)" }}
      >
        <div className="container-site section-padding relative z-10">
          <Reveal className="max-w-3xl">
            <Link
              href="/wczesne-wspomaganie-rozwoju"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-blue mb-6"
            >
              <ArrowLeft size={16} />
              Wróć do Wczesnego Wspomagania Rozwoju
            </Link>

            <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black leading-tight mb-4">{item.title}</h1>
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
              <h3 className="font-bold text-dark mb-3">Masz pytanie o Twoją sytuację?</h3>
              <p className="text-sm text-gray-500 mb-4">Umów konsultację — podpowiemy, jak wygląda dalsza ścieżka.</p>
              <Link href="/kontakt" className="btn-primary w-full justify-center">
                Umów wizytę
              </Link>
            </Reveal>

            {hasRelated && (
              <Reveal delay={0.1} className="bg-surface rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-dark mb-3">Powiązane strony</h3>
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
                  {relatedOferta.map((o) => (
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
                  {relatedTematy.map((t) => (
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

      {item.faq && item.faq.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-site max-w-3xl">
            <Reveal className="mb-8">
              <h2 className="section-title">Pytania i odpowiedzi</h2>
            </Reveal>
            <RevealGroup className="space-y-4">
              {item.faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.06} className="bg-white rounded-2xl p-6 shadow-card border border-border">
                  <h3 className="font-bold text-dark mb-2">{f.q}</h3>
                  <p className="text-gray-500 leading-relaxed">{f.a}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
