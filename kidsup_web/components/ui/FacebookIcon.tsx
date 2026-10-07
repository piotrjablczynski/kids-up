// lucide-react dropped brand/logo icons (Facebook included) a while back —
// same situation Footer.tsx already handles for its envelope icon: a small
// hand-written SVG, fill-based (brand marks read better filled than as
// line-art) instead of lucide's usual stroke style.
export function FacebookIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.54v1.85h2.75l-.44 2.88h-2.31v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
