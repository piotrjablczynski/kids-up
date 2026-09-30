"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  id,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  id?: string;
  style?: CSSProperties;
}) {
  const Cmp = motion[as];
  return (
    <Cmp
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </Cmp>
  );
}

/** Stagger-owany kontener dla list kart — dzieci-Reveal odpalają się po kolei. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}
