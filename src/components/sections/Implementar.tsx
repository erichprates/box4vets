"use client";

import { asset } from "@/lib/base";
import { AnimatePresence, motion, useInView, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { faixa, passos } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Tag } from "../ui/Button";
import { Check } from "../ui/icons";

const selos = ["Sem equipamento", "Sem sedação", "Laudo online"];

/**
 * Faixa em tela cheia que quebra o ritmo do site: a midia (foto ou video) abre de
 * um cartao estreito ate a largura toda e anda mais devagar que a pagina.
 */
function Faixa() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.1"] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const side = useTransform(enter, [0, 1], [12, 0.7]);
  const clipPath = useMotionTemplate`inset(0px ${side}vw 0px ${side}vw round 28px)`;
  const y = useTransform(pass, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(enter, [0, 1], [1.25, 1]);

  return (
    <motion.div
      ref={ref}
      data-dark
      className="relative h-[88vh] min-h-[600px] overflow-hidden"
      style={{ clipPath: reduced ? "inset(0px 0.7vw 0px 0.7vw round 28px)" : clipPath }}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[14%]"
        style={reduced ? undefined : { y, scale }}
      >
        {faixa.video ? (
          <video
            src={asset(faixa.video)}
            poster={asset(faixa.imagem)}
            autoPlay
            muted
            loop
            playsInline
            aria-label={faixa.alt}
            className="size-full object-cover"
          />
        ) : (
          <Image src={faixa.imagem} alt={faixa.alt} fill quality={88} sizes="100vw" className="object-cover" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />
      <div className="absolute inset-0 bg-roxo/25 mix-blend-multiply" />

      <div className="absolute inset-x-0 bottom-0 pb-10 text-white md:pb-16">
        <div className="container-page">
          <FadeUp>
            <Tag tone="dark">Implemente em qualquer lugar do país</Tag>
          </FadeUp>
          <Words
            className="display mt-5 max-w-[980px] text-[clamp(1.85rem,4.2vw,3.75rem)]"
            parts={["Se a sua clínica tem acesso aos Correios, ela já pode fazer medicina de precisão."]}
          />
          <motion.ul
            className="mt-7 flex flex-wrap gap-2.5"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
          >
            {selos.map((s) => (
              <motion.li
                key={s}
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 py-2 pr-4 pl-2 text-[0.875rem] font-semibold backdrop-blur"
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
                }}
              >
                <span className="grid size-6 place-items-center rounded-full bg-ciano-200 text-ink">
                  <Check size={13} strokeWidth={2.6} />
                </span>
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}

/** Cinco passos: um aberto por vez. Avanca sozinho ate a pessoa escolher um. */
function Passos() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -25% 0px" });
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!inView || !auto || reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % passos.length), 4200);
    return () => clearInterval(t);
  }, [inView, auto, reduced]);

  const pick = (n: number) => {
    setAuto(false);
    setI(n);
  };

  return (
    <div ref={ref} className="mt-16 md:mt-24">
      <ol className="relative grid gap-2 lg:grid-cols-5 lg:gap-4">
        <div aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-line lg:block">
          <motion.div
            className="h-full origin-left bg-roxo"
            animate={{ scaleX: i / (passos.length - 1) }}
            transition={{ duration: 0.8, ease: ease.out }}
          />
        </div>
        {passos.map((p, n) => {
          const on = n === i;
          const done = n <= i;
          return (
            <li key={p.titulo} className="relative">
              <button
                type="button"
                aria-expanded={on}
                onClick={() => pick(n)}
                className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl p-2 text-left max-lg:hover:bg-paper lg:flex-col lg:p-0 lg:text-center"
              >
                <span
                  className={`display relative z-10 grid size-14 shrink-0 place-items-center rounded-full text-[1.25rem] ring-8 ring-white transition-all duration-500 ease-out-expo ${
                    on
                      ? "scale-110 bg-roxo text-white shadow-[0_12px_30px_rgb(63_47_128/0.4)]"
                      : done
                        ? "bg-roxo text-white"
                        : "bg-lilas text-roxo group-hover:bg-roxo group-hover:text-white"
                  }`}
                >
                  {n + 1}
                  {on && auto && !reduced && (
                    <svg aria-hidden viewBox="0 0 60 60" className="absolute -inset-1.5 -rotate-90">
                      <motion.circle
                        cx="30"
                        cy="30"
                        r="28.5"
                        fill="none"
                        stroke="var(--color-ciano)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4.2, ease: "linear" }}
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={`display text-[1.0625rem] leading-snug transition-colors duration-300 lg:mt-3 lg:px-2 ${
                    on ? "text-ink" : "text-mute group-hover:text-ink"
                  }`}
                >
                  {p.titulo}
                </span>
              </button>
                  <motion.div
                    className="overflow-hidden lg:hidden"
                    inert={!on}
                    initial={false}
                    animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: ease.out }}
                  >
                    <p className="pt-1 pr-2 pb-4 pl-[5.5rem] text-[0.9375rem] text-mute">{p.texto}</p>
                  </motion.div>
            </li>
          );
        })}
      </ol>

      <div className="relative mt-10 hidden min-h-[190px] overflow-hidden rounded-panel bg-paper p-10 lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            className="grid grid-cols-[auto_1fr] items-center gap-10"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: ease.out }}
          >
            <span className="display text-[6.5rem] leading-none text-roxo/15 tabular-nums">0{i + 1}</span>
            <div className="max-w-[720px]">
              <h3 className="display text-title text-ink">{passos[i].titulo}</h3>
              <p className="mt-2 text-[1.0625rem] text-mute">{passos[i].texto}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Implementar() {
  return (
    <section id="implementar" className="pt-2 pb-24 md:pb-36">
      <Faixa />
      <div className="container-page">
        <FadeUp>
          <p className="mx-auto mt-16 max-w-[860px] text-center text-[1.1875rem] leading-[1.5] text-ink md:mt-24 md:text-[1.375rem]">
            Não é preciso laboratório, equipamento ou estrutura especial. Uma clínica em Manaus, em
            Porto Alegre ou no interior de Goiás oferece exatamente o mesmo exame que um hospital de
            referência em São Paulo. Toda a análise é feita em nossos laboratórios; você coleta, envia
            e recebe o laudo online.
          </p>
        </FadeUp>
        <Passos />
      </div>
    </section>
  );
}
