"use client";

import { asset } from "@/lib/base";
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { links } from "@/content/site";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { SplitButton } from "../ui/Button";
import { ArrowRight, Icon } from "../ui/icons";
import { Logo } from "../ui/Logo";

/** O video comeca aqui (em segundos): antes disso e so um close desfocado. */
const START = 2.2;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // No celular o video ja aparece na primeira dobra: chega menos deitado e quase no tamanho final.
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const tilt = useTransform(scrollYProgress, [0.02, mobile ? 0.25 : 0.45], [mobile ? 14 : 34, 0]);
  const scale = useTransform(scrollYProgress, [0.02, mobile ? 0.25 : 0.45], [mobile ? 0.94 : 0.8, 1]);
  const lift = useTransform(scrollYProgress, [0.02, mobile ? 0.25 : 0.45], [mobile ? 10 : 70, 0]);
  const zoom = useTransform(scrollYProgress, [0.02, 0.55], [1.3, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [30, -70]);
  const box = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const side = useTransform(box, [0, 1], [0, 12]);
  const top = useTransform(box, [0, 1], [0, 8]);
  const radius = useTransform(box, [0, 1], [0, 28]);
  const clipPath = useMotionTemplate`inset(${top}px ${side}px 0px ${side}px round ${radius}px)`;
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const logoY = useTransform(scrollY, [0, 150], [0, -50]);
  const logoScale = useTransform(scrollY, [0, 150], [1, 0.6]);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  // Tempo do video pedido pela rolagem, e a funcao que leva o video ate ele.
  const alvo = useRef(START);
  const aplicar = useRef<() => void>(() => undefined);
  // O video segue a rolagem com uma pequena inercia, em vez de pular a cada evento.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    /*
     * No celular (iPhone principalmente) o video nao carrega quadro nenhum ate tocar uma vez,
     * e o evento de "carregou" nem dispara antes disso. Entao: manda tocar ja, pausa na hora
     * e posiciona. Se o aparelho recusar (modo de economia de bateria), tenta de novo no
     * primeiro toque na tela.
     */
    let ok = false;
    const prime = () => {
      if (ok) return;
      void v
        .play()
        .then(() => {
          ok = true;
          v.pause();
          setReady(true);
          seek();
        })
        .catch(() => undefined);
    };
    // Procura um quadro por vez: pedir outro antes do anterior chegar trava o video no celular.
    const seek = () => {
      if (!ok || v.seeking || !v.duration) return;
      const t = Math.min(v.duration - 0.05, alvo.current);
      if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t;
    };
    aplicar.current = seek;
    v.addEventListener("seeked", seek);
    v.addEventListener("loadeddata", prime);
    window.addEventListener("touchstart", prime, { passive: true });
    v.load();
    prime();
    return () => {
      v.removeEventListener("seeked", seek);
      v.removeEventListener("loadeddata", prime);
      window.removeEventListener("touchstart", prime);
    };
  }, []);

  useMotionValueEvent(smooth, "change", (p) => {
    const v = video.current;
    if (!v || reduced) return;
    const d = v.duration || 12;
    alvo.current = START + Math.max(0, p) * (d - START);
    aplicar.current();
  });

  return (
    <section id="topo" ref={ref}>
      {/* Comeca em tela cheia; ao rolar, recua das bordas e ganha os cantos arredondados do painel. */}
      <motion.div
        data-dark
        className="relative overflow-clip bg-ink pt-[88px] pb-10 text-white md:pt-[120px] md:pb-14"
        style={{ clipPath: reduced ? "inset(8px 12px 0px 12px round 28px)" : clipPath }}
      >
        {/* Video de fundo: fica preso na tela e avanca (ou volta) conforme a rolagem. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="sticky top-0 h-svh overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${asset("/media/hero-dna.jpg")})` }}
          >
            <video
              ref={video}
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setReady(true)}
              className={`size-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
            >
              <source src={asset("/media/hero-dna-mobile.mp4")} type="video/mp4" media="(max-width: 767px)" />
              <source src={asset("/media/hero-dna.mp4")} type="video/mp4" />
            </video>
            {/* Tinge o video com o roxo da marca e garante leitura do texto. */}
            <div className="absolute inset-0 bg-roxo/65 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/45 to-roxo/70" />
            {/* Escurece o centro, atras do titulo, e deixa o video respirar nas laterais. */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_42%,rgb(15_9_40/0.72),transparent_72%)]" />
          </div>
        </div>

        <div className="container-page relative flex flex-col items-center text-center">

          {/* Tudo ate os botoes cabe na primeira dobra, centralizado na altura da tela. */}
          <div className="flex w-full flex-col items-center pb-6 md:min-h-[calc(84svh-120px)] md:justify-center md:pb-[4vh]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease.out, delay: 0.15 }}
          >
            {/* Logo grande no centro: ao rolar ele sobe e some, e reaparece no menu. */}
            <motion.div
              className="mb-5 flex origin-top justify-center text-white md:mb-[3.5vh]"
              style={reduced ? undefined : { opacity: logoOpacity, y: logoY, scale: logoScale }}
            >
              <Logo mono className="h-10 w-auto md:h-[62px]" />
            </motion.div>
            <p className="flex items-center gap-4 font-display text-[0.8125rem] font-light tracking-[0.32em] text-white/90 uppercase max-md:text-[0.625rem] max-md:tracking-[0.24em] md:text-[0.875rem]">
              <span aria-hidden className="h-px w-8 bg-white/40 max-sm:hidden" />
              Genética aplicada à rotina clínica
              <span aria-hidden className="h-px w-8 bg-white/40 max-sm:hidden" />
            </p>
          </motion.div>

          <Words
            as="h1"
            eager
            delay={0.25}
            className="display mt-4 max-w-[1020px] text-[clamp(1.9rem,min(5.1vw,7.4vh),4.5rem)] text-white md:mt-[2.6vh] [text-shadow:0_2px_30px_rgb(27_18_61/0.35)]"
            parts={[
              "Medicina Preditiva e",
              "\n",
              "Medicina de Precisão",
              "\n",
              "no seu consultório.",
              "\n\n",
              { text: "Em qualquer cidade do Brasil.", className: "mt-[0.5em] text-[0.58em] font-light tracking-[-0.02em] text-ciano-200" },
            ]}
          />

          <motion.div
            className="mt-6 flex w-full flex-wrap items-center justify-center gap-3 md:mt-[3.4vh]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: ease.out, delay: 1 }}
          >
            <SplitButton href={links.exame} variant="light" className="max-md:w-full max-md:justify-between">
              Solicitar exame
            </SplitButton>
            <SplitButton href={links.exame} variant="outline" className="max-md:hidden">
              Resultado de exames
            </SplitButton>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener"
              className="group inline-flex h-13 items-center gap-2 px-3 text-[0.9375rem] font-medium text-white max-md:hidden"
            >
              <span className="border-b border-white/40 pb-0.5 transition-colors group-hover:border-white">
                Falar com a equipe técnica
              </span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          </div>

          {/*
            Video da coleta, sem moldura e com dinamica propria: aparece depois do texto, abrindo de
            baixo para cima, e chega "deitada" em perspectiva; conforme a pagina desce ela
            levanta, cresce e a imagem por dentro afasta o zoom.
          */}
          <div className="relative w-full max-w-[1080px] [perspective:1400px]">
            <motion.div
              className="origin-bottom will-change-transform"
              style={reduced ? undefined : { rotateX: tilt, scale, y: lift }}
            >
              <motion.div
                className="relative aspect-[16/10] overflow-hidden rounded-[24px] shadow-[0_50px_110px_rgb(10_6_30/0.55)] md:aspect-[16/9]"
                initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                transition={{ duration: 1.5, ease: ease.inOut, delay: 1.5 }}
              >
                <motion.div
                  className="absolute -inset-y-[8%] inset-x-0"
                  style={reduced ? undefined : { y: imgY, scale: zoom }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={asset("/media/hero-coleta.jpg")}
                    aria-label="Coleta de swab bucal em cães e o kit de coleta aberto"
                    className="size-full object-cover"
                  >
                    <source src={asset("/media/hero-coleta-mobile.mp4")} type="video/mp4" media="(max-width: 767px)" />
                    <source src={asset("/media/hero-coleta.mp4")} type="video/mp4" />
                  </video>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto mt-3 flex w-full items-center gap-3.5 rounded-2xl border border-white bg-white/90 p-3 pr-5 text-left md:w-fit md:max-w-[300px] md:p-4 shadow-[0_18px_44px_rgb(27_18_61/0.22)] backdrop-blur md:absolute md:mt-0 md:-left-8 md:bottom-10"
              style={{ y: reduced ? 0 : badgeY }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.3 }}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-roxo text-white">
                <Icon name="dna" size={24} />
              </span>
              <span className="text-[0.875rem] leading-snug text-mute">
                <strong className="block text-[0.9375rem] font-semibold text-ink">
                  Sequenciamento NGS direcionado
                </strong>
                A partir de um swab bucal
              </span>
            </motion.div>
          </div>

          {/* O texto vem depois do video: frase de destaque + tres pontos. No celular, tambem os outros atalhos. */}
          <div className="mt-14 flex w-full max-w-[1080px] flex-col gap-8 px-3 pb-4 text-left md:mt-20 md:grid md:grid-cols-[1.25fr_1fr] md:items-center md:gap-16 md:px-0 md:pb-10">
            <FadeUp>
              <p className="display text-[1.3125rem] leading-[1.35] text-white md:text-[1.75rem] md:leading-[1.3]">
                Identifique o risco de desenvolvimento de doenças, confirme diagnósticos difíceis e faça
                escolhas precisas das terapias oncológicas com base no DNA do paciente.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <ul className="flex flex-col border-t border-white/15 text-[1rem] text-white/90">
                {["Coleta simples", "Requisição online", "Laudo com suporte especializado"].map((t, n) => (
                  <li key={t} className="flex items-center gap-3 border-b border-white/15 py-3.5">
                    <span className="text-[0.75rem] text-ciano-200 tabular-nums">/0{n + 1}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.15} className="md:hidden">
              <div className="flex flex-col gap-3">
                <SplitButton href={links.exame} variant="outline" className="w-full justify-between">
                  Resultado de exames
                </SplitButton>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="flex h-13 items-center justify-between rounded-xl bg-white/10 pr-4 pl-5 text-[0.9375rem] font-medium text-white"
                >
                  Falar com a equipe técnica
                  <ArrowRight size={18} />
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
