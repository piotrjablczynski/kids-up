import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export type OfertaCategory = "diagnoza" | "terapia" | "grupowe" | "wwr";

export interface OfertaItem {
  slug: string;
  title: string;
  category: OfertaCategory;
  subcategory?: string;
  duration?: string;
  price: string;
  priceNote?: string;
  icon?: string;
  excerpt: string;
  featured?: boolean;
  relatedTematy?: string[];
  relatedWwr?: string[];
  content: string;
}

export interface Temat {
  slug: string;
  title: string;
  excerpt: string;
  icon?: string;
  featured?: boolean;
  relatedOferta?: string[];
  relatedWwr?: string[];
  content: string;
}

export interface PageContent {
  title: string;
  [key: string]: unknown;
  content: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

function readCollection(folder: string): { slug: string; data: Record<string, unknown>; content: string }[] {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), "utf8");
    const { data, content } = matter(raw);
    return { slug: filename.replace(/\.md$/, ""), data, content };
  });
}

// ─── Oferta (cennik) ────────────────────────────────────────────────────────

export async function getAllOfertaItems(): Promise<OfertaItem[]> {
  const items = readCollection("oferta");
  const resolved = await Promise.all(
    items.map(async ({ slug, data, content }) => ({
      slug,
      title: (data.title as string) ?? "",
      category: (data.category as OfertaCategory) ?? "terapia",
      subcategory: data.subcategory as string | undefined,
      duration: data.duration as string | undefined,
      price: (data.price as string) ?? "",
      priceNote: data.priceNote as string | undefined,
      icon: data.icon as string | undefined,
      excerpt: (data.excerpt as string) ?? "",
      featured: Boolean(data.featured),
      relatedTematy: (data.relatedTematy as string[] | undefined) ?? [],
      relatedWwr: (data.relatedWwr as string[] | undefined) ?? [],
      content: await markdownToHtml(content),
    }))
  );
  return resolved.sort((a, b) => a.title.localeCompare(b.title, "pl"));
}

export async function getOfertaItem(slug: string): Promise<OfertaItem | null> {
  const items = await getAllOfertaItems();
  return items.find((i) => i.slug === slug) ?? null;
}

export async function getOfertaByCategory(category: OfertaCategory): Promise<OfertaItem[]> {
  const items = await getAllOfertaItems();
  return items.filter((i) => i.category === category);
}

export async function getFeaturedOferta(): Promise<OfertaItem[]> {
  const items = await getAllOfertaItems();
  return items.filter((i) => i.featured);
}

// ─── Dla rodziców (tematy) ──────────────────────────────────────────────────

export async function getAllTematy(): Promise<Temat[]> {
  const items = readCollection("dla-rodzicow");
  const resolved = await Promise.all(
    items.map(async ({ slug, data, content }) => ({
      slug,
      title: (data.title as string) ?? "",
      excerpt: (data.excerpt as string) ?? "",
      icon: data.icon as string | undefined,
      featured: Boolean(data.featured),
      relatedOferta: (data.relatedOferta as string[] | undefined) ?? [],
      relatedWwr: (data.relatedWwr as string[] | undefined) ?? [],
      content: await markdownToHtml(content),
    }))
  );
  return resolved.sort((a, b) => a.title.localeCompare(b.title, "pl"));
}

export async function getTemat(slug: string): Promise<Temat | null> {
  const items = await getAllTematy();
  return items.find((i) => i.slug === slug) ?? null;
}

export async function getFeaturedTematy(): Promise<Temat[]> {
  const items = await getAllTematy();
  return items.filter((i) => i.featured);
}

// ─── Praca u nas (oferty pracy) ─────────────────────────────────────────────

export interface JobPosting {
  slug: string;
  role: string;
  status: string;
  note?: string;
  content: string;
}

export async function getAllJobPostings(): Promise<JobPosting[]> {
  const items = readCollection("praca");
  const resolved = await Promise.all(
    items.map(async ({ slug, data, content }) => ({
      slug,
      role: (data.role as string) ?? "",
      status: (data.status as string) ?? "W trakcie rekrutacji",
      note: data.note as string | undefined,
      content: await markdownToHtml(content),
    }))
  );
  return resolved;
}

// ─── Wczesne Wspomaganie Rozwoju (klaster artykułów) ────────────────────────

export interface FaqItem {
  q: string;
  a: string;
}

export interface WwrArticle {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  relatedWwr?: string[];
  relatedOferta?: string[];
  relatedTematy?: string[];
  faq?: FaqItem[];
  content: string;
}

export async function getAllWwrArticles(): Promise<WwrArticle[]> {
  const items = readCollection("wwr");
  const resolved = await Promise.all(
    items.map(async ({ slug, data, content }) => ({
      slug,
      title: (data.title as string) ?? "",
      metaDescription: (data.metaDescription as string) ?? "",
      excerpt: (data.excerpt as string) ?? "",
      relatedWwr: (data.relatedWwr as string[] | undefined) ?? [],
      relatedOferta: (data.relatedOferta as string[] | undefined) ?? [],
      relatedTematy: (data.relatedTematy as string[] | undefined) ?? [],
      faq: (data.faq as FaqItem[] | undefined) ?? [],
      content: await markdownToHtml(content),
    }))
  );
  return resolved;
}

export async function getWwrArticle(slug: string): Promise<WwrArticle | null> {
  const items = await getAllWwrArticles();
  return items.find((i) => i.slug === slug) ?? null;
}

// ─── Strony statyczne ───────────────────────────────────────────────────────

export async function getPageContent(slug: string): Promise<PageContent | null> {
  const filePath = path.join(contentDir, "pages", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const htmlContent = await markdownToHtml(content);

  return { ...data, title: data.title ?? "", content: htmlContent };
}
