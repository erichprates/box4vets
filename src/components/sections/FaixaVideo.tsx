"use client";

import { asset } from "@/lib/base";
import { motion, useInView, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Words } from "../motion/Words";
import { Logo } from "../ui/Logo";

/**
 * Faixa de video com parallax, logo depois dos exames. O enquadramento puxa para a direita
 * da imagem (78%), onde esta a pesquisadora no microscopio. Entra como um cartao estreito,
 * abre ate a largura toda e volta a recolher ao sair; o video anda mais devagar que a
 * pagina e so toca enquanto esta na tela. Uma frase no centro.
 */
export function FaixaVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "20% 0px 20% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Abre na entrada, fica cheio no meio, recolhe na saida.
  const side = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [14, 0.7, 0.7, 10]);
  const edge = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, 40]);
  const clipPath = useMotionTemplate`inset(${edge}px ${side}vw ${edge}px ${side}vw round 28px)`;
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1.2]);

  useEffect(() => {
    const v = video.current;
    if (!v || reduced) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView, reduced]);

  return (
    <section aria-label="Laboratório Box4Vets" className="pb-2">
      <motion.div
        ref={ref}
        data-dark
        className="relative grid h-[92vh] min-h-[560px] place-items-center overflow-hidden"
        style={{ clipPath: reduced ? "inset(0px 0.7vw 0px 0.7vw round 28px)" : clipPath }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-x-0 -inset-y-[16%] bg-cover bg-[position:78%_50%]"
          style={{ backgroundImage: `url(${asset("/media/lab.jpg")})`, ...(reduced ? {} : { y, scale }) }}
        >
          <video ref={video} muted loop playsInline preload="metadata" className="size-full object-cover object-[78%_50%]">
            <source src={asset("/media/lab-mobile.mp4")} type="video/mp4" media="(max-width: 767px)" />
            <source src={asset("/media/lab.mp4")} type="video/mp4" />
          </video>
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-roxo/60 mix-blend-multiply" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgb(15_9_40/0.7),rgb(15_9_40/0.25)_80%)]" />

        <div className="container-page relative flex flex-col items-center text-center text-white">
          {/* Logo acima da frase. */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo mono className="mb-[clamp(1.5rem,3.2vw,2.75rem)] h-[clamp(2.75rem,5vw,4.25rem)] w-auto" />
          </motion.div>
          <Words
            as="p"
            className="display mx-auto max-w-[980px] text-[clamp(1.9rem,4.4vw,4rem)]"
            parts={[
              "Toda a análise é feita",
              "\n",
              "em nossos laboratórios.",
              "\n",
              { text: "Você coleta, envia e recebe o laudo online.", className: "mt-[0.5em] text-[0.58em] font-light text-ciano-200" },
            ]}
          />
        </div>
      </motion.div>
    </section>
  );
}
