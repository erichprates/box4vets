import type { NextConfig } from "next";

/**
 * NEXT_PUBLIC_BASE_PATH definido = versao estatica para subpasta (link temporario no
 * GitHub Pages): exporta HTML puro em /out e serve as imagens sem otimizacao no servidor.
 * Sem a variavel, o site roda normal (dev, Vercel ou servidor Node).
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const estatico = base !== "";

const nextConfig: NextConfig = {
  // Permite abrir o servidor de desenvolvimento por 127.0.0.1 e pela rede local.
  allowedDevOrigins: ["127.0.0.1", "192.168.1.215"],
  ...(estatico ? { output: "export" as const, basePath: base, trailingSlash: true } : {}),
  images: estatico
    ? { loader: "custom", loaderFile: "./src/lib/image-loader.ts" }
    : { formats: ["image/avif", "image/webp"], qualities: [75, 88] },
};

export default nextConfig;
