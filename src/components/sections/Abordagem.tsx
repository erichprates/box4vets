"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { abordagem } from "@/content/site";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Rich, Tag } from "../ui/Button";
import { Icon, Plus } from "../ui/icons";
import { ease } from "@/lib/motion";

/** Card compacto: mostra o essencial e abre o detalhe dos exames no clique. */
function Card({ item, dark, pin }: { item: (typeof abordagem)[number]; dark: boolean; pin: boolean }) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = item.textos;
  const body = `text-[0.9375rem] leading-[1.55] ${dark ? "text-white/80" : "text-mute"}`;
  const strong = dark ? "font-semibold text-white" : "font-semibold text-ink";
  return (
    <article
      className={`group flex gap-2.5 rounded-card p-2.5 shadow-[0_24px_60px_rgb(27_18_61/0.28)] max-sm:flex-col ${
        pin ? "w-[620px] shrink-0" : ""
      } ${dark ? "bg-ink text-white ring-1 ring-ciano-200/40" : "bg-white text-ink"}`}
    >
      <div
        className={`relative flex min-h-[250px] shrink-0 flex-col justify-between overflow-hidden rounded-[14px] p-4 max-sm:min-h-0 max-sm:h-44 sm:w-[190px] ${
          dark ? "bg-gradient-to-b from-ciano to-roxo" : "grad-card"
        }`}
      >
        {item.foto && (
          <>
            <Image src={item.foto} alt="" fill sizes="(min-width: 640px) 240px, 92vw" className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110" />
            <span className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/35" />
          </>
        )}
        <span className="display relative text-[2.75rem] leading-none text-white">{item.n}</span>
        {!item.foto && (
          <span className="absolute top-1/2 left-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40" />
        )}
        <span
          className={`relative grid size-12 place-items-center self-end rounded-full text-white shadow-[0_10px_24px_rgb(63_47_128/0.3)] transition-transform duration-500 ease-out-expo group-hover:scale-110 sm:self-start ${
            dark ? "bg-ink" : "bg-roxo"
          }`}
        >
          <Icon name={item.icon} size={22} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3.5 sm:py-4">
        <p className={`text-[0.75rem] font-semibold tracking-[0.1em] uppercase ${dark ? "text-ciano-200" : "text-roxo"}`}>
          {item.momento}
        </p>
        <h3 className="display text-[1.625rem]">{item.titulo}</h3>
        <p className={`display text-[1.25rem] ${dark ? "text-ciano-200" : "text-roxo"}`}>{item.pergunta}</p>
        <p className={body}>
          <Rich text={first} strong={strong} />
        </p>
            <motion.div
              className="overflow-hidden"
              inert={!open}
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              <div className="flex flex-col gap-3">
                {rest.map((t) => (
                  <p key={t} className={body}>
                    <Rich text={t} strong={strong} />
                  </p>
                ))}
              </div>
            </motion.div>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`mt-auto flex min-h-11 w-fit cursor-pointer items-center gap-2.5 rounded-full border py-1.5 pr-1.5 pl-4 text-[0.875rem] font-medium transition-colors ${
            dark ? "border-white/25 hover:bg-white/10" : "border-line hover:border-roxo/40"
          }`}
        >
          {open ? "Ver menos" : "Ver exames"}
          <span
            className={`grid size-8 place-items-center rounded-full text-white transition-transform duration-500 ease-out-expo ${
              open ? "rotate-[135deg]" : ""
            } ${dark ? "bg-ciano-700" : "bg-roxo"}`}
          >
            <Plus size={15} strokeWidth={2.2} />
          </span>
        </button>
      </div>
    </article>
  );
}

/**
 * Painel roxo com os quatro momentos do paciente. No desktop a secao trava na
 * tela e os cards correm na horizontal conforme o scroll (ref. Curenast,
 * "Complete Health Care Solutions"). No celular viram uma pilha.
 */
