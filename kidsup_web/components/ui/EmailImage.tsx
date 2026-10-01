import Image from "next/image";

interface EmailImageProps {
  variant?: "dark" | "light";
  className?: string;
}

/** Adres e-mail jako obrazek (SVG z tekstem) — chroni przed prostym skanowaniem
 * treści strony przez boty zbierające adresy e-mail. Nie jest linkiem
 * mailto: celowo, z tego samego powodu. */
export default function EmailImage({ variant = "dark", className }: EmailImageProps) {
  const src = variant === "light" ? "/images/email-light.svg" : "/images/email-dark.svg";
  return (
    <Image
      src={src}
      alt="adres e-mail poradni Kids Up"
      width={170}
      height={22}
      className={className}
      unoptimized
    />
  );
}
