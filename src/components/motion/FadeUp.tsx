"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease, viewport } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Reveal padrao de blocos: sobe, cresce um pouco e entra em foco. */
export function FadeUp({
  children,
  className,
  delay = 0,
  eager = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Dispara assim que a borda do bloco entra na tela (sem a margem padrao de 12%). */
  eager?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, y: 56, scale: 0.96, filter: "blur(10px)" }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={eager ? { once: true } : viewport}
      transition={{ duration: duration.slow, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  );
}
