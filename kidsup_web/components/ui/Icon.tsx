import {
  MessageCircle,
  Eye,
  Brain,
  Puzzle,
  Zap,
  ClipboardList,
  GraduationCap,
  PencilRuler,
  Calculator,
  Stethoscope,
  Waves,
  Activity,
  Ear,
  HeartPulse,
  FileText,
  Hand,
  Heart,
  Sparkles,
  Star,
  Users,
  Smile,
  Baby,
  BookOpen,
  type LucideIcon,
  CircleHelp,
} from "lucide-react";

// Mapa nazw (z frontmattera contentu) na komponenty ikon — dodaj tu nową
// ikonę, jeśli użyjesz jej nazwy w content/oferta lub content/dla-rodzicow.
const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Eye,
  Brain,
  Puzzle,
  Zap,
  ClipboardList,
  GraduationCap,
  PencilRuler,
  Calculator,
  Stethoscope,
  Waves,
  Activity,
  Ear,
  HeartPulse,
  FileText,
  Hand,
  Heart,
  Sparkles,
  Star,
  Users,
  Smile,
  Baby,
  BookOpen,
};

export function Icon({ name, className, size }: { name?: string; className?: string; size?: number }) {
  const Cmp = (name && iconMap[name]) || CircleHelp;
  return <Cmp className={className} size={size} aria-hidden="true" />;
}
