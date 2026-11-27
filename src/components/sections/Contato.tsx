"use client";

import { asset } from "@/lib/base";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { contatos, links } from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { SplitButton } from "../ui/Button";
import { ArrowUpRight, Check } from "../ui/icons";
import { Logo } from "../ui/Logo";

const field =
  "min-h-12 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[1rem] font-normal text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-mute/60 focus:border-roxo focus:bg-white focus:shadow-[0_0_0_4px_rgb(63_47_128/0.12)]";

function Form() {
  const [sent, setSent] = useState(false);

  // Sem servidor por enquanto: a mensagem abre pronta no WhatsApp da equipe.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const linhas = [
      `Olá! Sou ${get("nome")} e gostaria de falar com a equipe Box4Vets.`,
      get("email") && `E-mail: ${get("email")}`,
      get("whatsapp") && `WhatsApp: ${get("whatsapp")}`,
      get("cidade") && `Cidade/UF: ${get("cidade")}`,
      get("mensagem") && `Mensagem: ${get("mensagem")}`,
    ].filter(Boolean);
    window.open(`${links.whatsapp}?text=${encodeURIComponent(linhas.join("\n"))}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-panel bg-white p-6 text-ink shadow-[0_40px_90px_rgb(27_18_61/0.35)] md:p-9"
    >
      <h3 className="display text-[1.625rem]">Fale com nossa equipe</h3>
      <label className="flex flex-col gap-1.5 text-[0.875rem] font-semibold">
        Nome
        <input type="text" name="nome" required autoComplete="name" className={field} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-[0.875rem] font-semibold">
          E-mail
          <input type="email" name="email" autoComplete="email" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-[0.875rem] font-semibold">
          WhatsApp
          <input type="tel" name="whatsapp" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-[0.875rem] font-semibold">
        Cidade/UF
        <input type="text" name="cidade" autoComplete="address-level2" className={field} />
      </label>
      <label className="flex flex-col gap-1.5 text-[0.875rem] font-semibold">
        Mensagem
        <textarea name="mensagem" rows={3} className={`${field} resize-y`} />
      </label>
      <button
        type="submit"
        className="group mt-1 flex h-13 cursor-pointer items-center justify-center gap-2 rounded-xl bg-roxo text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-roxo-700"
      >
        Enviar
        <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
      <p aria-live="polite" className="min-h-5 text-[0.875rem] text-mute">
        {sent && (
          <span className="flex items-center gap-2 text-roxo">
            <Check size={16} strokeWidth={2.4} /> Abrimos o WhatsApp com a sua mensagem pronta para enviar.
          </span>
        )}
      </p>
    </form>
  );
}

/** Chamada final com formulario, e o rodape em cartao logo abaixo. */
export function Contato({ base = "" }: { base?: string }) {
  const to = (href: string) => asset(href.startsWith("#") ? base + href : href);
  return (
    <section id="contato" className="pt-2 pb-3">
      <div data-dark className="panel bg-roxo pt-24 pb-3 text-white md:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-[8%] left-1/2 aspect-square w-[150%] -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.03]" />
          <div className="absolute top-[22%] left-1/2 aspect-square w-[110%] -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.03]" />
          <div className="absolute -top-80 -right-52 size-[900px] bg-[radial-gradient(closest-side,rgb(124_107_208/0.55),transparent)]" />
          <div className="absolute -bottom-52 -left-72 size-[800px] bg-[radial-gradient(closest-side,rgb(0_172_200/0.25),transparent)]" />
        </div>

        <div className="container-page relative grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Words
              className="display text-display"
              parts={["Leve a medicina de precisão para os seus atendimentos"]}
            />
            <FadeUp delay={0.1}>
              <p className="mt-5 max-w-[540px] text-[1.125rem] text-white/85">
                Faça parte da Parceria Vet Box4Vets e ofereça aos seus pacientes a mesma tecnologia
                usada nos grandes centros, de qualquer lugar do Brasil.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <SplitButton href={links.exame} variant="light">
                  Solicitar exame
                </SplitButton>
                <SplitButton href={links.tabela} variant="outline">
                  Solicitar tabela de preços
                </SplitButton>
                <SplitButton href={links.whatsapp} variant="outline">
                  Falar no WhatsApp
                </SplitButton>
              </div>
            </FadeUp>

            <motion.ul
              className="mt-12 flex flex-col text-[0.9375rem]"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={{ staggerChildren: 0.08 }}
            >
              {contatos.map((c) => (
                <motion.li
                  key={c.label}
                  className="grid gap-1 border-t border-white/15 py-4 sm:grid-cols-[190px_1fr] sm:gap-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
                  }}
                >
                  <span className="text-white/60">{c.label}</span>
                  {"href" in c ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener"
                      className="w-fit font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                    >
                      {c.valor}
                    </a>
                  ) : (
                    <span className="text-white/90">{c.valor}</span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <FadeUp delay={0.15}>
            <Form />
          </FadeUp>
        </div>

        {/* Rodape discreto: sem menu e sem cartao branco, so o logo e as informacoes, centralizados. */}
        <footer className="container-page relative mt-16 md:mt-24">
          <div className="flex flex-col items-center gap-4 border-t border-white/15 pt-8 pb-5 text-center">
            <a href={to("#topo")} aria-label="Voltar ao topo" className="text-white/90 transition-opacity hover:opacity-70">
              <Logo mono className="h-8 w-auto" />
            </a>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.8125rem] text-white/60">
              <span>© Copyright 2026 Ridge Research LLC</span>
              <span aria-hidden className="size-1 rounded-full bg-white/30 max-sm:hidden" />
              <a
                href={links.site}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 text-white/80 transition-colors hover:text-white"
              >
                box4vets.com.br <ArrowUpRight size={13} />
              </a>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
