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
   zbuduje i wdroży `test.kids-up.pl`, a dodatkowo zbuduje (ale nie wdroży)
   obraz prod. Żeby wypchnąć na `kids-up.pl`, uruchom ręcznie workflow
   **Kids Up Web Deploy Production** (Actions → wybierz workflow → Run
   workflow → podaj numer builda z poprzedniego kroku).

6. **Panel CMS (`/admin`)** wymaga jeszcze wdrożenia OAuth-proxy (np.
   Sveltia CMS na Cloudflare Workers) — `base_url` w
   `kidsup_web/public/admin/config.yml` jest na razie placeholderem. Do
   edycji lokalnej bez OAuth wystarczy `local_backend: true` +
   `npx decap-server`.

7. **Zdjęcia** — wygeneruj brakujące zdjęcia z `Tools/image-prompts.txt` i
   wrzuć pod wskazane ścieżki w `kidsup_web/public/images/`.

8. **Dane kontaktowe** — adres, telefon i godziny w
   `kidsup_web/content/pages/kontakt.md` (i w stopce) są placeholderami
   `[do uzupełnienia]` — uzupełnij je przed pójściem na produkcję.
