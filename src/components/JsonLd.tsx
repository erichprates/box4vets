/** Dados estruturados (schema.org) em JSON-LD, lidos pelos buscadores. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // O conteudo vem dos nossos dados; "<" e escapado para nao fechar a tag por engano.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
