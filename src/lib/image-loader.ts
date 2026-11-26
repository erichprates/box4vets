import { BASE } from "./base";

/** Usado so na versao estatica (GitHub Pages): entrega a imagem como esta, com o prefixo da subpasta. */
export default function loader({ src }: { src: string }) {
  return src.startsWith("/") ? BASE + src : src;
}
