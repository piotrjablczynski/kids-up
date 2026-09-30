import Link from "next/link";
import { Stethoscope, HeartHandshake, Users, Star } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

const categories = [
  {
    id: "diagnoza",
    icon: Stethoscope,
    color: "var(--brand-blue)",
    title: "Diagnoza i opiniowanie",
    body: "Diagnoza psychologiczna, pedagogiczna, logopedyczna i sensoryczna — z pisemną opinią.",
  },
  {
    id: "terapia",
    icon: HeartHandshake,
    color: "var(--brand-pink)",
    title: "Terapia indywidualna",
    body: "SI, terapia ręki, logopedia, neurologopedia, fizjoterapia, wsparcie psychologiczne.",
  },
  {
    id: "grupowe",
    icon: Users,
    color: "var(--brand-orange)",
    title: "Zajęcia grupowe",
    body: "Trening Umiejętności Społecznych i Trening Pewności Siebie w małych grupach.",
  },
  {
    id: "wwr",
    icon: Star,
    color: "var(--brand-purple)",
    title: "Wczesne Wspomaganie Rozwoju",
    body: "Bezpłatne dla dzieci z opinią, prywatnie dostępne również bez niej.",
  },
];

export default function OfertaCategories() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-title">Nasza oferta</h2>
          <p className="section-subtitle mx-auto">
            Cztery obszary wsparcia — od pierwszej diagnozy po regularną terapię.
          </p>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.07}>
              <Link
                href={`/oferta#${cat.id}`}
                className="block h-full bg-white rounded-2xl p-6 shadow-card card-hover border border-border"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cat.color}1a` }}
                >
                  <cat.icon size={26} style={{ color: cat.color }} />
                </div>
                <h3 className="font-bold text-dark mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cat.body}</p>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal className="text-center mt-10">
          <Link href="/oferta" className="btn-primary">
            Zobacz pełny cennik
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
