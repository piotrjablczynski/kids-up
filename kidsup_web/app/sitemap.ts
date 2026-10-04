import type { MetadataRoute } from "next";
import { getAllOfertaItems, getAllTematy, getAllWwrArticles } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kids-up.pl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/o-nas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/wczesne-wspomaganie-rozwoju`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tus`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/oferta`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/dla-rodzicow`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/cennik`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/praca-u-nas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];

  const oferta = await getAllOfertaItems();
  const ofertaRoutes: MetadataRoute.Sitemap = oferta.map((item) => ({
    url: `${BASE_URL}/oferta/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tematy = await getAllTematy();
  const tematyRoutes: MetadataRoute.Sitemap = tematy.map((t) => ({
    url: `${BASE_URL}/dla-rodzicow/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const wwrArticles = await getAllWwrArticles();
  const wwrRoutes: MetadataRoute.Sitemap = wwrArticles.map((a) => ({
    url: `${BASE_URL}/wczesne-wspomaganie-rozwoju/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...ofertaRoutes, ...tematyRoutes, ...wwrRoutes];
}
