import { CalendarCheck, BadgeCheck, Receipt, HandHeart } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

const items = [
  {
    icon: CalendarCheck,
    color: "var(--brand-blue)",
    title: "Bez skierowania, krótszy czas oczekiwania",
    body: "Jako poradnia niepubliczna umawiamy pierwsze konsultacje szybciej niż placówki publiczne.",
  },
  {
    icon: BadgeCheck,
    color: "var(--brand-pink)",
    title: "Zweryfikowani specjaliści",
    body: "Każdy terapeuta ma realne kwalifikacje i certyfikaty w swojej dziedzinie — nie tylko ogólne przygotowanie.",
  },
  {
    icon: Receipt,
    color: "var(--brand-orange)",
    title: "Przejrzysty cennik",
    body: "Znasz cenę i czas trwania zajęć, zanim się umówisz — bez ukrytych kosztów.",
  },
  {
    icon: HandHeart,
    color: "var(--brand-green)",
    title: "WWR bezpłatnie dla dzieci z opinią",
    body: "Zajęcia wczesnego wspomagania rozwoju finansuje Starostwo Powiatowe w Wołominie.",
  },
];

export default function USPSection() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-title">Dlaczego Kids Up</h2>
          <p className="section-subtitle mx-auto">
            Nowoczesna poradnia zbudowana wokół realnych potrzeb dzieci i rodziców.
          </p>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="bg-white rounded-2xl p-6 shadow-card card-hover border border-border">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${item.color}1a` }}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-dark mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
