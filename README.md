# Kids Up — repo strony (kids-up.pl)

Niepubliczna Poradnia Psychologiczno-Pedagogiczna Kids Up (Ząbki) — strona
WWW zbudowana tym samym wzorcem co [Zozoland](https://github.com/piotrjablczynski/zozoland):
Next.js 16 + Tailwind v4, treść jako Markdown edytowalny ręcznie, przez
Claude Code albo przez panel `/admin` (Decap CMS), hostowana na tym samym
klastrze Kubernetes co eazBee/Zozoland.

```
Strona/
├── kidsup_web/              ← aplikacja Next.js (patrz kidsup_web/README.md)
├── manifests/ (w kidsup_web/) ← K8s: deployment/service/ingress (test + prod)
├── .github/workflows/        ← CI/CD (build + deploy)
└── Tools/
    ├── Renew_Wildcard/       ← wystawianie/odnawianie certyfikatu *.kids-up.pl
    └── image-prompts.txt     ← nazwy i prompty do wygenerowania brakujących zdjęć
```

## Zanim to zadziała na produkcji — checklista

1. **Załóż puste, prywatne repo** `github.com/piotrjablczynski/kids-up`,
   potem:
   ```bash
   cd /Users/piotrjablczynski/Kids-Up/Strona
   git push -u origin main
   ```
   (repo lokalne jest już zainicjowane z pierwszym commitem i remote'em
   ustawionym na ten adres).

2. **Sekrety w ustawieniach repo** (Settings → Secrets and variables →
   Actions) — te same, których używa Zozoland:
   - `DO_REGISTRY_TOKEN` — token do Digital Ocean Container Registry
   - `DO_K8S_TOKEN` — token do klastra `eazbeeaks`

3. **DNS `kids-up.pl` w DigitalOcean** — domena musi mieć nameservery
   ustawione na DO (tak jak `zozoland.pl`/`eazbee.com`), inaczej
   `--dns dns_dgon` w skryptach certyfikatu nie zadziała. Dodaj też rekordy
   `A`/`CNAME` dla `kids-up.pl`, `www.kids-up.pl` i `test.kids-up.pl`
   wskazujące na ten sam load balancer co pozostałe strony na klastrze.

4. **Certyfikat SSL** — na maszynie, która ma dostęp do `kubectl` do klastra
   `eazbeeaks`:
   ```bash
   cd Tools/Renew_Wildcard
   # podmień DO_API_KEY w obu skryptach na realny token DO
   ./first_time.sh        # jednorazowo — wystawia *.kids-up.pl
   ./renew-wildcard.sh    # kopiuje cert + tworzy sekret kids-up-tls w namespace test i prod
   ```

5. **Push do `main`** uruchomi `kidsup-web-deploy.yml` — automatycznie
   buduje i wdraża **tylko** `test.kids-up.pl`. Nic z prod nie odpala się
   samo. Żeby wypchnąć na `kids-up.pl`, uruchom ręcznie osobny workflow
   **Kids Up Web Deploy Production** (Actions → wybierz workflow → Run
   workflow → podaj numer builda testowego, który chcesz promować — ten
   workflow sam buduje świeży obraz z ustawieniami prod i wdraża go,
   numer służy tylko do etykiety `prod-<numer>`).

   `test.kids-up.pl` jest zabezpieczone hasłem (HTTP Basic Auth na
   poziomie nginx-ingress, żeby Google nigdy tego nie zaindeksował) —
   login **`test`**, hasło **`Mopsik25810!`**. Sam sekret K8s
   (`kidsup-test-basic-auth`) tworzy/aktualizuje automatycznie krok
   deployu, na podstawie `kidsup_web/manifests/htpasswd-test` — nic
   ręcznie nie trzeba zakładać. `dev` (lokalnie) i `prod` (`kids-up.pl`)
   działają bez hasła.

6. **Panel CMS (`/admin`)** wymaga jeszcze wdrożenia OAuth-proxy (np.
   Sveltia CMS na Cloudflare Workers) — `base_url` w
   `kidsup_web/public/admin/config.yml` jest na razie placeholderem. Do
   edycji lokalnej bez OAuth wystarczy `local_backend: true` +
   `npx decap-server`.

7. **Zdjęcia** — wygeneruj brakujące zdjęcia z `Tools/image-prompts.txt` i
   wrzuć pod wskazane ścieżki w `kidsup_web/public/images/`.

8. **Dane kontaktowe** (adres, telefon, e-mail, godziny) są już uzupełnione
   realnymi danymi w Headerze, Footerze i `kidsup_web/content/pages/kontakt.md`
   (`lib/poradniaInfo.ts` to jedno miejsce, gdzie je zmienić, jeśli się
   zmienią).

9. **Formularz kontaktowy** (`/kontakt`) wysyła e-mail przez SMTP
   (`app/api/contact/route.ts`, biblioteka `nodemailer`) — wymaga sekretu
   K8s `kidsup-contact-smtp` w namespace `test` i `prod` (nie ma go w
   repo, trzeba założyć ręcznie, raz na namespace):
   ```bash
   kubectl create secret generic kidsup-contact-smtp \
     --from-literal=smtp-host=smtp.twoj-dostawca.pl \
     --from-literal=smtp-port=587 \
     --from-literal=smtp-secure=false \
     --from-literal=smtp-user=TWOJ_LOGIN_SMTP \
     --from-literal=smtp-pass=TWOJE_HASLO_SMTP \
     --from-literal=contact-to-email=info@kids-up.pl \
     --from-literal=contact-from-email=info@kids-up.pl \
     --namespace test   # powtórz z --namespace prod
   ```
   Dowolny dostawca SMTP działa (skrzynka pocztowa do domeny kids-up.pl,
   Gmail z hasłem aplikacji, Resend/SendGrid/Mailgun przez ich SMTP
   relay). Bez tego sekretu formularz pokazuje komunikat "chwilowo
   niedostępny" zamiast się wywalać — strona działa dalej normalnie.

10. **Indeksowanie przez Google/Bing — stan na dziś i co jeszcze wymaga
    ręcznego kroku.**

    **Krytyczne:** `kids-up.pl` (prod) jeszcze nigdy nie było wdrożone —
    DNS i certyfikat (`kids-up-tls`) są gotowe w namespace `prod`, ale nie
    ma tam żadnego deploymentu/ingressu, więc domena realnie nic nie
    serwuje (sprawdzone `kubectl`/`curl` 2026-10-07). Żadna wyszukiwarka
    nie zaindeksuje strony, która nie istnieje publicznie — zanim
    cokolwiek inne z tej listy ma sens, trzeba wykonać punkt 5 powyżej
    (ręczne odpalenie **Kids Up Web Deploy Production**).

    Po pierwszym wdrożeniu na `kids-up.pl`:
    - **Sitemap jest już w pełni automatyczny** — `app/sitemap.ts`
      odkrywa każdą statyczną stronę (`page.tsx`) prosto z systemu plików
      (`lib/routes.ts`), więc nowa strona (np. `app/nowa-strona/page.tsx`)
      trafia do sitemapy sama, bez edycji `sitemap.ts`. Strony oparte na
      treści (`/oferta/[slug]`, `/dla-rodzicow/[slug]`,
      `/wczesne-wspomaganie-rozwoju/[slug]`) były automatyczne już
      wcześniej — nowy plik `.md` w `content/` też trafia do sitemapy
      sam. `app/robots.ts` (na `prod`) już wskazuje na
      `https://kids-up.pl/sitemap.xml`.
    - **Google Search Console** (jednorazowo, wymaga Twojego konta
      Google): [search.google.com/search-console](https://search.google.com/search-console) →
      dodaj właściwość `kids-up.pl` → zweryfikuj (DNS TXT jest najprostszy,
      bez zmiany kodu) → Sitemaps → wklej `https://kids-up.pl/sitemap.xml`.
      Po tym Google sam, regularnie, odpytuje sitemapę — nie trzeba nic
      więcej robić przy każdej nowej stronie.
    - **Bing Webmaster Tools** (jednorazowo, wymaga konta Microsoft):
      [bing.com/webmasters](https://www.bing.com/webmasters) → najszybsza
      opcja to "Import from Google Search Console" (jedno kliknięcie,
      przenosi weryfikację i sitemapę od razu) — albo ręcznie dodaj
      `kids-up.pl` i tę samą sitemapę.
    - **IndexNow (Bing) jest już zautomatyzowany** — każdy udany deploy na
      `kids-up.pl` (`kidsup-web-deploy-prod.yml`) na końcu odpytuje
      `api.indexnow.org` z pełną listą adresów z sitemapy
      (`kidsup_web/scripts/ping-indexnow.mjs`), więc Bing (i Yandex/
      Seznam.cz/Naver, które też przyjęły ten protokół) dostaje informację
      o nowej/zmienionej treści natychmiast, bez czekania na własne
      zaplanowane odwiedziny crawlera. Klucz weryfikacyjny jest publiczny
      z definicji (plik `public/<key>.txt`) — nie jest sekretem, stąd jest
      wpisany bezpośrednio w workflow. Google w IndexNow nie uczestniczy —
      dla Google liczy się tylko sitemapa + Search Console powyżej.
