"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Foto com parallax: a imagem anda mais devagar que a pagina, dentro de uma
 * janela fixa. O filho deve preencher o container (ex: next/image com `fill`).
 * `amount` e o quanto a foto desloca, em % da propria altura.
 */
export function ParallaxImage({
  children,
  className = "",
  amount = 12,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`],
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${amount}%`,
          bottom: `-${amount}%`,
          y: reduced ? 0 : y,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Camada que flutua em outra velocidade: sobe (ou desce) alguns pixels enquanto
 * a secao atravessa a tela. Use por cima de uma ParallaxImage para dar profundidade.
 */
export function ParallaxLayer({
  children,
  className = "",
  distance = 120,
}: {
  children: ReactNode;
  className?: string;
  /** Deslocamento total em px. Positivo = sobe mais rapido que a pagina. */
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance / 2, -distance / 2],
  );

  return (
    <motion.div ref={ref} className={className} style={{ y: reduced ? 0 : y }}>
      {children}
    </motion.div>
  );
}
