import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function WWRBanner() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <Reveal
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-14 text-white"
          style={{ background: "linear-gradient(120deg, var(--brand-blue), var(--brand-purple))" }}
        >
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-10 w-72 h-72 blob-shape opacity-20 animate-blob"
            style={{ background: "white" }}
          />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 bg-white/15">
              <Star size={14} />
              Nasza specjalizacja
            </span>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-black leading-tight mb-4">
              Wczesne Wspomaganie Rozwoju — bezpłatnie dla dzieci z opinią
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Kompleksowe, zespołowe wsparcie dla najmłodszych dzieci z
              opóźnieniami lub zaburzeniami rozwoju. Dla dzieci posiadających
              opinię o potrzebie WWR zajęcia finansuje Starostwo Powiatowe w
              Wołominie — Ty nie płacisz nic.
            </p>
            <Link
              href="/wczesne-wspomaganie-rozwoju"
              className="inline-flex items-center gap-2 bg-white text-brand-blue font-bold px-6 py-3 rounded-[var(--radius)] hover:-translate-y-0.5 transition-transform"
            >
              Dowiedz się więcej o WWR
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
