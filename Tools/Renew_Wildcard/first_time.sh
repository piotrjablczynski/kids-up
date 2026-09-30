#!/bin/bash
# Uruchom raz na nowej maszynie, żeby zainstalować acme.sh i wystawić certyfikat
# wildcard dla *.kids-up.pl.
#
# WYMAGANIA PRZED URUCHOMIENIEM:
#   1. Domena kids-up.pl musi mieć nameservery ustawione na DigitalOcean DNS
#      (tak jak zozoland.pl i eazbee.com) — inaczej DNS-01 (--dns dns_dgon)
#      nie zadziała. Sprawdź/dodaj domenę w DO Panel → Networking → Domains.
#   2. Skopiuj .do-token.sh.example do .do-token.sh (w tym samym folderze)
#      i wklej tam realny token (DO Panel → API → Personal access tokens →
#      Write). .do-token.sh jest w .gitignore — nigdy nie trafia do gita.
set -e

DOMAIN="kids-up.pl"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Zainstaluj acme.sh (jeśli jeszcze nie ma)
if [ ! -f "$HOME/.acme.sh/acme.sh" ]; then
  echo "=== Instaluję acme.sh ==="
  curl -s https://get.acme.sh | sh -s email=admin@kids-up.pl
  source "$HOME/.acme.sh/acme.sh.env"
fi

# 2. Ustaw Let's Encrypt jako domyślne CA
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt

# 3. DigitalOcean API token — wczytywany z lokalnego, niewersjonowanego pliku
if [ -f "$SCRIPT_DIR/.do-token.sh" ]; then
  source "$SCRIPT_DIR/.do-token.sh"
fi
if [ -z "$DO_API_KEY" ]; then
  echo "❌ Brak DO_API_KEY. Skopiuj .do-token.sh.example do .do-token.sh i wklej token."
  exit 1
fi

# 4. Wystawiamy certyfikat wildcard przez DNS-01 challenge (DigitalOcean)
echo "=== Wystawiam certyfikat dla $DOMAIN i *.$DOMAIN ==="
~/.acme.sh/acme.sh --issue \
  --dns dns_dgon \
  -d "$DOMAIN" \
  -d "*.$DOMAIN" \
  --keylength ec-256

echo ""
echo "=== GOTOWE ==="
echo "Certyfikaty w: $HOME/.acme.sh/${DOMAIN}_ecc/"
echo "Następnie uruchom renew-wildcard.sh, żeby skopiować pliki i zaktualizować"
echo "sekrety TLS w namespace'ach test i prod."
