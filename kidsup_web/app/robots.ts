import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kids-up.pl";
// Ustawiane jako build-arg w Dockerfile/CI — "prod" tylko dla obrazu wdrażanego
// na kids-up.pl. Domyślnie ("test"/brak) blokujemy indeksowanie, żeby
// test.kids-up.pl nigdy nie trafiło do wyszukiwarki.
const IS_PROD = process.env.NEXT_PUBLIC_ENV === "prod";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PROD) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
