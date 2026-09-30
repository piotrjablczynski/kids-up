# Kids Up — strona WWW

Next.js 16 (App Router) + React 19 + Tailwind v4. Ta sama architektura co
`zozoland_web` — treść jako Markdown w `content/`, edytowalna ręcznie, przez
Claude Code albo przez panel `/admin` (Decap CMS).

## Start lokalny

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Struktura treści

- `content/pages/*.md` — strony statyczne (home, o-nas, wwr, kontakt, rekrutacja, cennik, faq)
- `content/oferta/*.md` — pozycje cennika (każda = jedna podstrona `/oferta/[slug]`)
- `content/dla-rodzicow/*.md` — tematy poradnika dla rodziców (`/dla-rodzicow/[slug]`)

Dodanie nowej usługi lub tematu = nowy plik `.md` w odpowiednim folderze — routing
i listingi (`/oferta`, `/dla-rodzicow`, sitemap) podłączają się automatycznie
przez `lib/content.ts`.

## Panel CMS (`/admin`)

Zobacz `public/admin/config.yml`. Backend `github`, repo `piotrjablczynski/kids-up`.
**Uwaga:** logowanie do panelu wymaga wdrożenia OAuth-proxy (np. Sveltia CMS
Cloudflare Worker) — na razie `base_url` w `config.yml` jest placeholderem.
Do edycji lokalnej bez OAuth: odkomentuj `local_backend: true` w `config.yml`
i uruchom `npx decap-server` obok `npm run dev`.

## Deploy

Patrz `manifests/` (K8s) i `../.github/workflows/` (CI/CD) — auto-deploy na
`test.kids-up.pl` po pushu do `main`, ręczny `workflow_dispatch` promuje do
`kids-up.pl`. Certyfikat SSL: `../Tools/Renew_Wildcard/`.
