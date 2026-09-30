import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const navLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "Wczesne Wspomaganie Rozwoju", href: "/wczesne-wspomaganie-rozwoju" },
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
            <div className="inline-block bg-white rounded-2xl px-3 py-2 mb-5">
              <Image
                src="/images/logo.png"
                alt="Kids Up — Niepubliczna Poradnia Psychologiczno-Pedagogiczna"
                width={160}
                height={160}
                className="h-16 w-16 object-contain"
              />
            </div>
            <p className="text-gray-300 leading-relaxed text-sm mb-4">
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
                  [adres do uzupełnienia]
                  <br />
                  05-091 Ząbki
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-cyan flex-shrink-0" />
                <span className="text-gray-300 text-sm">[telefon do uzupełnienia]</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-cyan flex-shrink-0" />
                <a
                  href="mailto:kontakt@kids-up.pl"
                  className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium"
                >
                  kontakt@kids-up.pl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-brand-cyan mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">[godziny do uzupełnienia]</span>
              </li>
            </ul>
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
