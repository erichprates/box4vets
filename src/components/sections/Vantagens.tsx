"use client";

import { asset } from "@/lib/base";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { vantagens } from "@/content/site";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Tag } from "../ui/Button";
import { Check, Icon } from "../ui/icons";

/** Video vertical em formato de stories: toca em loop so enquanto esta na tela. */
function Story({ nome, alt, distance, className }: { nome: string; alt: string; distance: number; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "10% 0px 10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  useEffect(() => {
    const v = video.current;
    if (!v || reduced) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView, reduced]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduced ? 0 : y }}>
      <motion.div
        className="relative aspect-[9/16] overflow-hidden rounded-[26px] bg-cover bg-center shadow-[0_40px_90px_rgb(0_0_0/0.45)] ring-1 ring-white/15"
        style={{ backgroundImage: `url(${asset(`/media/${nome}.jpg`)})` }}
        initial={{ clipPath: "inset(100% 0% 0% 0% round 26px)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 26px)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.3, ease: ease.inOut }}
      >
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          className="size-full object-cover"
          src={asset(`/media/${nome}.mp4`)}
        />
        {/* Barrinhas de progresso, como nos stories. */}
        <div aria-hidden className="absolute inset-x-3 top-3 flex gap-1">
          <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
            {inView && !reduced && (
              <motion.span
                className="block h-full origin-left bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              />
            )}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stories() {
  return (
    <div className="flex justify-center gap-4 lg:justify-end">
      <Story
        nome="story-gato"
        alt="Veterinário segurando um gato no consultório"
        distance={30}
        className="w-[44%] max-w-[230px] lg:mt-16"
      />
      <Story
        nome="story-cao"
        alt="Veterinária sorrindo para um cão na clínica"
        distance={-30}
        className="w-[44%] max-w-[230px] lg:mb-16"
      />
    </div>
  );
}

/** Painel escuro: escolhe para quem e a vantagem e a lista troca. */
export function Vantagens() {
  const [i, setI] = useState(0);

  return (
    <section data-dark className="panel bg-ink py-24 text-white md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-72 -left-72 size-[900px] bg-[radial-gradient(closest-side,rgb(63_47_128/0.75),transparent)]" />
        <div className="absolute -right-72 -bottom-40 size-[760px] bg-[radial-gradient(closest-side,rgb(0_172_200/0.2),transparent)]" />
        <div className="absolute top-1/2 -left-[20%] aspect-square w-[70%] -translate-y-1/2 rounded-full border border-white/[0.07]" />
        <div className="absolute top-1/2 -left-[10%] aspect-square w-[50%] -translate-y-1/2 rounded-full border border-white/[0.07]" />
      </div>

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <FadeUp>
            <Tag tone="dark">Vantagens de implementar</Tag>
          </FadeUp>
          <Words
            className="display mt-6 text-display"
            parts={[
              "Mais precisão para o paciente.",
              { text: "Mais valor para a sua clínica.", className: "text-ciano-200" },
            ]}
          />
        </div>
        <Stories />
        </div>

        <div className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <FadeUp delay={0.15}>
            <div role="tablist" aria-label="Vantagens para" className="flex flex-col gap-1.5">
              {vantagens.map((item, n) => {
                const on = n === i;
                return (
                  <button
                    key={item.titulo}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setI(n)}
                    className={`relative flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl px-3 text-left transition-colors duration-300 ${
                      on ? "text-ink" : "text-white/70 hover:text-white max-lg:bg-white/[0.07] max-lg:text-white"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="vantagem-ativa"
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-white"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        on ? "bg-roxo text-white" : "bg-white/10 text-ciano-200"
                      }`}
                    >
                      <Icon name={item.icon} size={22} />
                    </span>
                    <span className="display relative flex-1 text-[1.25rem]">{item.titulo}</span>
                    <span className={`relative pr-2 text-[0.8125rem] tabular-nums ${on ? "text-mute" : "text-white/40"}`}>
                      /0{n + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeUp>

        <FadeUp delay={0.1}>
          <div
            role="tabpanel"
            className="relative grid h-full min-h-[460px] overflow-hidden rounded-panel border border-white/12 bg-white/[0.06] p-7 md:p-11"
          >
            {/* As quatro listas ficam escritas na pagina (bom para buscadores); so a escolhida aparece. */}
            {vantagens.map((v, n) => {
              const on = n === i;
              return (
              <motion.div
                key={v.titulo}
                aria-hidden={!on}
                className={`col-start-1 row-start-1 flex flex-col ${on ? "" : "pointer-events-none invisible"}`}
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: 0.35 }}
              >
                <motion.span
                  aria-hidden
                  className="absolute -top-10 -right-10 text-white/[0.06]"
                  initial={false}
                  animate={on ? { scale: 1, rotate: 0 } : { scale: 0.6, rotate: -20 }}
                  transition={{ duration: on ? 0.9 : 0, ease: ease.out }}
                  style={{ visibility: on ? "visible" : "hidden" }}
                >
                  <Icon name={v.icon} size={300} strokeWidth={0.8} />
                </motion.span>
                <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-ciano-200 uppercase">
                  {v.itens.length} vantagens
                </p>
                <h3 className="display mt-2 text-title">{v.titulo}</h3>
                <motion.ul
                  className="relative mt-8 flex flex-col"
                  initial={false}
                  animate={on ? "show" : "hidden"}
                  transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
                >
                  {v.itens.map((item) => (
                    <motion.li
                      key={item}
                      className="flex gap-4 border-t border-white/12 py-5 text-[1.0625rem] leading-snug text-white/90"
                      variants={{
                        hidden: { opacity: 0, y: 20, transition: { duration: 0 } },
                        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
                      }}
                    >
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ciano-200 text-ink">
                        <Check size={13} strokeWidth={2.6} />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              );
            })}
          </div>
        </FadeUp>
        </div>
      </div>
    </section>
  );
}
