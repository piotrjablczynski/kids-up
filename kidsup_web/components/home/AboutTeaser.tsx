import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function AboutTeaser() {
  return (
    <section className="section-padding">
      <div className="container-site grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="relative order-2 lg:order-1">
          <div
            aria-hidden="true"
            className="absolute -inset-4 blob-shape opacity-10 animate-blob"
            style={{ background: "var(--brand-green)" }}
          />
          <Image
            src="/images/o-nas-zespol.jpg"
            alt="Zespół specjalistów Kids Up"
            width={560}
            height={420}
            className="relative z-10 rounded-[2rem] shadow-xl object-cover w-full h-[340px]"
          />
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 text-white"
            style={{ backgroundColor: "var(--brand-purple)" }}
          >
            Poznaj nas
          </span>
          <h2 className="section-title">Zespół, który słucha i rozumie</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Każdą diagnozę zaczynamy od rozmowy z rodzicem, a każdą terapię
            prowadzimy w stałym kontakcie z domem i, jeśli to możliwe, z
            przedszkolem lub szkołą dziecka.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Zespół Kids Up budujemy świadomie — każdy specjalista ma realne
            kwalifikacje i certyfikaty w swojej dziedzinie.
          </p>
          <Link href="/o-nas" className="inline-flex items-center gap-2 font-bold text-brand-blue hover:gap-3 transition-all">
            Poznaj cały zespół
            <ArrowRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
