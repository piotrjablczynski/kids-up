import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export default function PageHero({
  tagline,
  heading,
  description,
  children,
}: {
  tagline?: string;
  heading: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #eff8ff 0%, #fdf3f8 55%, #fff9ec 100%)" }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-16 w-72 h-72 blob-shape opacity-15 animate-blob"
        style={{ background: "var(--brand-blue)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-52 h-52 blob-shape opacity-15 animate-float-slow"
        style={{ background: "var(--brand-pink)" }}
      />

      <div className="container-site section-padding relative z-10">
        <Reveal className="max-w-3xl">
          {tagline && (
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 text-white"
              style={{ backgroundColor: "var(--brand-blue)" }}
            >
              {tagline}
            </span>
          )}
          <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-black leading-tight mb-4">{heading}</h1>
          {description && <p className="text-gray-600 text-lg leading-relaxed">{description}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
