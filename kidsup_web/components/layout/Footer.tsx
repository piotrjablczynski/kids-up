import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import EmailImage from "@/components/ui/EmailImage";
import { PORADNIA, ORGAN_PROWADZACY } from "@/lib/poradniaInfo";

const navLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "Wczesne Wspomaganie Rozwoju", href: "/wczesne-wspomaganie-rozwoju" },
  { label: "TUS — Trening Umiejętności Społecznych", href: "/tus" },
  { label: "Oferta", href: "/oferta" },
  { label: "Dla rodziców", href: "/dla-rodzicow" },
  { label: "Cennik", href: "/cennik" },
  { label: "Praca u nas", href: "/praca-u-nas" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#242e38" }} className="text-white">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-footer.png"
              alt="Kids Up — Niepubliczna Poradnia Psychologiczno-Pedagogiczna"
              width={400}
              height={390}
              className="h-20 w-20 object-contain mb-5"
            />
            <p className="text-gray-300 leading-relaxed text-sm">
              Kids Up — Niepubliczna Poradnia Psychologiczno-Pedagogiczna w
              Ząbkach. Diagnoza, terapia i wczesne wspomaganie rozwoju dla
              dzieci — zespół specjalistów w jednym miejscu.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Nawigacja</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-cyan mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {PORADNIA.ulica}
                  <br />
                  {PORADNIA.kodMiasto}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-cyan flex-shrink-0" />
                <a
                  href={PORADNIA.telefonHref}
                  className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium"
                >
                  {PORADNIA.telefon}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-cyan flex-shrink-0"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <EmailImage variant="light" className="opacity-80 hover:opacity-100 transition-opacity" />
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-brand-cyan mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{PORADNIA.godziny}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Organ prowadzący */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Organ prowadzący
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-1 text-xs text-gray-400">
            <span>{ORGAN_PROWADZACY.nazwa}</span>
            <span>NIP: <span className="text-gray-300">{ORGAN_PROWADZACY.nip}</span></span>
            <span>REGON: <span className="text-gray-300">{ORGAN_PROWADZACY.regon}</span></span>
            <span>KRS: <span className="text-gray-300">{ORGAN_PROWADZACY.krs}</span></span>
          </div>
        </div>
      </div>

      <div className="color-bar" />
      <div style={{ backgroundColor: "#1a2128" }} className="py-4">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Kids Up. Wszelkie prawa zastrzeżone.</span>
          <span>Niepubliczna Poradnia Psychologiczno-Pedagogiczna, Ząbki</span>
        </div>
      </div>
    </footer>
  );
}
