"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "WWR", href: "/wczesne-wspomaganie-rozwoju", title: "Wczesne Wspomaganie Rozwoju" },
  { label: "Oferta", href: "/oferta" },
  { label: "Dla rodziców", href: "/dla-rodzicow" },
  { label: "Cennik", href: "/cennik" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-200",
        scrolled ? "shadow-md" : "shadow-sm"
      )}
    >
      <div className="container-site flex items-center justify-between h-20">
        <Link href="/" className="flex-shrink-0 flex items-center gap-2" aria-label="Kids Up — strona główna">
          <Image
            src="/images/logo.png"
            alt="Kids Up — Niepubliczna Poradnia Psychologiczno-Pedagogiczna"
            width={160}
            height={160}
            priority
            className="h-14 w-14 object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Nawigacja główna">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
              className="text-dark font-semibold text-[0.95rem] hover:text-brand-blue transition-colors duration-150 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue rounded transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/kontakt" className="btn-primary text-sm py-2.5 px-5">
            Umów wizytę
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-dark hover:bg-surface transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="color-bar" />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <nav className="container-site py-4 flex flex-col gap-1" aria-label="Menu mobilne">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-4 rounded-lg font-semibold text-dark hover:bg-surface hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="btn-primary justify-center mt-3 mx-4"
              >
                Umów wizytę
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
