"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { paineis, type IconName } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { Counter } from "../motion/Counter";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Tag } from "../ui/Button";
import { Icon } from "../ui/icons";

const subnav = [
  { href: "#doencas", label: "Doenças analisadas nos painéis genéticos" },
  { href: "#laudos", label: "Como é o laudo" },
  { href: "#oncoscan", label: "OncoScan × OncoScan Compact" },
  { href: "#ihc-rna", label: "Imuno-histoquímica × análise de RNA" },
];

const orbitIcons: IconName[] = ["brain", "eye", "drop", "paw", "dna", "target"];

/** Icones girando em volta do titulo, em dois aneis (ref. Curenast, "Trusted care"). */
function Orbit() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_78%,transparent)]"
    >
      <div className="absolute aspect-square w-[min(1180px,150vw)] rounded-full border border-line bg-paper/60" />
      <div className="absolute aspect-square w-[min(760px,104vw)] rounded-full border border-line bg-lilas/50" />
      <div
        className="orbit absolute aspect-square w-[min(1180px,150vw)]"
        style={{ ["--orbit-duration" as string]: "90s" }}
      >
        {orbitIcons.map((name, i) => (
          <span
            key={name}
            className="absolute top-1/2 left-1/2 size-0"
            style={{ transform: `rotate(${i * 60}deg) translateY(calc(min(1180px,150vw) / -2))` }}
          >
            <span
              className="absolute -top-8 -left-8 block size-16"
              style={{ transform: `rotate(${-i * 60}deg)` }}
            >
              <span
                className="orbit-item grid size-16 place-items-center rounded-full border border-line bg-white text-roxo shadow-[0_12px_30px_rgb(63_47_128/0.16)]"
                style={{ ["--orbit-duration" as string]: "90s" }}
              >
                <Icon name={name} size={28} />
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TestesIntro() {
  return (
    <section id="testes" className="relative overflow-hidden py-28 md:py-44">
      <Orbit />
      <div className="container-page relative flex flex-col items-center text-center">
        <FadeUp>
          <Tag>Os testes em detalhe</Tag>
        </FadeUp>
        <Words
          className="display mt-6 max-w-[820px] text-display text-ink"
          parts={["O que cada teste analisa, e por que isso muda a sua decisão"]}
        />
        <FadeUp delay={0.15}>
          <p className="mt-5 max-w-[560px] text-mute">
            Das doenças hereditárias investigadas nos painéis genéticos ao perfil de expressão gênica
            do tumor no OncoScan.
          </p>
        </FadeUp>
        <motion.nav
          aria-label="Nesta seção"
          className="mt-9 flex max-w-[820px] flex-wrap justify-center gap-2.5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
        >
          {subnav.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 py-2 text-[0.9375rem] font-medium text-roxo shadow-[0_2px_10px_rgb(27_18_61/0.05)] transition-colors duration-300 hover:border-roxo hover:bg-roxo hover:text-white"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
              }}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}

const grupos = [
  { id: "sentinela", tag: "Medicina Preditiva", titulo: "Painel Sentinela", tone: "bg-lilas text-roxo" },
  { id: "sistema", tag: "Diagnóstico", titulo: "Painéis por sistema · Cães", tone: "bg-[#dff3f8] text-[#0b5c73]" },
] as const;

/** Explorador das doencas: escolhe o painel a esquerda, a lista troca a direita. */
export function Doencas() {
  const [id, setId] = useState(paineis[0].id);

  return (
    <section id="doencas" className="pb-24 md:pb-32">
      <div className="container-page">
        <div className="max-w-[760px]">
          <Words
            as="h3"
            className="display text-title text-ink"
            parts={["Doenças analisadas nos painéis genéticos"]}
          />
          <FadeUp delay={0.1}>
            <p className="mt-3 text-mute">
              Todos os painéis abaixo usam um único swab bucal, sequenciamento NGS e PCR multiplex, com
              liberação em 6 a 8 semanas.
            </p>
          </FadeUp>
        </div>

        <FadeUp className="mt-10">
          <div className="grid gap-3 rounded-panel bg-paper p-3 lg:grid-cols-[340px_1fr]">
            <div
              role="tablist"
              aria-label="Painéis genéticos"
              className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-1.5 lg:p-2"
            >
              {grupos.map((g) => (
                <div key={g.id} className="contents lg:flex lg:flex-col lg:gap-1.5 lg:not-first:mt-5">
                  <h4 className="hidden items-center gap-2.5 px-2 pb-2 text-[1.0625rem] font-semibold text-ink lg:flex">
                    <span className={`rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${g.tone}`}>
                      {g.tag}
                    </span>
                    {g.titulo}
                  </h4>
                  {paineis
                    .filter((p) => p.grupo === g.id)
                    .map((p) => {
                      const on = p.id === id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="tab"
                          aria-selected={on}
                          onClick={() => setId(p.id)}
                          className={`relative flex min-h-14 cursor-pointer items-center gap-2 rounded-2xl px-3 py-2 text-left transition-colors duration-300 lg:gap-3 ${
                            on ? "text-white" : "text-ink hover:bg-white max-lg:bg-white max-lg:shadow-[0_2px_8px_rgb(27_18_61/0.06)]"
                          }`}
                        >
                          {on && (
                            <motion.span
                              layoutId="painel-ativo"
                              className="pointer-events-none absolute inset-0 rounded-2xl bg-roxo shadow-[0_14px_30px_rgb(63_47_128/0.3)]"
                              transition={{ type: "spring", stiffness: 360, damping: 32 }}
                            />
                          )}
                          <span
                            className={`relative grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-300 max-lg:hidden ${
                              on ? "bg-white/15" : "bg-white text-roxo"
                            }`}
                          >
                            <Icon name={p.icon} size={20} />
                          </span>
                          <span className="relative flex-1 font-medium max-lg:text-[0.875rem] max-lg:leading-tight lg:whitespace-nowrap">
                            {p.nome}
                          </span>
                          <span
                            className={`relative rounded-full px-2 py-1 text-[0.75rem] whitespace-nowrap tabular-nums lg:px-2.5 lg:text-[0.8125rem] ${
                              on ? "bg-white/15" : "bg-white text-mute max-lg:bg-paper"
                            }`}
                          >
                            {p.condicoes.length}
                            <span className="max-lg:hidden"> condições</span>
                          </span>
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>

            {/* Todos os paineis ficam escritos na pagina (bom para buscadores); so o escolhido aparece. */}
            <div className="overflow-hidden rounded-[20px] bg-white p-6 md:p-9 lg:min-h-[620px]">
              {paineis.map((p) => {
                const on = p.id === id;
                const g = grupos.find((x) => x.id === p.grupo)!;
                return (
                  <div key={p.id} role="tabpanel" aria-label={p.nome} hidden={!on}>
                    <motion.div
                      initial={false}
                      animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                      transition={{ duration: 0.4, ease: ease.out }}
                    >
                      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
                        <div>
                          <span className={`rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${g.tone}`}>
                            {g.tag}
                          </span>
                          <p className="mt-3 text-[0.875rem] text-mute lg:hidden">{g.titulo}</p>
                          <h4 className="display mt-2 text-[1.75rem] text-ink md:text-[2.25rem]">{p.nome}</h4>
                        </div>
                        <p className="flex items-baseline gap-2 text-mute">
                          <Counter
                            value={p.condicoes.length}
                            className="display text-[3.5rem] leading-none text-roxo"
                          />
                          condições
                        </p>
                      </div>
                      <motion.ul
                        className="mt-6 gap-x-10 sm:columns-2"
                        initial={false}
                        animate={on ? "show" : "hidden"}
                        transition={{ staggerChildren: 0.025, delayChildren: 0.1 }}
                      >
                        {p.condicoes.map((c) => (
                          <motion.li
                            key={c}
                            className="flex break-inside-avoid items-start gap-3 border-b border-line/70 py-2.5 text-[0.9375rem] text-ink"
                            variants={{
                              hidden: { opacity: 0, x: -14, transition: { duration: 0 } },
                              show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease.out } },
                            }}
                          >
                            <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ciano" />
                            {c}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>

        <p className="mt-5 text-[0.875rem] text-mute">
          O laudo informa, para cada condição, o gene avaliado e as raças de referência.
        </p>
      </div>
    </section>
  );
}