export function Abordagem() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const overflow = useRef(0);
  const [height, setHeight] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const pin = height !== null;

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      const w = wrap.current;
      if (!t || !w) return;
      const can = !reduced && window.innerWidth >= 1024 && window.innerHeight >= 740;
      if (!can) {
        overflow.current = 0;
        setHeight(null);
        return;
      }
      // Largura real da fila de cards, medida mesmo antes de travar.
      const total = Array.from(t.children).reduce(
        (sum, el) => sum + (el as HTMLElement).offsetWidth + 20,
        0,
      );
      const pad = Math.max(20, (w.clientWidth - 1240) / 2 + 40);
      overflow.current = Math.max(0, total - 20 + pad * 2 - w.clientWidth);
      setHeight(window.innerHeight + overflow.current);
    };
    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [reduced, pin]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * overflow.current);

  return (
    <section id="abordagem" data-dark className="panel bg-roxo text-white">
      {/* Arcos de luz ao fundo. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] left-1/2 aspect-square w-[130%] -translate-x-1/2 rounded-full border border-white/10" />
        <div className="absolute -top-[10%] left-1/2 aspect-square w-[95%] -translate-x-1/2 rounded-full border border-white/10" />
        <div className="absolute top-0 right-0 size-[520px] translate-x-1/3 -translate-y-1/3 rounded-full bg-roxo-400/40 blur-[120px]" />
      </div>

      <div ref={wrap} className="relative" style={pin ? { height: height! } : undefined}>
        <div
          className={
            pin
              ? "sticky top-0 flex h-screen flex-col justify-center gap-9 overflow-hidden"
              : "flex flex-col gap-12 py-24 md:py-32"
          }
        >
          <div className="container-page grid items-end gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <div>
              <FadeUp>
                <Tag tone="dark">Como funciona a abordagem</Tag>
              </FadeUp>
              <Words
                className="display mt-5 text-display"
                parts={["Uma ferramenta para cada momento da vida do paciente"]}
              />
            </div>
            <FadeUp delay={0.15}>
              <p className="max-w-[420px] text-[1.125rem] text-white/85 lg:pb-2">
                A plataforma acompanha o paciente do check-up ao tratamento oncológico.
              </p>
            </FadeUp>
          </div>

          <motion.div
            ref={track}
            style={pin ? { x } : undefined}
            className={
              pin
                ? "flex w-max items-start gap-5 px-[max(1.25rem,calc((100vw-1240px)/2+2.5rem))] will-change-transform"
                : "container-page grid items-start gap-5 md:grid-cols-2"
            }
          >
            {abordagem.map((item, i) => (
              <Card key={item.n} item={item} dark={i === abordagem.length - 1} pin={pin} />
            ))}
          </motion.div>

          {pin && (
            <div className="container-page">
              <div className="h-[3px] overflow-hidden rounded-full bg-white/15">
                <motion.div className="h-full origin-left bg-ciano-200" style={{ scaleX: scrollYProgress }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`container-page relative pb-24 md:pb-32 ${pin ? "pt-4" : ""}`}>
        <FadeUp>
          <div className="flex flex-col gap-6 rounded-card border border-white/15 bg-white/[0.07] p-7 backdrop-blur md:flex-row md:items-center md:gap-9 md:p-10">
            <div className="relative grid size-24 shrink-0 place-items-center">
              <span className="orbit absolute inset-0 rounded-full border border-dashed border-ciano-200/60" />
              <span className="grid size-[68px] place-items-center rounded-full bg-white text-roxo">
                <Icon name="dna" size={34} />
              </span>
            </div>
            <div>
              <h3 className="display text-[1.5rem]">A tecnologia por trás</h3>
              <p className="mt-2 text-white/80">
                Os testes de DNA usam{" "}
                <strong className="font-semibold text-white">
                  sequenciamento de nova geração (NGS) direcionado
                </strong>{" "}
                com PCR multiplex: centenas de marcadores validados na literatura são amplificados em
                uma única reação. Só as regiões de interesse clínico são sequenciadas, o que dá alta
                sensibilidade e especificidade com custo e prazo compatíveis com a rotina.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
