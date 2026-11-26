import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";

type Variant = "primary" | "light" | "outline" | "ghost";

const tone: Record<Variant, string> = {
  primary: "bg-roxo text-white hover:bg-roxo-700",
  light: "bg-white text-ink hover:bg-lilas",
  outline: "border border-white/50 text-white hover:bg-white/10",
  ghost: "border border-line bg-white text-ink hover:border-roxo/40",
};

/** Cor do quadradinho da seta, dentro do botao. */
const chip: Record<Variant, string> = {
  primary: "bg-white/15",
  light: "bg-roxo text-white",
  outline: "bg-white/15",
  ghost: "bg-lilas text-roxo",
};

/**
 * Botao em peca unica, com a seta dentro. No hover a seta sai pelo canto e outra
 * entra por baixo. (O nome vem da primeira versao, em que rotulo e seta eram separados.)
 */
export function SplitButton({
  href,
  children,
  variant = "primary",
  external,
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  const h = size === "sm" ? "h-11" : "h-13";
  const sq = size === "sm" ? "size-8" : "size-10";
  const isExternal = external ?? href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener" } : {})}
      className={`group inline-flex shrink-0 items-center gap-3 rounded-xl pr-1.5 pl-5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-300 ${h} ${tone[variant]} ${className}`}
    >
      {children}
      <span className={`relative grid ${sq} place-items-center overflow-hidden rounded-lg ${chip[variant]}`}>
        <ArrowUpRight
          size={17}
          className="transition-transform duration-500 ease-out-expo group-hover:translate-x-8 group-hover:-translate-y-8"
        />
        <ArrowUpRight
          size={17}
          className="absolute -translate-x-8 translate-y-8 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </a>
  );
}

/** Etiqueta em pilula que abre cada secao. */
export function Tag({
  children,
  tone: t = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.875rem] font-medium ${
        t === "light"
          ? "border-line bg-white text-ink shadow-[0_2px_10px_rgb(27_18_61/0.05)]"
          : "border-white/30 bg-white/5 text-white"
      } ${className}`}
    >
      <span className={`size-1.5 rounded-full ${t === "light" ? "bg-ciano" : "bg-ciano-200"}`} />
      {children}
    </p>
  );
}

/** Texto com **negrito** marcado no conteudo. */
export function Rich({ text, strong = "font-semibold text-ink" }: { text: string; strong?: string }) {
  return (
    <>
      {text.split("**").map((chunk, i) =>
        i % 2 ? (
          <strong key={i} className={strong}>
            {chunk}
          </strong>
        ) : (
          chunk
        ),
      )}
    </>
  );
}
