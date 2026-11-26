"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { inovacao } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { FadeUp } from "../motion/FadeUp";
import { ScrubText } from "../motion/ScrubText";
import { Words } from "../motion/Words";
import { Tag } from "../ui/Button";
import { ArrowRight, Icon } from "../ui/icons";

export function Inovacao() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <FadeUp>
              <Tag>Inovação na rotina clínica</Tag>
            </FadeUp>
            <Words
              className="display mt-6 text-display text-ink"
              parts={["O que a medicina humana já faz há anos, agora na sua rotina"]}
            />
          </div>
          <div className="flex flex-col gap-6">
            <ScrubText
              className="text-[1.1875rem] leading-[1.5] text-ink md:text-[1.375rem]"
              text="Na oncologia humana, o perfil molecular do tumor é cada vez mais usado para orientar a escolha de terapias-alvo e quimioterápicos. Na medicina preventiva, testes de predisposição orientam check-ups antes que a doença apareça. A Box4Vets traz essa mesma lógica para cães e gatos, com tecnologia de sequenciamento usada nos principais centros de pesquisa."
            />
            <ScrubText
              className="text-[1.1875rem] leading-[1.5] text-ink md:text-[1.375rem]"
              text="O resultado é uma medicina veterinária que deixa de reagir ao sintoma e passa a se antecipar a ele. E que, quando a doença já está instalada, escolhe o tratamento pelo que o paciente tem, não pelo que a média dos pacientes costuma ter."
            />
          </div>
        </div>

        <motion.div
          className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.12 }}
        >
          {inovacao.map((item) => (
            <motion.article
              key={item.de}
              className="group flex min-w-0 flex-col rounded-card border border-line bg-white p-2.5 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(63_47_128/0.14)]"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: ease.out } },
              }}
            >
              <div className="grad-card relative grid h-60 place-items-center overflow-hidden rounded-[14px]">
                {item.foto && (
                  <>
                    <Image
                      src={item.foto}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 400px, 92vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                  </>
                )}
                {!item.foto && (
                  <>
                    <span className="absolute size-56 rounded-full border border-white/40 transition-transform duration-700 ease-out-expo group-hover:scale-125" />
                    <span className="absolute size-36 rounded-full border border-white/50 transition-transform duration-700 ease-out-expo group-hover:scale-110" />
                  </>
                )}
                <span className={`${item.foto ? "absolute bottom-3 left-3 size-12" : "relative size-[72px]"} grid place-items-center rounded-full bg-roxo text-white shadow-[0_10px_24px_rgb(63_47_128/0.35)] transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6`}>
                  <Icon name={item.icon} size={item.foto ? 22 : 32} />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
                <p className="flex items-center gap-1 text-[clamp(0.5rem,2.4vw,0.6875rem)] font-semibold tracking-[0.02em] whitespace-nowrap uppercase lg:gap-1 lg:text-[clamp(0.5rem,0.69vw,0.65rem)]">
                  <span className="rounded-full bg-paper px-2 py-1.5 text-mute">{item.de}</span>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-roxo transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span className="rounded-full bg-roxo px-2 py-1.5 text-white">{item.para}</span>
                </p>
                <p className="text-mute">{item.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
