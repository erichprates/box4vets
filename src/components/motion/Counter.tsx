"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const format = new Intl.NumberFormat("pt-BR");

/** Numero que conta de zero ate o valor quando entra na tela. */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduced) {
      node.textContent = format.format(value) + suffix;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: ease.out,
      onUpdate: (v) => {
        node.textContent = format.format(Math.round(v)) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, suffix]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {format.format(value) + suffix}
    </span>
  );
}
