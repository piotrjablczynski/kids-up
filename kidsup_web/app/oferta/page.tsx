import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import OfertaCard from "@/components/oferta/OfertaCard";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { getAllOfertaItems, type OfertaCategory, type OfertaItem } from "@/lib/content";

export const metadata: Metadata = {
  title: "Oferta",
  description:
    "Pełna oferta Niepublicznej Poradni Psychologiczno-Pedagogicznej Kids Up w Ząbkach: diagnoza, terapia indywidualna, zajęcia grupowe i wczesne wspomaganie rozwoju.",
};

const categories: { id: OfertaCategory; title: string; description: string }[] = [
  {
    id: "diagnoza",
    title: "Diagnoza i opiniowanie",
    description: "Badania i konsultacje diagnostyczne kończące się pisemną opinią.",
  },
  {
    id: "terapia",
    title: "Terapia indywidualna",
    description: "Regularne zajęcia dopasowane do potrzeb dziecka.",
  },
  {
    id: "wwr",
    title: "Wczesne Wspomaganie Rozwoju",
    description: "Bezpłatne dla dzieci z opinią, prywatnie dostępne także bez niej.",
  },
  {
    id: "grupowe",
    title: "Zajęcia grupowe",
    description: "Cykliczne zajęcia w małych, stałych grupach rówieśniczych.",
  },
];

function groupBySubcategory(items: OfertaItem[]) {
  const groups = new Map<string, OfertaItem[]>();
  for (const item of items) {
    const key = item.subcategory ?? "Pozostałe";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return Array.from(groups.entries());
}

export default async function OfertaPage() {
  const items = await getAllOfertaItems();

  return (
    <>
      <PageHero
        tagline="Cennik i oferta"
        heading="Co oferujemy"
        description="Ceny bez ukrytych kosztów — dokładnie wiesz, za co płacisz, zanim się umówisz."
      />

      {categories.map((cat) => {
        const catItems = items.filter((i) => i.category === cat.id);
        if (catItems.length === 0) return null;
        const subgroups = groupBySubcategory(catItems);

        return (
          <section key={cat.id} id={cat.id} className="section-padding scroll-mt-24 odd:bg-surface">
            <div className="container-site">
              <Reveal className="max-w-2xl mb-12">
                <h2 className="section-title">{cat.title}</h2>
                <p className="section-subtitle">{cat.description}</p>
              </Reveal>

              {subgroups.map(([subcat, subItems]) => (
                <div key={subcat} className="mb-12 last:mb-0">
                  {subgroups.length > 1 && (
                    <h3 className="font-bold text-dark text-lg mb-5">{subcat}</h3>
                  )}
                  <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subItems.map((item, i) => (
                      <Reveal key={item.slug} delay={i * 0.05}>
                        <OfertaCard item={item} />
                      </Reveal>
                    ))}
                  </RevealGroup>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
