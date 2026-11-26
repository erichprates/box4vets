/**
 * Prefixo do site quando ele roda numa subpasta (ex: GitHub Pages em /box4vets).
 * Em producao no dominio proprio fica vazio. Vem de NEXT_PUBLIC_BASE_PATH.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Caminho de arquivo de /public ou de pagina interna, ja com o prefixo. */
export const asset = (path: string) => (path.startsWith("/") ? BASE + path : path);
