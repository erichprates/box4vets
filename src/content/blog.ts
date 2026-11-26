import type { IconName } from "./site";

/**
 * Materias do blog. CONTEUDO SIMULADO: textos de exemplo escritos a partir das
 * informacoes do proprio site, para revisar com a equipe tecnica antes de publicar.
 */
export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "destaque"; texto: string };

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string; // AAAA-MM-DD
  leitura: string;
  icon: IconName;
  capa?: string;
  /** Ponto da foto que nao pode ser cortado (object-position). Padrao: "center 30%". */
  foco?: string;
  corpo: Bloco[];
};

export const autor = "Equipe técnica Box4Vets";

export const posts: Post[] = [
  {
    slug: "mdr1-o-resultado-que-muda-a-prescricao",
    titulo: "MDR1: o resultado genético que muda a prescrição",
    resumo:
      "Por que saber a sensibilidade a fármacos antes de prescrever dá mais segurança na escolha de ivermectina, loperamida e alguns quimioterápicos.",
    categoria: "Medicina Preditiva",
    data: "2026-11-18",
    leitura: "4 min",
    icon: "dna",
    capa: "/media/blog-mdr1.jpg",
    corpo: [
      {
        tipo: "p",
        texto:
          "Entre as condições avaliadas no Painel Sentinela para cães, uma tem efeito direto na receita: a variante MDR1, ligada à sensibilidade a fármacos. É um bom exemplo de como um teste feito antes dos sintomas muda uma decisão do dia a dia.",
      },
      { tipo: "h2", texto: "O que muda na prática" },
      {
        tipo: "p",
        texto:
          "Um resultado MDR1 positivo muda a escolha de ivermectina, loperamida e alguns quimioterápicos. Com a informação em mãos, o fármaco é escolhido com segurança, em vez de a sensibilidade ser descoberta depois da administração.",
      },
      {
        tipo: "destaque",
        texto: "Saber o risco ajuda a montar um plano de acompanhamento sob medida.",
      },
      { tipo: "h2", texto: "Quando pedir" },
      {
        tipo: "lista",
        itens: [
          "Filhotes, na primeira consulta.",
          "Check-ups de rotina.",
          "Raças predispostas.",
          "Planejamento reprodutivo.",
        ],
      },
      { tipo: "h2", texto: "Como é feito" },
      {
        tipo: "p",
        texto:
          "A coleta é um swab bucal, sem sedação. O painel usa sequenciamento de nova geração (NGS) direcionado com PCR multiplex, e o laudo é liberado em 6 a 8 semanas, com o gene avaliado e as raças de referência para cada condição.",
      },
      {
        tipo: "p",
        texto:
          "Como todo teste genético, o resultado é complementar: deve ser interpretado com o histórico, o exame clínico e os exames laboratoriais e de imagem.",
      },
    ],
  },
  {
    slug: "imuno-histoquimica-ou-analise-de-rna",
    titulo: "Imuno-histoquímica ou análise de RNA: o que cada uma responde",
    resumo:
      "As duas técnicas são complementares. Entenda o que cada uma avalia, como o resultado sai e onde o OncoScan acrescenta uma medida objetiva.",
    categoria: "Medicina de Precisão",
    data: "2026-11-10",
    leitura: "5 min",
    icon: "target",
    capa: "/media/blog-ihc-rna.jpg",
    corpo: [
      {
        tipo: "p",
        texto:
          "Pacientes com o mesmo diagnóstico histopatológico podem responder de formas diferentes ao mesmo tratamento. Por isso vale entender o que a imuno-histoquímica e a análise de RNA entregam, e por que uma não substitui a outra.",
      },
      { tipo: "h2", texto: "O que cada técnica avalia" },
      {
        tipo: "p",
        texto:
          "A imuno-histoquímica avalia a proteína no tecido, marcada por anticorpo, e a leitura é feita pelo patologista ao microscópio: uma análise subjetiva e semiquantitativa, que sai em escores e categorias de marcação.",
      },
      {
        tipo: "p",
        texto:
          "A análise de RNA do OncoScan mede a expressão do gene (mRNA) por RT-PCR quantitativo. A leitura é do equipamento, com medida objetiva, e não usa anticorpos.",
      },
      {
        tipo: "destaque",
        texto:
          "O resultado vem em número: quantas vezes o RNA está aumentado ou diminuído em relação ao controle.",
      },
      { tipo: "h2", texto: "Abrangência" },
      {
        tipo: "p",
        texto:
          "Enquanto a imuno-histoquímica trabalha com poucos marcadores por painel, o OncoScan avalia 48 genes, e o OncoScan Compact, 24, em uma única análise. São genes ligados à resposta a quimioterápicos e a terapias-alvo como toceranib, imatinib, sorafenib e lapatinib.",
      },
      { tipo: "h2", texto: "Como usar as duas" },
      {
        tipo: "lista",
        itens: [
          "Para estimar o comportamento do tumor: painéis prognósticos por imuno-histoquímica.",
          "Para escolher a terapia: OncoScan, OncoScan Compact ou FidoCure.",
          "Em caso de dúvida, a equipe técnica ajuda a definir o melhor exame para cada caso.",
        ],
      },
      {
        tipo: "p",
        texto:
          "A imuno-histoquímica continua valiosa para classificação e prognóstico, e o OncoScan acrescenta uma medida objetiva para a escolha terapêutica.",
      },
    ],
  },
  {
    slug: "swab-bucal-passo-a-passo-da-coleta",
    titulo: "Swab bucal sem erro: o passo a passo da coleta",
    resumo:
      "Menos de um minuto, sem sedação e sem equipamento. Veja como coletar, secar e enviar a amostra para o laudo sair sem retrabalho.",
    categoria: "Na prática",
    data: "2026-11-03",
    leitura: "3 min",
    icon: "stethoscope",
    capa: "/media/blog-swab.jpg",
    foco: "center 8%",
    corpo: [
      {
        tipo: "p",
        texto:
          "Os testes de DNA da Box4Vets partem de um swab bucal. A coleta é feita em menos de um minuto no consultório, em qualquer cidade do país, e não exige laboratório, equipamento ou estrutura especial.",
      },
      { tipo: "h2", texto: "Antes de coletar" },
      {
        tipo: "p",
        texto:
          "Faça o pedido do exame online: crie sua conta no portal, escolha o exame e preencha os dados do paciente. A confirmação chega por e-mail.",
      },
      { tipo: "h2", texto: "A coleta" },
      {
        tipo: "lista",
        itens: [
          "Mantenha o paciente de boca fechada.",
          "Friccione bochecha e gengiva por 15 a 30 segundos.",
          "Seque o swab ao ar por pelo menos 10 minutos.",
          "Guarde no envelope e identifique pet e tutor.",
          "Envie pelo envelope já endereçado.",
        ],
      },
      {
        tipo: "destaque",
        texto: "Se a sua clínica tem acesso aos Correios, ela já pode fazer medicina de precisão.",
      },
      { tipo: "h2", texto: "Depois do envio" },
      {
        tipo: "p",
        texto:
          "Quando o laudo estiver pronto, você recebe um aviso por e-mail e acessa o resultado no portal com sua senha. Testes de DNA por swab são liberados em 6 a 8 semanas.",
      },
      {
        tipo: "p",
        texto:
          "Dúvidas sobre indicação, coleta ou interpretação do laudo são respondidas pela equipe técnica por WhatsApp.",
      },
    ],
  },
];

const fmt = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const dataPost = (iso: string) => fmt.format(new Date(iso + "T12:00:00Z"));
