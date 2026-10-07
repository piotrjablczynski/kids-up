import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

// Homepage-only launch banner, content-managed via home.md's
// "opening_banner" field — once the practice is actually open, clear that
// field in the CMS (or content/pages/home.md) and this disappears, no code
// change needed.
export default function OpeningAnnouncement({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(90deg, var(--brand-blue), var(--brand-pink))" }}
    >
      <div className="container-site py-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="inline-flex items-center gap-2 text-white font-bold text-sm sm:text-base">
          <Sparkles size={16} className="flex-shrink-0" />
          {text}
        </span>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-1 text-white font-bold text-sm underline-offset-2 hover:underline flex-shrink-0"
        >
          Skontaktuj się
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
