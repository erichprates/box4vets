"use client";

import { motion } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { ease, viewport } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Part = string | { text: string; className: string };

/**
 * Titulo que entra palavra por palavra, saindo do desfoque (ref. Curenast,
 * "Leading with Heart and Expertise"). Aceita trechos com classe propria
 * para destacar parte da frase.
 */
export function Words({
  parts,
  as = "h2",
  className,
  delay = 0,
  eager = false,
}: {
  parts: Part[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Anima ao montar, sem esperar entrar na tela (hero). */
  eager?: boolean;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const label = parts
    .filter((p) => p !== "\n" && p !== "\n\n")
    .map((p) => (typeof p === "string" ? p : p.text))
    .join(" ");
  let index = 0;
  const nodes: ReactNode[] = [];

  parts.forEach((part, pi) => {
    // "\n" forca a quebra de linha (so no desktop; no celular o texto corre solto).
    // "\n\n" quebra a linha em qualquer tela.
    if (part === "\n\n") {
      nodes.push(<br key={`br-${pi}`} />);
      return;
    }
    if (part === "\n") {
      nodes.push(<br key={`br-${pi}`} className="max-md:hidden" />);
      return;
    }
    const text = typeof part === "string" ? part : part.text;
    const cls = typeof part === "string" ? "" : part.className;
    text.split(" ").forEach((word) => {
      const i = index++;
      nodes.push(
        <Fragment key={`${pi}-${i}`}>
          <motion.span
            className={`inline-block ${cls}`}
            variants={{
              hidden: reduced
                ? { opacity: 0 }
                : { opacity: 0, y: "0.45em", filter: "blur(12px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.9, ease: ease.out },
              },
            }}
          >
            {word}
          </motion.span>{" "}
        </Fragment>,
      );
    });
  });

  return (
    <Tag
      className={className}
      aria-label={label}
      initial="hidden"
      {...(eager ? { animate: "show" } : { whileInView: "show", viewport })}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      <span aria-hidden>{nodes}</span>
    </Tag>
  );
}
