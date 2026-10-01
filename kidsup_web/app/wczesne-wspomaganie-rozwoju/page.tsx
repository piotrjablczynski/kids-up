import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/JsonLd";
import { getPageContent, type FaqItem } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wczesne Wspomaganie Rozwoju (WWR) — Ząbki",
  description:
    "Czym jest wczesne wspomaganie rozwoju, dla kogo, kto wydaje opinię, ile kosztuje i jak zacząć — pełny przewodnik po WWR w Ząbkach i powiecie wołomińskim.",
};

interface Step {
  step: string;
  title: string;
  desc: string;
}

export default async function WWRPage() {
  const page = await getPageContent("wczesne-wspomaganie-rozwoju");
  const steps = (page?.steps as Step[] | undefined) ?? [];
  const faq = (page?.faq as FaqItem[] | undefined) ?? [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Strona główna", path: "/" },
          { name: "Wczesne Wspomaganie Rozwoju", path: "/wczesne-wspomaganie-rozwoju" },
        ])}
      />
      {faq.length > 0 && <JsonLd data={faqJsonLd(faq)} />}

      <PageHero
        tagline={(page?.hero_tagline as string) ?? "Nasza specjalizacja"}
        heading={(page?.hero_heading as string) ?? "Wczesne Wspomaganie Rozwoju"}
        description={page?.hero_description as string | undefined}
      >
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/kontakt" className="btn-primary text-base">
            Zapytaj o WWR
          </Link>
          <Link href="/oferta#wwr" className="btn-outline text-base">
            Zobacz cennik WWR
          </Link>
        </div>
      </PageHero>

      <section className="section-padding">
        <div className="container-site">
          <RevealGroup className="grid md:grid-cols-3 gap-6 mb-16">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1} className="relative bg-white rounded-2xl p-6 shadow-card border border-border">
                <span
                  className="text-4xl font-black opacity-15 absolute top-4 right-5"
                  style={{ color: "var(--brand-blue)" }}
                >
                  {s.step}
                </span>
                <h3 className="font-bold text-dark mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </RevealGroup>

          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <Reveal className="prose-content lg:col-span-2">
              <div dangerouslySetInnerHTML={{ __html: page?.content ?? "" }} />
            </Reveal>
            <Reveal delay={0.1}>
              <Image
                src="/images/wwr-zajecia.jpg"
                alt="Zajęcia wczesnego wspomagania rozwoju w Kids Up"
                width={480}
                height={560}
                className="rounded-[2rem] shadow-xl object-cover w-full h-[320px] lg:h-full sticky top-24"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {faq.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-site max-w-3xl">
            <Reveal className="text-center mb-12">
              <h2 className="section-title">Najczęstsze pytania o WWR</h2>
            </Reveal>
            <RevealGroup className="space-y-4">
              {faq.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.05} className="bg-white rounded-2xl p-6 shadow-card border border-border">
                  <h3 className="font-bold text-dark mb-2">{item.q}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.a}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
