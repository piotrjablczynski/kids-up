#!/usr/bin/env node
// Pings IndexNow (api.indexnow.org) with every URL from the live sitemap —
// Bing (and Yandex/Seznam.cz/Naver) built this protocol specifically so a
// site doesn't have to wait for its next scheduled crawl to pick up new or
// changed pages. Google does not participate in IndexNow; Google re-fetches
// sitemap.xml on its own, automatically, once it's been submitted in Search
// Console once (see README.md) — nothing to ping there, and nothing to run
// again after that one-time setup.
//
// Run after every PROD deploy only (see
// .github/workflows/kidsup-web-deploy-prod.yml) — pinging for test.kids-up.pl
// would be pointless, it's password-protected and marked noindex on purpose.
//
// Usage: node scripts/ping-indexnow.mjs <siteUrl> <indexNowKey>
// The key is not a secret — it's the same value published at
// public/<key>.txt (IndexNow's own verification mechanism), so it's fine to
// pass it as a plain CLI arg / inline in the workflow.

const [, , siteUrlArg, keyArg] = process.argv;
const siteUrl = (siteUrlArg || "https://kids-up.pl").replace(/\/$/, "");
const key = keyArg || process.env.INDEXNOW_KEY;

if (!key) {
  console.error("Missing IndexNow key (pass as 2nd CLI arg or INDEXNOW_KEY env var).");
  process.exit(1);
}

async function main() {
  const sitemapRes = await fetch(`${siteUrl}/sitemap.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`Could not fetch ${siteUrl}/sitemap.xml: HTTP ${sitemapRes.status}`);
  }
  const xml = await sitemapRes.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urls.length === 0) {
    throw new Error("Sitemap had no <loc> entries — nothing to submit.");
  }

  const host = new URL(siteUrl).host;
  const payload = {
    host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList: urls,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  console.log(`IndexNow: submitted ${urls.length} URLs for ${host} — HTTP ${res.status}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`IndexNow submission failed: HTTP ${res.status} ${text}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
