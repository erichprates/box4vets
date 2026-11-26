"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { links, portfolio, type Categoria } from "@/content/site";
import { ease } from "@/lib/motion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { SplitButton, Tag } from "../ui/Button";
import { Plus } from "../ui/icons";

const chip: Record<Categoria, string> = {
  Preditiva: "bg-lilas text-roxo",
  Diagnóstico: "bg-[#dff3f8] text-[#0b5c73]",
  Prognóstico: "bg-[#fcebdd] text-[#8a3b0b]",
  Precisão: "bg-roxo text-white",
};

/** Celula de dado: no celular vira uma linha "rotulo ........ valor". */
const celula =
  "px-5 py-4 max-md:flex max-md:justify-between max-md:gap-6 max-md:border-t max-md:border-line/70 max-md:px-0 max-md:py-2 max-md:text-right max-md:text-[0.875rem] max-md:before:shrink-0 max-md:before:text-left max-md:before:font-normal max-md:before:text-mute max-md:before:content-[attr(data-label)]";

const filtros: ("Todos" | Categoria)[] = ["Todos", "Preditiva", "Diagnóstico", "Prognóstico", "Precisão"];

/** Tabela do portfolio com filtro por categoria. */
export function Portfolio() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");
  const [tudo, setTudo] = useState(false);
  const todas = portfolio.filter((r) => filtro === "Todos" || r.categoria === filtro);
  // Todas as linhas ficam escritas na pagina (bom para buscadores); as que nao entram no filtro so somem.
  const visivel = (r: (typeof portfolio)[number], n: number) =>
    filtro === "Todos" ? tudo || n < 6 : r.categoria === filtro;
  const mostradas = portfolio.filter(visivel).length;

  return (
    <section id="portfolio" className="pb-24 md:pb-36">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <FadeUp>
              <Tag>Portfólio de exames</Tag>
            </FadeUp>
            <Words className="display mt-6 text-display text-ink" parts={["Escolha pela pergunta clínica"]} />
          </div>
          <FadeUp delay={0.1} className="max-w-full min-w-0">
            <div
              role="group"
              aria-label="Filtrar por categoria"
              className="flex max-w-full flex-wrap gap-2 md:gap-1 md:rounded-full md:border md:border-line md:bg-white md:p-1"
            >
              {filtros.map((f) => {
                const on = f === filtro;
                const n = f === "Todos" ? portfolio.length : portfolio.filter((r) => r.categoria === f).length;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFiltro(f)}
                    className={`relative min-h-11 shrink-0 cursor-pointer rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-300 ${
                      on ? "text-white" : "text-mute hover:text-ink max-md:border max-md:border-line max-md:bg-white max-md:text-ink max-md:shadow-[0_2px_8px_rgb(27_18_61/0.06)]"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="filtro-ativo"
                        className="pointer-events-none absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {f} <span className="text-[0.8125rem] opacity-60 tabular-nums">{n}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeUp>
        </div>

        <FadeUp className="mt-10">
          <div className="no-scrollbar rounded-panel border border-line bg-white max-md:overflow-hidden md:overflow-x-auto">
            <table className="w-full border-collapse text-left text-[0.9375rem] max-md:block md:min-w-[820px]">
              {/* No celular cada exame vira um cartao; o cabecalho some e cada dado leva o proprio rotulo. */}
              <thead className="max-md:hidden">
                <tr className="bg-roxo text-white">
                  {["Categoria", "Exame", "Espécie", "Amostra", "Prazo"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-4 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="max-md:block">
                  {portfolio.map((r, i) => {
                    const on = visivel(r, i);
                    return (
                    <motion.tr
                      key={r.exame}
                      hidden={!on}
                      className="group border-t border-line transition-colors duration-300 first:border-0 hover:bg-paper max-md:block max-md:px-5 max-md:py-5"
                      initial={false}
                      animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                      transition={{ duration: on ? 0.45 : 0, ease: ease.out }}
                    >
                      <td className="px-5 py-4 max-md:block max-md:p-0">
                        <span className={`rounded-full px-2.5 py-1 text-[0.8125rem] font-semibold ${chip[r.categoria]}`}>
                          {r.categoria}
                        </span>
                      </td>
                      <td className="px-5 py-4 max-md:block max-md:px-0 max-md:pt-3 max-md:pb-2 max-md:text-[1.0625rem]">
                        <span className="font-semibold text-ink">{r.exame}</span>
                        {r.novo && (
                          <span className="ml-2 rounded-full bg-ciano px-2 py-0.5 text-[0.6875rem] font-semibold text-ink">
                            Novo
                          </span>
                        )}
                        {r.nota && <span className="mt-0.5 block text-[0.8125rem] text-mute">{r.nota}</span>}
                      </td>
                      <td data-label="Espécie" className={`${celula} text-mute md:whitespace-nowrap`}>{r.especie}</td>
                      <td data-label="Amostra" className={`${celula} text-mute`}>{r.amostra}</td>
                      <td data-label="Prazo" className={`${celula} font-medium text-ink md:whitespace-nowrap`}>{r.prazo}</td>
                    </motion.tr>
                    );
                  })}
              </tbody>
            </table>
            {mostradas < todas.length && (
              <button
                type="button"
                onClick={() => setTudo(true)}
                className="sticky left-0 flex min-h-14 w-full cursor-pointer items-center justify-center gap-2.5 border-t border-line bg-paper text-[0.9375rem] font-medium text-roxo transition-colors hover:bg-lilas"
              >
                Ver todos os {todas.length} exames
                <span className="grid size-7 place-items-center rounded-full bg-roxo text-white">
                  <Plus size={14} strokeWidth={2.2} />
                </span>
              </button>
            )}
          </div>
        </FadeUp>

        <FadeUp className="mt-5">
          <div className="grad-soft flex flex-wrap items-center justify-between gap-6 rounded-panel p-7 md:p-9">
            <div className="max-w-[640px]">
              <strong className="display block text-[1.375rem] text-ink">
                Condições especiais para médicos-veterinários parceiros
              </strong>
              <span className="mt-2 block text-[0.9375rem] text-mute">
                Solicite a tabela de preços atualizada e fale com a nossa equipe. Prazos contados a
                partir do recebimento da amostra.
              </span>
            </div>
            <SplitButton href={links.tabela}>Solicitar tabela de preços</SplitButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
