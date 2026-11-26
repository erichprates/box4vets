import { asset } from "@/lib/base";
import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Poppins } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.titulo, template: "%s | Box4Vets" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    url: "/",
    title: site.titulo,
    description: site.descricao,
  },
  twitter: { card: "summary_large_image", title: site.titulo, description: site.descricao },
  // Link temporario para o cliente: fora dos buscadores.
  robots: process.env.NEXT_PUBLIC_NOINDEX ? { index: false, follow: false } : { index: true, follow: true },
  description: site.descricao,
  icons: { icon: asset("/icon.svg") },
};

export const viewport: Viewport = {
  themeColor: "#3f2f80",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${instrument.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
