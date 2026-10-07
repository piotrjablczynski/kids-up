import type { MetadataRoute } from "next";
import { getAllOfertaItems, getAllTematy, getAllWwrArticles } from "@/lib/content";
import { getAllStaticPageRoutes } from "@/lib/routes";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kids-up.pl";

// Fine-tuning only (priority/changeFrequency) — every static route itself
// is discovered automatically (see lib/routes.ts), so a page missing from
// this map still ends up in the sitemap with DEFAULT_WEIGHT rather than
// being silently skipped. Add an entry here when a new page deserves a
// different weight than the default; you do NOT need to add one just to
// make the page show up at all.
const WEIGHTS: Record<string, { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/oferta": { changeFrequency: "weekly", priority: 0.9 },
  "/wczesne-wspomaganie-rozwoju": { changeFrequency: "monthly", priority: 0.9 },
  "/tus": { changeFrequency: "monthly", priority: 0.9 },
  "/cennik": { changeFrequency: "weekly", priority: 0.8 },
  "/o-nas": { changeFrequency: "monthly", priority: 0.8 },
  "/dla-rodzicow": { changeFrequency: "weekly", priority: 0.7 },
  "/faq": { changeFrequency: "monthly", priority: 0.6 },
  "/kontakt": { changeFrequency: "yearly", priority: 0.6 },
  "/praca-u-nas": { changeFrequency: "monthly", priority: 0.5 },
};
const DEFAULT_WEIGHT = { changeFrequency: "monthly" as const, priority: 0.6 };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = getAllStaticPageRoutes().map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    ...(WEIGHTS[route] ?? DEFAULT_WEIGHT),
  }));

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
