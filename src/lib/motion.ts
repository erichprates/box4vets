/** Padroes de animacao do design system. Usar sempre estes valores. */
export const ease = {
  /** Saida longa e suave: reveals de texto e imagem. */
  out: [0.16, 1, 0.3, 1],
  /** Entrada e saida: menus, overlays, transicoes de pagina. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  reveal: 1.1,
} as const;

export const stagger = {
  lines: 0.09,
  items: 0.06,
} as const;

/** Margem do viewport para disparar reveals (um pouco antes de entrar na tela). */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;
