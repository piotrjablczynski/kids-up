import fs from "fs";
import path from "path";

const appDir = path.join(process.cwd(), "app");

// Directory segments under app/ that never produce an indexable static
// route: dynamic params ([slug] - these are content-driven and already get
// their own sitemap entries from lib/content.ts's getAllXxx() functions,
// which pick up new .md files automatically the same way this picks up new
// page.tsx files), route groups ((group)), and the API routes folder
// (route.ts handlers, never a page).
function isExcludedSegment(segment: string): boolean {
  return segment.startsWith("[") || segment.startsWith("(") || segment === "api";
}

/**
 * Every static (non-dynamic) page route under app/ — discovered straight
 * from the filesystem at build time, so a new app/jakas-strona/page.tsx
 * shows up in the sitemap automatically. Nobody has to remember to add it
 * to sitemap.ts by hand (see app/sitemap.ts for how this combines with the
 * content-driven [slug] routes to cover the whole site).
 */
export function getAllStaticPageRoutes(): string[] {
  const routes: string[] = [];

  function walk(dir: string, urlSegments: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    if (entries.some((e) => e.isFile() && e.name === "page.tsx")) {
      routes.push("/" + urlSegments.join("/"));
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || isExcludedSegment(entry.name)) continue;
      walk(path.join(dir, entry.name), [...urlSegments, entry.name]);
    }
  }

  walk(appDir, []);
  return routes.sort();
}
