"use client";

import { asset } from "@/lib/base";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { contatos, links, nav, type IconName } from "@/content/site";
import { ease } from "@/lib/motion";
import { SplitButton } from "../ui/Button";
import { ArrowUpRight, Close, Icon, Menu } from "../ui/icons";
import { Logo } from "../ui/Logo";

/** Atalhos dentro de "Testes em detalhe". */
const testes: { href: string; label: string; icon: IconName }[] = [
  { href: "#doencas", label: "Doenças analisadas nos painéis genéticos", icon: "dna" },
  { href: "#laudos", label: "Como é o laudo", icon: "searchCheck" },
  { href: "#oncoscan", label: "OncoScan × OncoScan Compact", icon: "target" },
  { href: "#ihc-rna", label: "Imuno-histoquímica × análise de RNA", icon: "eye" },
];

/**
 * Header flutuante em vidro: logo, menu com realce que segue o cursor, submenu
 * de testes, barra de leitura da pagina e os dois atalhos.
 * `base`: "" na home; "/" nas outras paginas, para as ancoras voltarem para a home.
 * `current`: item marcado fixo (ex: "blog" nas paginas do blog).
 */
export function Header({
  base = "",
  current,
  heroLogo = false,
}: {
  base?: string;
  current?: string;
  /** Home: o logo comeca grande no hero e so aparece no menu depois de rolar. */
  heroLogo?: boolean;
}) {
  const [active, setActive] = useState(current ?? "");
  const [hover, setHover] = useState<string | null>(null);
  const [drop, setDrop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [pastLogo, setPastLogo] = useState(false);
  // Logo sem fundo: fica branco quando esta sobre uma secao escura.
  const [dark, setDark] = useState(false);
  const [darkRight, setDarkRight] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  // No topo o menu fica solto, sem fundo nem borda; ao rolar ganha o vidro para continuar legivel.
  const glass =
    scrolled || open ? "bg-white/85 shadow-[0_14px_40px_rgb(27_18_61/0.12)] backdrop-blur-xl" : "bg-transparent";
  // Menu claro: no topo, sobre o video escuro do hero.
  const light = dark && !scrolled && !open;
  const to = (href: string) => asset(href.startsWith("#") ? base + href : href);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setPastLogo(y > 110);
    setHidden(y > 500 && y > prev);
    if (y > prev) setDrop(false);
  });

  useEffect(() => {
    if (current) return;
    const ids = nav.map((n) => n.href.replace(/^[#/]+/, ""));
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    els.sort((a, b) => a.offsetTop - b.offsetTop);
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let now = "";
      // A ultima secao que ja passou da linha e a atual (as de testes ficam sob "testes").
      for (const el of els) if (el.getBoundingClientRect().top <= line) now = el.id;
      const fim = document.getElementById("contato");
      if (fim && fim.getBoundingClientRect().top <= line) now = "";
      setActive(now);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [current]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-dark]"));
    // Um bloco escuro pode ocupar so metade da largura: testa o ponto do logo e o do botao.
    const at = (x: number) =>
      els.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 40 && r.bottom >= 40 && r.left <= x && r.right >= x;
      });
    const onScroll = () => {
      const w = window.innerWidth;
      const pad = Math.max(12, (w - 1160) / 2);
      setDark(at(pad + 70));
      setDarkRight(at(w - pad - 90));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-[clamp(1rem,4vw,2.5rem)] pt-3"
        initial={{ y: -100 }}
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.7, ease: ease.out }}
        onMouseLeave={() => {
          setHover(null);
          setDrop(false);
        }}
      >
        {/* Tres pecas soltas: logo, menu em pilula no centro e os atalhos a direita. */}
        <div
          className={`relative mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-3 transition-[background-color,padding] duration-500 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
            scrolled && !open ? "max-lg:rounded-2xl max-lg:bg-ink/75 max-lg:pr-1.5 max-lg:pl-3 max-lg:backdrop-blur-xl" : ""
          }`}
        >
          <a
            href={to("#topo")}
            aria-label="Box4Vets, voltar ao topo"
            tabIndex={heroLogo && !pastLogo && !open ? -1 : undefined}
            className={`flex h-14 shrink-0 items-center justify-self-start transition-[color,opacity,transform] duration-500 ease-out-expo ${
              dark || open ? "text-white" : "text-roxo"
            } ${heroLogo && !pastLogo && !open ? "pointer-events-none translate-y-3 scale-110 opacity-0" : "opacity-100"}`}
          >
            <Logo mono={dark || open} className="h-9 w-auto max-lg:hidden" />
            {/* Celular: ao rolar o header ganha uma barra escura, entao o logo fica sempre branco. */}
            <span className={`lg:hidden ${scrolled || dark || open ? "text-white" : "text-roxo"}`}>
              <Logo mono={scrolled || dark || open} className="h-8 w-auto" />
            </span>
          </a>

          <nav
            aria-label="Seções"
            className={`relative hidden h-14 items-center rounded-2xl px-1.5 text-[0.9rem] font-medium transition-[background-color,box-shadow] duration-500 lg:flex ${glass}`}
          >
            {nav.map((item) => {
              const id = item.href.replace(/^[#/]+/, "");
              const on = active === id;
              const sub = id === "testes";
              return (
                <a
                  key={item.href}
                  href={to(item.href)}
                  aria-haspopup={sub || undefined}
                  aria-expanded={sub ? drop : undefined}
                  onMouseEnter={() => {
                    setHover(id);
                    setDrop(sub);
                  }}
                  onFocus={() => {
                    setHover(id);
                    setDrop(sub);
                  }}
                  onClick={() => setDrop(false)}
                  className={`relative flex h-11 items-center gap-1.5 rounded-xl px-3 transition-colors duration-300 ${
                    light ? (on ? "text-white" : "text-white/85 hover:text-white") : on ? "text-roxo" : "text-ink/75 hover:text-ink"
                  }`}
                >
                  {hover === id && (
                    <motion.span
                      layoutId="nav-hover"
                      className={`pointer-events-none absolute inset-0 rounded-xl ${light ? "bg-white/15" : "bg-lilas"}`}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {sub && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      aria-hidden
                      className={`relative transition-transform duration-300 ${drop ? "rotate-180" : ""}`}
                    >
                      <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  {on && (
                    <motion.span
                      layoutId="nav-dot"
                      className="pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-ciano"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            {/* Barra de leitura da pagina. */}
            <div
              className={`pointer-events-none absolute inset-x-4 bottom-0 h-[2px] overflow-hidden rounded-full transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
            >
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-ciano to-roxo"
                style={{ scaleX: progress }}
              />
            </div>
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href={links.tabela}
              target="_blank"
              rel="noopener"
              className="hidden h-11 shrink-0 items-center rounded-xl bg-ciano-200 px-4 text-[0.9375rem] font-medium whitespace-nowrap text-ink transition-colors duration-300 hover:bg-white min-[1180px]:flex"
            >
              Tabela de preços
            </a>
            <SplitButton href={links.exame} size="sm" variant={darkRight ? "light" : "primary"} className="max-md:hidden">
              Solicitar exame
            </SplitButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-11 place-items-center rounded-xl bg-roxo text-white lg:hidden"
            >
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {drop && (
              <motion.div
                className="absolute top-full left-1/2 hidden w-[720px] -translate-x-1/2 pt-3 lg:block"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.3, ease: ease.out }}
              >
                <div className="grid grid-cols-[1fr_250px] gap-2 rounded-2xl border border-line bg-white p-2 shadow-[0_30px_70px_rgb(27_18_61/0.2)]">
                  <ul className="flex flex-col">
                    {testes.map((t, i) => (
                      <motion.li
                        key={t.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: ease.out }}
                      >
                        <a
                          href={to(t.href)}
                          onClick={() => setDrop(false)}
                          className="group flex items-center gap-3.5 rounded-xl p-2.5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-paper"
                        >
                          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lilas text-roxo transition-colors duration-300 group-hover:bg-roxo group-hover:text-white">
                            <Icon name={t.icon} size={20} />
                          </span>
                          <span className="flex-1">{t.label}</span>
                          <ArrowUpRight
                            size={16}
                            className="-translate-x-1 text-roxo opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  <a
                    href={to("#laudos")}
                    onClick={() => setDrop(false)}
                    className="group grad-soft relative flex flex-col overflow-hidden rounded-xl p-4"
                  >
                    <span className="text-[0.75rem] font-semibold tracking-[0.1em] text-roxo uppercase">
                      Laudos-modelo
                    </span>
                    <span className="display mt-1 text-[1.125rem] text-ink">Como é o laudo</span>
                    <Image
                      src="/media/laudo-sentinela.jpg"
                      alt=""
                      width={440}
                      height={622}
                      className="mt-4 -mb-24 w-full rounded-t-md shadow-[0_10px_30px_rgb(27_18_61/0.2)] transition-transform duration-700 ease-out-expo group-hover:-translate-y-3"
                    />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-roxo px-6 pt-28 pb-8 text-white lg:hidden"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: ease.inOut }}
          >
            <nav aria-label="Seções" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={to(item.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-white/15 py-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: ease.out }}
                >
                  <span className="text-[0.8125rem] text-ciano-200 tabular-nums">/0{i + 1}</span>
                  <span className="display flex-1 text-[1.625rem]">{item.label}</span>
                  <ArrowUpRight size={20} className="self-center text-white/60" />
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mt-auto flex flex-col gap-3 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <SplitButton href={links.exame} variant="light">
                Solicitar exame
              </SplitButton>
              <SplitButton href={links.tabela} variant="outline">
                Tabela de preços
              </SplitButton>
              <p className="pt-4 text-[0.875rem] text-white/70">
                {contatos[0].label}: {contatos[0].valor} · {contatos[1].valor}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
