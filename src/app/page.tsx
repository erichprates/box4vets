import { JsonLd } from "@/components/JsonLd";
import { faq, site } from "@/content/site";
import { Abordagem } from "@/components/sections/Abordagem";
import { Blog } from "@/components/sections/Blog";
import { Contato } from "@/components/sections/Contato";
import { FaixaVideo } from "@/components/sections/FaixaVideo";
import { Faq } from "@/components/sections/Faq";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Implementar } from "@/components/sections/Implementar";
import { Inovacao } from "@/components/sections/Inovacao";
import { Laudos } from "@/components/sections/Laudos";
import { IhcRna, Oncoscan } from "@/components/sections/Oncoscan";
import { Portfolio } from "@/components/sections/Portfolio";
import { Doencas, TestesIntro } from "@/components/sections/Testes";
import { Vantagens } from "@/components/sections/Vantagens";

const faqTexto = (f: (typeof faq)[number]) =>
  f.tabela
    ? "Médicos-veterinários parceiros têm condições diferenciadas. Solicite a tabela de preços e nossa equipe envia os valores atualizados."
    : f.a;

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${site.url}/#org`,
              name: site.nome,
              url: site.url,
              logo: `${site.url}/logo.svg`,
              email: "contato@box4pets.com.br",
              sameAs: ["https://instagram.com/box4petsdna"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+55-12-99211-1805",
                contactType: "customer service",
                areaServed: "BR",
                availableLanguage: "pt-BR",
              },
            },
            {
              "@type": "WebSite",
              "@id": `${site.url}/#site`,
              url: site.url,
              name: site.nome,
              inLanguage: "pt-BR",
              publisher: { "@id": `${site.url}/#org` },
            },
            {
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: faqTexto(f) },
              })),
            },
          ],
        }}
      />
      <Header heroLogo />
      <main>
        <Hero />
        <Inovacao />
        <Abordagem />
        <TestesIntro />
        <Doencas />
        <Laudos />
        <FaixaVideo />
        <Oncoscan />
        <IhcRna />
        <Portfolio />
        <Vantagens />
        <Implementar />
        <Blog />
        <Faq />
        <Contato />
      </main>
    </>
  );
}
