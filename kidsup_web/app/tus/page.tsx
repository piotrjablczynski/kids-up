import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Quote } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/JsonLd";
import { getPageContent, type FaqItem } from "@/lib/content";

export const metadata: Metadata = {
  title: "TUS — Trening Umiejętności Społecznych",
  description:
    "Czym jest TUS, dla jakich dzieci i jak wyglądają zajęcia — praktyczny przewodnik po Treningu Umiejętności Społecznych w poradni Kids Up w Ząbkach.",
};

interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface SkillCard {
  title: string;
  desc: string;
}

const accentColors = [
  "var(--brand-blue)",
  "var(--brand-pink)",
  "var(--brand-orange)",
  "var(--brand-green)",
  "var(--brand-purple)",
  "var(--brand-cyan)",
];

export default async function TusPage() {
  const page = await getPageContent("tus");

  const dlaKogo = (page?.dla_kogo as string[] | undefined) ?? [];
  const kategorie = (page?.kategorie_umiejetnosci as SkillCategory[] | undefined) ?? [];
  const procesKroki = (page?.proces_kroki as ProcessStep[] | undefined) ?? [];
  const procesMotyw = (page?.proces_motyw as string[] | undefined) ?? [];
  const scenariusze = (page?.scenariusze as string[] | undefined) ?? [];
  const umiejetnosciKarty = (page?.umiejetnosci_karty as SkillCard[] | undefined) ?? [];
  const kiedyRozmawiacPytania = (page?.kiedy_rozmawiac_pytania as string[] | undefined) ?? [];
  const faq = (page?.faq as FaqItem[] | undefined) ?? [];

  const dlaKogoUwaga = page?.dla_kogo_uwaga as string | undefined;
  const diagnozaText = page?.diagnoza_text as string | undefined;
  const kiedyRozmawiacPodsumowanie = page?.kiedy_rozmawiac_podsumowanie as string | undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Strona główna", path: "/" },
          { name: "TUS — Trening Umiejętności Społecznych", path: "/tus" },
        ])}
      />
      {faq.length > 0 && <JsonLd data={faqJsonLd(faq)} />}

      <PageHero
        tagline={(page?.hero_tagline as string) ?? "Rozwój umiejętności społecznych"}
        heading={(page?.hero_heading as string) ?? "Trening Umiejętności Społecznych (TUS)"}
        description={page?.hero_description as string | undefined}
      >
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/kontakt" className="btn-primary text-base">
            Zapytaj o TUS
          </Link>
          <Link href="/oferta/tus-trening-umiejetnosci-spolecznych" className="btn-outline text-base">
            Zobacz cennik TUS
          </Link>
        </div>
      </PageHero>

      {/* Dla kogo */}
      <section className="section-padding">
        <div className="container-site">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="section-title">Dla kogo jest TUS?</h2>
            <p className="section-subtitle">
              TUS może być pomocny dzieciom, które rozpoznajesz w którymkolwiek z poniższych punktów —
              nie trzeba spełniać ich wszystkich.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 gap-4">
            {dlaKogo.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 0.04}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-card border border-border"
              >
                <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "var(--brand-green)" }} />
                <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
              </Reveal>
            ))}
          </RevealGroup>

          {dlaKogoUwaga && (
            <Reveal delay={0.1} className="mt-8 text-gray-500 leading-relaxed max-w-3xl">
              <p>{dlaKogoUwaga}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Czy tylko dla dzieci z diagnozą — callout */}
      <section className="section-padding bg-surface">
        <div className="container-site">
          <Reveal
            className="relative overflow-hidden rounded-[2rem] p-8 md:p-10 max-w-3xl mx-auto"
            style={{ background: "linear-gradient(120deg, #eef2ff, #fdf3f8)" }}
          >
            <h2 className="text-2xl font-black text-dark mb-3">
              {(page?.diagnoza_heading as string) ?? "Czy TUS jest tylko dla dzieci z diagnozą?"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">{diagnozaText}</p>
          </Reveal>
        </div>
      </section>

      {/* Czego dziecko może się uczyć — kategorie umiejętności */}
      <section className="section-padding">
        <div className="container-site">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">Czego dziecko może się uczyć na TUS?</h2>
            <p className="section-subtitle mx-auto">
              Umiejętności społeczne to szeroka kategoria — poniżej kilka głównych obszarów, nad którymi
              pracujemy podczas zajęć.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategorie.map((cat, i) => (
              <Reveal
                key={cat.category}
                delay={i * 0.06}
                className="bg-white rounded-2xl p-6 shadow-card border border-border"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${accentColors[i % accentColors.length]}1a` }}
                >
                  <Icon name={cat.icon} size={22} />
                </div>
                <h3 className="font-bold text-dark mb-3">{cat.category}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map((it) => (
                    <li key={it} className="text-sm text-gray-500 leading-relaxed flex gap-2">
                      <span className="text-gray-300">•</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Jak wyglądają zajęcia */}
      <section className="section-padding bg-surface">
        <div className="container-site">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="section-title">Jak wyglądają zajęcia TUS?</h2>
            <p className="section-subtitle mx-auto">Typowy przebieg jednego spotkania grupy.</p>
          </Reveal>

          {procesMotyw.length > 0 && (
            <Reveal className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
              {procesMotyw.map((label, i) => (
                <span key={label} className="flex items-center gap-2 md:gap-3">
                  <span
                    className="badge-soft text-white"
                    style={{ backgroundColor: accentColors[i % accentColors.length] }}
                  >
                    {label}
                  </span>
                  {i < procesMotyw.length - 1 && (
                    <ArrowRight size={16} className="text-gray-300 flex-shrink-0" />
                  )}
                </span>
              ))}
            </Reveal>
          )}

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {procesKroki.map((s, i) => (
              <Reveal
                key={s.step}
                delay={i * 0.04}
                className="relative bg-white rounded-2xl p-6 shadow-card border border-border"
              >
                <span
                  className="text-4xl font-black opacity-15 absolute top-4 right-5"
                  style={{ color: "var(--brand-blue)" }}
                >
                  {s.step}
                </span>
                <h3 className="font-bold text-dark mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* TUS to nie lekcja — scenariusze */}
      <section className="section-padding">
        <div className="container-site">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">TUS to nie lekcja</h2>
            <p className="section-subtitle mx-auto">
              Dzieci nie uczą się definicji z podręcznika — ćwiczą sytuacje, które mogą wydarzyć się naprawdę.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {scenariusze.map((s, i) => (
              <Reveal
                key={s}
                delay={i * 0.04}
                className="relative bg-white rounded-2xl p-6 shadow-card border border-border"
              >
                <Quote size={28} className="absolute top-4 right-4 opacity-10" style={{ color: "var(--brand-pink)" }} />
                <p className="font-semibold text-dark leading-snug pr-6">{s}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Jakie umiejętności można ćwiczyć — chipy */}
      <section className="section-padding bg-surface">
        <div className="container-site">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Jakie umiejętności można ćwiczyć?</h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {umiejetnosciKarty.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.03}
                className="bg-white rounded-xl p-4 shadow-card border-l-4 border border-border"
                style={{ borderLeftColor: accentColors[i % accentColors.length] }}
              >
                <h4 className="font-bold text-dark text-sm mb-1">{c.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Deep-dive prose + zdjęcie */}
      <section className="section-padding">
        <div className="container-site grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <Reveal className="prose-content lg:col-span-2">
            <div dangerouslySetInnerHTML={{ __html: page?.content ?? "" }} />
          </Reveal>
          <Reveal delay={0.1}>
            <Image
              src="/images/tus-zajecia.jpg"
              alt="Dzieci siedzące w kręgu podczas zajęć grupowych, rozmawiające o emocjach"
              width={1400}
              height={933}
              className="rounded-[2rem] shadow-xl object-cover w-full h-[280px] lg:h-[480px] sticky top-24"
            />
          </Reveal>
        </div>
      </section>

      {/* Kiedy warto porozmawiać ze specjalistą */}
      <section className="section-padding bg-surface">
        <div className="container-site max-w-3xl">
          <Reveal className="text-center mb-10">
            <h2 className="section-title">Kiedy warto porozmawiać ze specjalistą o TUS?</h2>
          </Reveal>

          <RevealGroup className="space-y-3 mb-8">
            {kiedyRozmawiacPytania.map((q, i) => (
              <Reveal
                key={q}
                delay={i * 0.04}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-card border border-border"
              >
                <span className="font-black flex-shrink-0" style={{ color: "var(--brand-purple)" }}>
                  ?
                </span>
                <span className="text-sm text-gray-600 leading-relaxed">{q}</span>
              </Reveal>
            ))}
          </RevealGroup>

          {kiedyRozmawiacPodsumowanie && (
            <Reveal className="text-center text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              <p>{kiedyRozmawiacPodsumowanie}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="section-padding">
          <div className="container-site max-w-3xl">
            <Reveal className="text-center mb-12">
              <h2 className="section-title">Pytania i odpowiedzi o TUS</h2>
            </Reveal>
            <FaqAccordion items={faq} />
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="section-padding bg-surface">
        <div className="container-site">
          <Reveal
            className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center"
            style={{ background: "linear-gradient(120deg, #fff3e0, #ffeef6)" }}
          >
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -left-10 w-72 h-72 blob-shape opacity-25 animate-blob"
              style={{ background: "var(--brand-orange)" }}
            />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="section-title">Porozmawiajmy, czy TUS będzie dobrym wsparciem</h2>
              <p className="text-gray-600 text-lg mb-8">
                Umów konsultację — podpowiemy, czy grupa TUS będzie dobrym kierunkiem dla Twojego dziecka.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary text-base">
                  Umów konsultację
                </Link>
                <Link href="/oferta/tus-trening-umiejetnosci-spolecznych" className="btn-secondary text-base">
                  Zobacz cennik TUS
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
