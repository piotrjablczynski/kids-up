import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kids-up.pl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kids Up — Niepubliczna Poradnia Psychologiczno-Pedagogiczna w Ząbkach",
    template: "%s | Kids Up",
  },
  description:
    "Kids Up to niepubliczna poradnia psychologiczno-pedagogiczna w Ząbkach. Diagnoza i terapia dla dzieci: wczesne wspomaganie rozwoju, integracja sensoryczna, logopedia, psychologia, pedagogika.",
  keywords: ["poradnia psychologiczno-pedagogiczna", "Ząbki", "WWR", "wczesne wspomaganie rozwoju", "logopeda", "integracja sensoryczna", "Kids Up"],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Kids Up",
    title: "Kids Up — Niepubliczna Poradnia Psychologiczno-Pedagogiczna w Ząbkach",
    description:
      "Diagnoza, terapia i wczesne wspomaganie rozwoju dla dzieci — zespół psychologów, pedagogów, logopedów i fizjoterapeutów w Ząbkach.",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${nunito.variable} ${baloo.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
