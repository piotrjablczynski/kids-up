import Link from "next/link";
import { Clock } from "lucide-react";
import type { OfertaItem } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

const categoryColor: Record<string, string> = {
  diagnoza: "var(--brand-blue)",
  terapia: "var(--brand-pink)",
  grupowe: "var(--brand-orange)",
  wwr: "var(--brand-purple)",
};

export default function OfertaCard({ item }: { item: OfertaItem }) {
  const color = categoryColor[item.category] ?? "var(--brand-blue)";

  return (
    <Link
      href={`/oferta/${item.slug}`}
      className="flex flex-col h-full bg-white rounded-2xl p-6 shadow-card card-hover border border-border"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}1a` }}>
          <Icon name={item.icon} size={22} className="" />
        </div>
        <span
          className="badge-soft text-white whitespace-nowrap"
          style={{ backgroundColor: color }}
        >
          {item.price}
        </span>
      </div>

      <h3 className="font-bold text-dark mb-2 leading-snug">{item.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{item.excerpt}</p>

      {item.duration && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
          <Clock size={14} />
          {item.duration}
        </div>
      )}
    </Link>
  );
}
