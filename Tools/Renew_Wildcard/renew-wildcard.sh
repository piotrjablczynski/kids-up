#!/bin/bash
# Odnawia certyfikat wildcard *.kids-up.pl, kopiuje pliki PEM do
# /opt/certs/kids-up.pl/ i aktualizuje sekret TLS w K8s — w OBU namespace'ach
# (test i prod), bo test.kids-up.pl i kids-up.pl współdzielą jeden wildcard cert
# (wzorowane na EazBee.Backend/Tools/Renew_Wildcard/renew-wildcard.sh, bez
# części specyficznej dla .NET — Kids Up to czysty Next.js za nginx-ingress,
# który sam podejmie zmianę Secret).
#
# Uruchamiać ręcznie lub w cronie, np.: 0 3 * * 1 /path/to/renew-wildcard.sh
set -e

DOMAIN="kids-up.pl"
CERT_DIR="$HOME/.acme.sh/${DOMAIN}_ecc"
CERT_FILE="$CERT_DIR/fullchain.cer"
KEY_FILE="$CERT_DIR/${DOMAIN}.key"
CA_FILE="$CERT_DIR/ca.cer"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Gdzie skopiować gotowe certyfikaty (kopia zapasowa poza acme.sh)
OUT_DIR="/opt/certs/kids-up.pl"

# DigitalOcean API token — wymagany tylko przy faktycznym odnowieniu,
# wczytywany z lokalnego, niewersjonowanego pliku (patrz .do-token.sh.example)
if [ -f "$SCRIPT_DIR/.do-token.sh" ]; then
  source "$SCRIPT_DIR/.do-token.sh"
fi

# ─── Sprawdź czy cert istnieje ───────────────────────────────────────────────

if [ ! -f "$CERT_FILE" ]; then
  echo "❌ Certyfikat nie istnieje – uruchom najpierw first_time.sh"
  exit 1
fi

# ─── Sprawdź datę wygaśnięcia ────────────────────────────────────────────────

EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)

if [[ "$OSTYPE" == "darwin"* ]]; then
  EXPIRY_EPOCH=$(date -j -f "%b %d %T %Y %Z" "$EXPIRY_DATE" +%s)
else
  EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s)
fi

NOW_EPOCH=$(date +%s)
DAYS_LEFT=$(( (EXPIRY_EPOCH - NOW_EPOCH) / 86400 ))

echo "=== Certyfikat ważny jeszcze: $DAYS_LEFT dni ==="

# ─── Odnów jeśli zostało mniej niż 30 dni ────────────────────────────────────

if [ "$DAYS_LEFT" -lt 30 ]; then
  echo "=== Odnawiam certyfikat ==="
  ~/.acme.sh/acme.sh --renew \
    -d "$DOMAIN" \
    -d "*.$DOMAIN" \
    --dns dns_dgon \
    --keylength ec-256
  echo "=== Odnowiono ==="
else
  echo "=== Odnowienie nie jest potrzebne ==="
fi

# ─── Kopiuj certyfikaty do OUT_DIR ────────────────────────────────────────────

mkdir -p "$OUT_DIR"

cp "$CERT_FILE"  "$OUT_DIR/fullchain.pem"
cp "$KEY_FILE"   "$OUT_DIR/privkey.pem"
cp "$CA_FILE"    "$OUT_DIR/chain.pem"

chmod 640 "$OUT_DIR/privkey.pem"

echo "=== Certyfikaty skopiowane do $OUT_DIR ==="

# ─── Aktualizuj K8s TLS secret w namespace test i prod ───────────────────────

if command -v kubectl &> /dev/null; then
  for NS in prod test; do
    echo "=== Aktualizuję K8s secret kids-up-tls w namespace $NS ==="
    kubectl create secret tls kids-up-tls \
      --cert="$CERT_FILE" \
      --key="$KEY_FILE" \
      --namespace "$NS" \
      --dry-run=client -o yaml | kubectl apply -f -
  done
  echo "=== K8s secrets zaktualizowane ==="
else
  echo "⚠️  kubectl niedostępny — sekrety trzeba zaktualizować ręcznie, w OBU namespace'ach:"
  for NS in prod test; do
    echo "   kubectl create secret tls kids-up-tls \\"
    echo "     --cert=$CERT_FILE --key=$KEY_FILE \\"
    echo "     --namespace $NS --dry-run=client -o yaml | kubectl apply -f -"
  done
fi

echo "=== GOTOWE ==="
