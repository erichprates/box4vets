"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { laudos } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { ArrowRight, Close } from "../ui/icons";

/** Visualizador de laudo: barra com titulo, troca entre os tres e fecha no Esc. */
function Visualizador({ index, onChange, onClose }: { index: number; onChange: (i: number) => void; onClose: () => void }) {
  const laudo = laudos[index];
  const go = (d: number) => onChange((index + d + laudos.length) % laudos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % laudos.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + laudos.length) % laudos.length);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [index, onChange, onClose]);

  const round =
    "grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-ink";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Laudo-modelo ${laudo.titulo}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/92 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white md:px-8">
        <div className="min-w-0">
          <p className="text-[0.75rem] font-semibold tracking-[0.1em] text-ciano-200 uppercase">
            Laudo-modelo · {laudo.categoria}
          </p>
          <p className="display truncate text-[1.125rem] md:text-[1.375rem]">{laudo.titulo}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="px-2 text-[0.875rem] text-white/60 tabular-nums max-sm:hidden">
            {index + 1} / {laudos.length}
          </span>
          <button type="button" aria-label="Laudo anterior" onClick={() => go(-1)} className={round}>
            <ArrowRight size={18} className="rotate-180" />
          </button>
          <button type="button" aria-label="Próximo laudo" onClick={() => go(1)} className={round}>
            <ArrowRight size={18} />
          </button>
          <button
            type="button"
            autoFocus
            aria-label="Fechar"
            onClick={onClose}
            className="ml-2 grid size-11 cursor-pointer place-items-center rounded-full bg-white text-ink"
          >
            <Close size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 md:py-10" data-lenis-prevent onClick={onClose}>
        <AnimatePresence mode="wait">
          <motion.div
            key={laudo.src}
            className="mx-auto max-w-[860px]"
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: ease.out }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={laudo.src}
              alt={laudo.alt}
              width={1100}
              height={1556}
              quality={88}
              sizes="860px"
              className="w-full rounded-lg bg-white shadow-[0_40px_100px_rgb(0_0_0/0.5)]"
            />
            <p className="py-5 text-center text-[0.875rem] text-white/60">
              {laudo.texto} Laudo-modelo, sem dados de pacientes reais.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** Tres laudos-modelo. No hover a pagina "rola" dentro do card; o clique abre o visualizador. */
export function Laudos() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="laudos" className="pb-24 md:pb-32">
      <div className="container-page">
        <div className="max-w-[820px]">
          <Words as="h3" className="display text-title text-ink" parts={["Como é o laudo"]} />
          <FadeUp delay={0.1}>
            <p className="mt-3 text-mute">
              Veja a primeira página de laudos-modelo. Cada condição avaliada aparece com o resultado
              e, ao lado, os genes analisados e as raças de referência. No OncoRisk, o laudo traz
              também a recomendação clínica de acompanhamento.
            </p>
          </FadeUp>
        </div>

        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.12 }}
        >
          {laudos.map((laudo, i) => (
            <motion.figure
              key={laudo.src}
              className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(63_47_128/0.16)]"
              variants={{
                hidden: { opacity: 0, y: 70, rotate: i === 0 ? -3 : i === 2 ? 3 : 0 },
                show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1, ease: ease.out } },
              }}
            >
              <div className="grad-soft relative h-[340px] overflow-hidden px-6 pt-6">
                <Image
                  src={laudo.src}
                  alt={laudo.alt}
                  width={1100}
                  height={1556}
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="w-full rounded-t-lg shadow-[0_10px_30px_rgb(27_18_61/0.18)] transition-transform duration-[2500ms] ease-out group-hover:-translate-y-[38%]"
                />
              </div>
              <figcaption className="flex flex-1 flex-col gap-1.5 p-6">
                <span className="text-[0.75rem] font-semibold tracking-[0.1em] text-roxo uppercase">
                  {laudo.categoria}
                </span>
                <strong className="display text-[1.25rem] text-ink">{laudo.titulo}</strong>
                <span className="text-[0.9375rem] text-mute">{laudo.texto}</span>
                {/* O botao cobre o card inteiro: clicar em qualquer ponto abre o laudo. */}
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="mt-4 block w-full cursor-pointer text-left after:absolute after:inset-0"
                >
                  <span className="relative flex h-13 items-center justify-between overflow-hidden rounded-xl bg-paper pr-1.5 pl-5 text-[0.9375rem] font-medium text-ink">
                    {/* Preenchimento roxo que sobe no hover do card. */}
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-roxo transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
                    <span className="relative transition-colors duration-300 group-hover:text-white">
                      Ver laudo completo
                    </span>
                    <span className="relative grid size-10 place-items-center rounded-lg bg-white text-roxo shadow-[0_2px_8px_rgb(27_18_61/0.08)] transition-transform duration-500 ease-out-expo group-hover:scale-90">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                        className="transition-transform duration-500 ease-out-expo group-hover:scale-125"
                      >
                        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                      </svg>
                    </span>
                  </span>
                </button>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <p className="mt-5 text-[0.875rem] text-mute">
          Laudos-modelo, sem dados de pacientes reais. Clique na imagem para ampliar.
        </p>
      </div>

      <AnimatePresence>
        {open !== null && <Visualizador index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
