import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getAllOfertaItems, getPageContent, type OfertaCategory, type OfertaItem } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cennik",
  description:
    "Cennik usług Niepublicznej Poradni Psychologiczno-Pedagogicznej Kids Up w Ząbkach: diagnozy, terapie, zajęcia grupowe i wczesne wspomaganie rozwoju.",
};

const categories: { id: OfertaCategory; title: string }[] = [
  { id: "diagnoza", title: "Diagnoza i opiniowanie" },
  { id: "terapia", title: "Terapia indywidualna" },
  { id: "wwr", title: "Wczesne Wspomaganie Rozwoju" },
  { id: "grupowe", title: "Zajęcia grupowe" },
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

export default async function CennikPage() {
  const page = await getPageContent("cennik");
  const items = await getAllOfertaItems();

  return (
    <>
      <PageHero
        tagline={(page?.hero_tagline as string) ?? "Przejrzyste zasady"}
        heading={(page?.hero_heading as string) ?? "Cennik"}
        description={page?.hero_description as string | undefined}
      />

      <section className="section-padding">
        <div className="container-site max-w-4xl space-y-14">
          {categories.map((cat) => {
            const catItems = items.filter((i) => i.category === cat.id);
            if (catItems.length === 0) return null;
            const subgroups = groupBySubcategory(catItems);

            return (
              <Reveal key={cat.id} id={cat.id} className="scroll-mt-24">
                <h2 className="text-2xl font-black text-dark mb-6">{cat.title}</h2>
                {subgroups.map(([subcat, subItems]) => (
                  <div key={subcat} className="mb-8 last:mb-0">
                    {subgroups.length > 1 && (
                      <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wide mb-3">{subcat}</h3>
                    )}
                    <div className="overflow-hidden rounded-2xl border border-border">
                      <table className="w-full text-sm">
                        <tbody>
                          {subItems.map((item, idx) => (
                            <tr
                              key={item.slug}
                              className={idx % 2 === 0 ? "bg-white" : "bg-surface"}
                            >
                              <td className="py-3.5 px-5">
                                <Link href={`/oferta/${item.slug}`} className="font-semibold text-dark hover:text-brand-blue transition-colors">
                                  {item.title}
                                </Link>
                              </td>
                              <td className="py-3.5 px-5 text-gray-400 whitespace-nowrap hidden sm:table-cell">
                                {item.duration ?? "—"}
                              </td>
                              <td className="py-3.5 px-5 font-bold text-right whitespace-nowrap" style={{ color: "var(--brand-blue)" }}>
                                {item.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
