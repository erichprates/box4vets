"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Provedores de movimento do site inteiro (mesma base do Aquamundo).
 * - MotionConfig reducedMotion="user": respeita quem pede menos movimento.
 * - Lenis: scroll suave, com os links de ancora do menu descontando o header fixo.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduced ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -88 } }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
