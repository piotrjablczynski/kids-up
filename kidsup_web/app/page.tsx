import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import USPSection from "@/components/home/USPSection";
import WWRBanner from "@/components/home/WWRBanner";
import OfertaCategories from "@/components/home/OfertaCategories";
import AboutTeaser from "@/components/home/AboutTeaser";
import TematyPreview from "@/components/home/TematyPreview";
import CtaBanner from "@/components/home/CtaBanner";
import { getPageContent, getFeaturedTematy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kids Up — Niepubliczna Poradnia Psychologiczno-Pedagogiczna w Ząbkach",
  description:
    "Kids Up to niepubliczna poradnia psychologiczno-pedagogiczna w Ząbkach. Diagnoza i terapia dla dzieci: wczesne wspomaganie rozwoju, integracja sensoryczna, logopedia, psychologia, pedagogika.",
};

export default async function HomePage() {
  const home = await getPageContent("home");
  const featuredTematy = (await getFeaturedTematy()).slice(0, 4);

  return (
    <>
      <Hero
        tagline={(home?.hero_tagline as string) ?? "Poradnia psychologiczno-pedagogiczna w Ząbkach"}
        heading={(home?.hero_heading as string) ?? "Rozwój Twojego dziecka"}
        headingHighlight={(home?.hero_heading_highlight as string) ?? "w dobrych rękach"}
        description={
          (home?.hero_description as string) ??
          "Diagnoza, terapia i wczesne wspomaganie rozwoju dla dzieci w jednym miejscu."
        }
      />
      <USPSection />
      <WWRBanner />
      <OfertaCategories />
      <AboutTeaser />
      <TematyPreview tematy={featuredTematy} />
      <CtaBanner />
    </>
  );
}
