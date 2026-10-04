import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/content";

/** Lekki accordion FAQ na natywnym <details>/<summary> — bez JS, działa też
 * bez hydratacji. Używaj tam, gdzie lista pytań jest długa i stałe,
 * jednocześnie rozwinięte karty (jak na /faq albo WWR) zajęłyby za dużo
 * miejsca. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group bg-white rounded-2xl shadow-card border border-border overflow-hidden"
        >
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-dark [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              size={20}
              className="flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="px-6 pb-5 text-gray-500 leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
