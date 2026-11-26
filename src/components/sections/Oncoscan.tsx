"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  compactIndicacoes,
  expressao,
  ihcRna,
  oncoscanGrupos,
  oncoscanInfo,
  oncoscanLinhas,
} from "@/content/site";
import { ease, viewport } from "@/lib/motion";
import { Counter } from "../motion/Counter";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { Rich } from "../ui/Button";
import { Check, Minus } from "../ui/icons";

function Valor({ v, dark }: { v: string | boolean; dark: boolean }) {
  if (typeof v === "string") return <strong className="font-semibold">{v}</strong>;
  if (v)
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold ${dark ? "text-ciano-200" : "text-roxo"}`}>
        <span className={`grid size-5 place-items-center rounded-full ${dark ? "bg-ciano-200/20" : "bg-lilas"}`}>
          <Check size={13} strokeWidth={2.4} />
        </span>
        Incluído
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-mute">
      <span className="grid size-5 place-items-center rounded-full bg-paper">
        <Minus size={13} strokeWidth={2.4} />
      </span>
      Não incluído
    </span>
  );
}

const infoTabs = [
  ...oncoscanInfo.map((i) => ({ aba: i.titulo, titulo: i.titulo, texto: i.texto, fonte: "" })),
  {
    aba: "Evidência",
    titulo: "Hemangiossarcoma",
    texto:
      "No hemangiossarcoma esplênico, o mapeamento genético mostrou que mutações que ativam a via PI3K/AKT/mTOR, quando inibidas com terapia-alvo, se associam a melhor prognóstico. O OncoScan identifica a ativação dessas vias no tumor, além das mutações vistas no DNA.",
    fonte: "(Rodrigues et al., Sci Rep 15:16442, 2025)",
  },
];

const pill = "relative min-h-11 shrink-0 cursor-pointer rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-300";

/**
 * Amostra, envio, liberacao e evidencia. As abas ficam em coluna a esquerda e ja dizem o
 * assunto; a direita vem so a resposta, em texto grande, sem repetir o titulo.
 */
function InfoTabs() {
  const [i, setI] = useState(0);
  return (
    <div data-dark className="grid gap-2 rounded-panel bg-ink p-3 text-white md:grid-cols-[250px_1fr]">
      <div role="tablist" aria-label="Detalhes do OncoScan" className="no-scrollbar flex gap-1 overflow-x-auto md:flex-col">
        {infoTabs.map((tab, n) => {
          const on = n === i;
          return (
            <button
              key={tab.aba}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setI(n)}
              className={`relative flex min-h-12 shrink-0 cursor-pointer items-center gap-3 rounded-xl px-4 text-left text-[1rem] font-medium transition-colors duration-300 md:min-h-14 ${
                on ? "text-ink" : "text-white/65 hover:text-white"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="onco-aba"
                  className="pointer-events-none absolute inset-0 rounded-xl bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative text-[0.75rem] tabular-nums ${on ? "text-roxo" : "text-ciano-200"}`}>
                /0{n + 1}
              </span>
              <span className="relative">{tab.aba}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="flex min-h-[230px] items-center rounded-[20px] bg-white/[0.06] p-6 md:min-h-[250px] md:p-10"
      >
        {infoTabs.map((t, n) => (
          <motion.div
            key={t.aba}
            hidden={n !== i}
            initial={false}
            animate={n === i ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
            transition={{ duration: n === i ? 0.5 : 0, ease: ease.out }}
          >
            {/* So a evidencia tem um nome proprio, diferente do da aba. */}
            {t.titulo !== t.aba && (
              <p className="mb-3 text-[0.8125rem] font-semibold tracking-[0.1em] text-ciano-200 uppercase">
                {t.titulo}
              </p>
            )}
            <p
              className={`leading-snug text-white ${
                t.fonte ? "text-[1.0625rem] md:text-[1.1875rem]" : "text-[1.25rem] md:text-[1.625rem]"
              }`}
            >
              {t.texto}
            </p>
            {t.fonte && <p className="mt-3 text-[0.875rem] text-white/55">{t.fonte}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Imuno-histoquimica x RNA: escolhe o criterio, compara lado a lado. */
function Comparador() {
  const [i, setI] = useState(0);
  return (
    <div className="rounded-panel bg-paper p-3">
      <div role="tablist" aria-label="Critério de comparação" className="no-scrollbar flex gap-1 overflow-x-auto">
        {ihcRna.map((r, n) => (
          <button
            key={r.item}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`${pill} ${n === i ? "text-white" : "text-mute hover:text-ink"}`}
          >
            {n === i && (
              <motion.span
                layoutId="ihc-aba"
                className="pointer-events-none absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{r.item}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="flex min-h-[210px] flex-col justify-between gap-8 rounded-[20px] bg-white p-7 md:p-9">
          <p className="display text-[1.25rem] text-mute">Imuno-histoquímica</p>
          <div>
            {ihcRna.map((r, n) => (
              <motion.p
                key={r.item}
                hidden={n !== i}
                className="text-[1.25rem] leading-snug text-ink md:text-[1.5rem]"
                initial={false}
                animate={n === i ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
                transition={{ duration: n === i ? 0.4 : 0, ease: ease.out }}
              >
                {r.ihc}
              </motion.p>
            ))}
          </div>
        </div>
        <div className="flex min-h-[210px] flex-col justify-between gap-8 rounded-[20px] bg-roxo p-7 text-white shadow-[0_24px_60px_rgb(63_47_128/0.3)] md:p-9">
          <p className="display text-[1.25rem] text-ciano-200">Análise de RNA · OncoScan</p>
          <div>
            {ihcRna.map((r, n) => (
              <motion.p
                key={r.item}
                hidden={n !== i}
                className="text-[1.25rem] leading-snug md:text-[1.5rem]"
                initial={false}
                animate={n === i ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
                transition={{ duration: n === i ? 0.4 : 0, ease: ease.out }}
              >
                <Rich text={r.rna} strong="font-semibold text-white" />
              </motion.p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pt-4 pb-2 text-[0.875rem] text-mute">
        <span className="tabular-nums">
          {i + 1} / {ihcRna.length}
        </span>
        <button
          type="button"
          onClick={() => setI((i + 1) % ihcRna.length)}
          className="min-h-11 cursor-pointer font-medium text-roxo"
        >
          Próximo critério →
        </button>
      </div>
    </div>
  );
}

/** Numero do grafico: conta de zero ate o valor, com uma casa decimal ("4,9×"). */
function Vezes({ valor, play, delay, className }: { valor: string; play: boolean; delay: number; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const alvo = parseFloat(valor.replace(",", "."));
  useEffect(() => {
    const node = ref.current;
    if (!node || !play) return;
    const c = animate(0, alvo, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = v.toFixed(1).replace(".", ",") + "×"),
    });
    return () => c.stop();
  }, [play, alvo, delay]);
  return (
    <span ref={ref} className={className}>
      0,0×
    </span>
  );
}

/**
 * Grafico de expressao genica como leitura de equipamento: painel escuro, um gene por vez.
 * Em cada linha o trilho se desenha a partir do controle, a medida avanca devagar ate o
 * valor com um ponto de luz na ponta, o numero conta junto e a leitura clinica aparece.
 */
function Grafico() {
  const ref = useRef<HTMLDivElement>(null);
  const play = useInView(ref, { once: true, amount: 0.5 });
  const suave = [0.16, 1, 0.3, 1] as const;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Expressão gênica em relação ao controle: FLT3 4,9 vezes aumentado, RRM1 4,3 vezes aumentado, AKT3 2,2 vezes aumentado, TP53 5,7 vezes diminuído"
      className="relative overflow-hidden rounded-panel bg-ink p-6 text-white shadow-[0_30px_70px_rgb(27_18_61/0.35)] md:p-9"
    >
      <div aria-hidden className="absolute -top-24 right-0 size-72 rounded-full bg-roxo-400/35 blur-3xl" />

      <div className="relative grid grid-cols-[1fr_1fr] pl-[68px] pr-[84px] text-[0.75rem] tracking-[0.08em] text-white/50 uppercase">
        <span>diminuído</span>
        <span className="text-right">aumentado</span>
      </div>

      <div className="relative mt-4 flex flex-col">
        {expressao.map((g, i) => {
          const up = g.sentido === "up";
          const t = 0.2 + i * 0.5;
          const cor = up ? "text-ciano-200" : "text-[#ffb27a]";
          return (
            <motion.div
              key={g.gene}
              className="group border-t border-white/10 py-4 first:border-0"
              initial={{ opacity: 0, y: 14 }}
              animate={play ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: suave, delay: t }}
            >
              <div className="grid grid-cols-[56px_1fr_72px] items-center gap-x-3">
                <strong className="display text-[1.0625rem]">{g.gene}</strong>

                {/* Trilho: metade esquerda = diminuido, metade direita = aumentado. */}
                <div className="relative h-5">
                  <motion.span
                    className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-white/15"
                    initial={{ scaleX: 0 }}
                    animate={play ? { scaleX: 1 } : undefined}
                    transition={{ duration: 0.9, ease: suave, delay: t }}
                  />
                  <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-white/40" />
                  <div className={`absolute top-1/2 h-[10px] w-1/2 -translate-y-1/2 ${up ? "left-1/2" : "right-1/2"}`}>
                    <motion.div
                      className={`absolute top-0 h-full rounded-full ${
                        up
                          ? "left-0 bg-gradient-to-r from-roxo-400 to-ciano-200 shadow-[0_0_22px_rgb(143_227_242/0.55)]"
                          : "right-0 bg-gradient-to-l from-laranja to-[#ffb27a] shadow-[0_0_22px_rgb(255_178_122/0.5)]"
                      }`}
                      initial={{ width: "0%" }}
                      animate={play ? { width: `${g.pct}%` } : undefined}
                      transition={{ duration: 1.6, ease: suave, delay: t + 0.15 }}
                    >
                      {/* Ponto de luz na ponta da medida. */}
                      <span
                        className={`absolute top-1/2 size-[18px] -translate-y-1/2 rounded-full border-[3px] border-ink ${
                          up ? "-right-2 bg-ciano-200" : "-left-2 bg-[#ffb27a]"
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>

                <Vezes
                  valor={g.valor}
                  play={play}
                  delay={t + 0.15}
                  className={`display text-right text-[1.5rem] leading-none tabular-nums ${cor}`}
                />
              </div>

              <motion.p
                className="mt-2 pl-[68px] text-[0.8125rem] text-white/60 transition-colors duration-300 group-hover:text-white"
                initial={{ opacity: 0 }}
                animate={play ? { opacity: 1 } : undefined}
                transition={{ duration: 0.8, delay: t + 1.1 }}
              >
                {g.nota}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const cardIn = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: ease.out } },
};

export function Oncoscan() {
  return (
    <section id="oncoscan" className="panel grad-soft py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-[60%] left-1/2 aspect-square w-[120%] -translate-x-1/2 rounded-full border border-white/70" />
        <div className="absolute -bottom-[40%] left-1/2 aspect-square w-[85%] -translate-x-1/2 rounded-full border border-white/70" />
      </div>

      <div className="container-page relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <FadeUp>
              <span className="rounded-full bg-roxo px-3 py-1.5 text-[0.8125rem] font-semibold text-white">
                Medicina de Precisão
              </span>
            </FadeUp>
            <Words
              as="h3"
              className="display mt-5 text-display text-ink"
              parts={["OncoScan e OncoScan Compact"]}
            />
            <FadeUp delay={0.1}>
              <p className="mt-4 text-mute">
                Pacientes com o mesmo diagnóstico histopatológico podem responder de formas diferentes
                ao mesmo tratamento. O OncoScan mede, por RT-PCR quantitativo, a expressão de genes do
                tumor ligados à resposta a quimioterápicos e a terapias-alvo, e entrega opções
                terapêuticas apoiadas no perfil molecular de cada paciente.
              </p>
            </FadeUp>
          </div>
          <motion.dl
            className="flex flex-col rounded-card border border-white bg-white/70 px-6 py-2 text-[0.9375rem] backdrop-blur"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ staggerChildren: 0.1 }}
          >
            {oncoscanGrupos.map((g) => (
              <motion.div
                key={g.nome}
                className="grid gap-1 border-b border-line py-4 last:border-0 sm:grid-cols-[150px_1fr] sm:gap-4"
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: ease.out } },
                }}
              >
                <dt className="font-semibold text-ink">{g.nome}</dt>
                <dd className="text-mute">{g.genes}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.article
            variants={cardIn}
            data-dark
            className="relative flex flex-col gap-5 overflow-hidden rounded-panel bg-roxo p-7 text-white shadow-[0_30px_70px_rgb(63_47_128/0.35)] md:p-9"
          >
            <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-roxo-400/50 blur-3xl" />
            <h4 className="display relative text-[1.875rem]">OncoScan</h4>
            <p className="relative flex flex-wrap items-baseline gap-x-3 text-[0.9375rem] text-white/80">
              <span className="display text-[4rem] leading-none text-white">
                <Counter value={48} />
              </span>
              <strong className="text-[1.375rem] font-semibold text-white">genes</strong>
              <span className="basis-full pt-2">painel completo, para qualquer tumor em cães</span>
            </p>
            <ul className="relative mt-auto flex flex-col text-[0.9375rem]">
              {oncoscanLinhas.map((l) => (
                <li key={l.item} className="flex items-center justify-between gap-3 border-t border-white/15 py-3">
                  <span>{l.item}</span>
                  <Valor v={l.full} dark />
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            variants={cardIn}
            className="flex flex-col gap-5 rounded-panel border border-roxo/25 bg-white p-7 text-ink md:p-9"
          >
            <h4 className="display text-[1.875rem]">OncoScan Compact</h4>
            <p className="flex flex-wrap items-baseline gap-x-3 text-[0.9375rem] text-mute">
              <span className="display text-[4rem] leading-none text-roxo">
                <Counter value={24} />
              </span>
              <strong className="text-[1.375rem] font-semibold text-ink">genes</strong>
              <span className="basis-full pt-2">versão direcionada, indicada para:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {compactIndicacoes.map((c) => (
                <span key={c} className="rounded-full bg-lilas px-3 py-1.5 text-[0.875rem] font-semibold text-roxo">
                  {c}
                </span>
              ))}
            </div>
            <ul className="mt-auto flex flex-col text-[0.9375rem]">
              {oncoscanLinhas.map((l) => (
                <li key={l.item} className="flex items-center justify-between gap-3 border-t border-line py-3">
                  <span>{l.item}</span>
                  <Valor v={l.compact} dark={false} />
                </li>
              ))}
            </ul>
          </motion.article>
        </motion.div>

        <FadeUp className="mt-5">
          <InfoTabs />
        </FadeUp>
      </div>
    </section>
  );
}

export function IhcRna() {
  return (
    <section id="ihc-rna" className="py-24 md:py-36">
      <div className="container-page">
        <div className="max-w-[820px]">
          <Words
            as="h3"
            className="display text-display text-ink"
            parts={["Imuno-histoquímica × análise de RNA"]}
          />
          <FadeUp delay={0.1}>
            <p className="mt-4 text-mute">
              A imuno-histoquímica depende do olhar do patologista. A análise de RNA do OncoScan é
              feita por equipamento e devolve um número: quantas vezes cada gene está aumentado ou
              diminuído no tumor em relação ao controle.
            </p>
          </FadeUp>
        </div>

        <FadeUp className="mt-10">
          <Comparador />
        </FadeUp>

        <FadeUp className="mt-5">
          <div className="grid items-center gap-8 rounded-panel bg-paper p-6 md:p-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
            <div>
              <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-roxo uppercase">
                Exemplo de laudo · Carcinoma hepático
              </p>
              <h4 className="display mt-3 text-title text-ink">O resultado vem em número, não em escore</h4>
              <p className="mt-3 text-[0.9375rem] text-mute">
                Cada gene aparece com o quanto está aumentado ou diminuído em relação ao controle, e
                com o que isso significa para a terapia.
              </p>
            </div>

            <Grafico />
          </div>
        </FadeUp>

        <p className="mt-5 text-[0.875rem] text-mute">
          As técnicas são complementares: a imuno-histoquímica continua valiosa para classificação e
          prognóstico, e o OncoScan acrescenta uma medida objetiva para a escolha terapêutica.
        </p>
      </div>
    </section>
  );
}
