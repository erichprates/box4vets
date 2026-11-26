"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Texto de manifesto que "acende" palavra por palavra conforme o scroll
 * (padrao observado na Wolverine: cinza claro virando cor cheia).
 */
export function ScrubText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {/* O texto inteiro fica para leitores de tela; as palavras que acendem sao so visuais. */}
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          disabled={!!reduced}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  disabled,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  disabled: boolean;
}) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <motion.span aria-hidden style={{ opacity: disabled ? 1 : opacity }}>
      {children}{" "}
    </motion.span>
  );
}
