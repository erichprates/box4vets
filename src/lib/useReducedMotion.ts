"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * true quando a pessoa pediu menos movimento no sistema.
 *
 * Usar ESTE hook, e nao o `useReducedMotion` do Framer Motion. O do Framer ja
 * responde `true` na primeira renderizacao do navegador, enquanto o servidor
 * renderizou com `false`; se o componente muda de marcacao por causa disso, o
 * React acusa erro de hidratacao. Este aqui comeca em `false` nos dois lados e
 * so atualiza depois da hidratacao.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
