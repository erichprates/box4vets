"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faq, links } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Tag } from "../ui/Button";
import { Plus } from "../ui/icons";

/** Perguntas em sanfona numerada (ref. Curenast). */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="panel bg-paper py-24 md:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <FadeUp>
            <Tag>Perguntas frequentes</Tag>
          </FadeUp>
          <Words className="display mt-6 text-display text-ink" parts={["Tire suas dúvidas"]} />
        </div>

        <motion.div
          className="flex flex-col gap-2.5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.06 }}
        >
          {faq.map((item, i) => {
            const on = open === i;
            return (
              <motion.div
                key={item.q}
                className={`rounded-card bg-white transition-shadow duration-500 ${
                  on ? "shadow-[0_20px_50px_rgb(63_47_128/0.1)]" : ""
                }`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
                }}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full cursor-pointer items-center gap-4 p-5 text-left md:gap-5 md:px-7 md:py-6"
                  >
                    <span className="text-[1.0625rem] text-mute/70 tabular-nums">/0{i + 1}</span>
                    <span className="display flex-1 text-[1.0625rem] leading-snug text-ink md:text-[1.1875rem]">
                      {item.q}
                    </span>
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full text-white transition-all duration-500 ease-out-expo ${
                        on ? "rotate-[135deg] bg-ciano-700" : "bg-ink"
                      }`}
                    >
                      <Plus size={16} strokeWidth={2.2} />
                    </span>
                  </button>
                </h3>
                    <motion.div
                      id={`faq-${i}`}
                      className="overflow-hidden"
                      inert={!on}
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: ease.out }}
                    >
                      <p className="px-5 pb-6 text-[0.9375rem] text-mute md:pr-20 md:pl-[4.6rem]">
                        {item.tabela ? (
                          <>
                            Médicos-veterinários parceiros têm condições diferenciadas.{" "}
                            <a
                              href={links.tabela}
                              target="_blank"
                              rel="noopener"
                              className="font-semibold text-roxo underline decoration-roxo/30 underline-offset-4 hover:decoration-roxo"
                            >
                              Solicite a tabela de preços
                            </a>{" "}
                            e nossa equipe envia os valores atualizados.
                          </>
                        ) : (
                          item.a
                        )}
                      </p>
                    </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
