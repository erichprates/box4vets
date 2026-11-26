/** Todo o conteudo do site em um lugar so. Textos em PT-BR. */

/** Dados do site para SEO. `url` e o endereco publico final (sem barra no fim). */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://box4vets.com.br").replace(/\/$/, ""),
  nome: "Box4Vets",
  titulo: "Box4Vets | Testes genéticos e medicina de precisão para veterinários",
  descricao:
    "Medicina Preditiva e Medicina de Precisão no seu consultório, em qualquer cidade do Brasil. Testes genéticos para cães e gatos por swab bucal, painéis diagnósticos e OncoScan, com requisição online e laudo com suporte especializado.",
} as const;

export const links = {
  exame: "https://vet.box4pets.com.br/#exame",
  whatsapp: "https://wa.me/5512992111805",
  tabela:
    "https://wa.me/5512992111805?text=Ol%C3%A1!%20Sou%20m%C3%A9dico(a)-veterin%C3%A1rio(a)%20e%20gostaria%20de%20receber%20a%20tabela%20de%20pre%C3%A7os%20dos%20exames%20Box4Vets.",
  site: "https://box4vets.com.br",
} as const;

export const nav = [
  { href: "#abordagem", label: "Como funciona" },
  { href: "#testes", label: "Testes em detalhe" },
  { href: "#portfolio", label: "Exames" },
  { href: "#implementar", label: "Como implementar" },
  { href: "/blog", label: "Blog" },
  { href: "#faq", label: "Dúvidas" },
] as const;

export type IconName =
  | "dna"
  | "eye"
  | "searchCheck"
  | "target"
  | "brain"
  | "drop"
  | "paw"
  | "stethoscope"
  | "clinic"
  | "heart";

/** `foto`: caminho em /public/media. Sem foto, o card usa o degrade com o icone. */
export const inovacao: { de: string; para: string; icon: IconName; text: string; foto?: string }[] = [
  {
    de: "Do reativo",
    para: "Ao preditivo",
    icon: "eye",
    foto: "/media/inovacao-preditivo.jpg",
    text: "Saber o risco de doença ajudando a montar um plano de acompanhamento sob medida.",
  },
  {
    de: "Da suspeita",
    para: "À confirmação",
    icon: "searchCheck",
    foto: "/media/inovacao-confirmacao.jpg",
    text: "Fechar diagnósticos de doenças hereditárias que exames convencionais não explicam.",
  },
  {
    de: "Do protocolo padrão",
    para: "Ao individualizado",
    icon: "target",
    foto: "/media/inovacao-individualizado.jpg",
    text: "Usar o perfil molecular do tumor para escolher quimioterápicos e terapias-alvo com mais chance de resposta.",
  },
];

/** Trechos em negrito ficam entre ** **. */
export const abordagem: {
  n: string;
  momento: string;
  titulo: string;
  pergunta: string;
  icon: IconName;
  textos: string[];
  foto?: string;
}[] = [
  {
    n: "01",
    momento: "Antes dos sintomas",
    titulo: "Medicina Preditiva",
    pergunta: "Qual o risco?",
    icon: "eye",
    foto: "/media/abordagem-preditiva.jpg",
    textos: [
      "Com um swab bucal, o painel identifica variantes associadas a doenças hereditárias e ao risco de câncer. Indicado para filhotes, check-ups, raças predispostas e planejamento reprodutivo.",
      "**Sentinela** (cães e gatos): mielopatia degenerativa, MDR1, von Willebrand, cardiomiopatias, cistinúria, atrofia de retina e outras.",
      "**OncoRisk** (cães): 17 variantes germinativas em 15 genes associados ao câncer.",
    ],
  },
  {
    n: "02",
    momento: "Sinal clínico sem causa",
    titulo: "Painéis Diagnósticos",
    pergunta: "O que o paciente tem?",
    icon: "searchCheck",
    foto: "/media/abordagem-diagnostico.jpg",
    textos: [
      "Painéis por especialidade confirmam ou descartam doenças hereditárias: **Neurológico, Oftalmológico, Hematológico e Dermatológico**.",
      "Na suspeita de linfoma, o **PARR** diferencia proliferação clonal de policlonal, o **Citomolecular** une citologia e PARR em um só laudo, e a **Imuno-histoquímica Diagnóstica** apoia a classificação.",
    ],
  },
  {
    n: "03",
    momento: "Tumor confirmado",
    titulo: "Painéis Prognósticos",
    pergunta: "Quão agressivo é?",
    icon: "stethoscope",
    foto: "/media/abordagem-prognostico.jpg",
    textos: [
      "Imuno-histoquímica para estimar agressividade, risco de metástase e estratégia terapêutica.",
      "Mastocitoma (c-KIT, Ki-67) · Mama de cadela (RE, RP, COX-2, Ki-67) · Mama de gata (+HER2) · Imunofenotipagem de linfomas.",
    ],
  },
  {
    n: "04",
    momento: "Escolha da terapia",
    titulo: "Medicina de Precisão",
    pergunta: "Qual droga funciona?",
    icon: "target",
    foto: "/media/abordagem-precisao.jpg",
    textos: [
      "**OncoScan e OncoScan Compact:** expressão de 48 ou 24 genes ligados à resposta a quimioterápicos e terapias-alvo como toceranib, imatinib, sorafenib e lapatinib.",
      "**FidoCure:** exoma de 67 oncogenes e supressores de tumor. Em 70% dos casos, indica uma terapia-alvo utilizável.",
    ],
  },
];

export type Painel = {
  id: string;
  grupo: "sentinela" | "sistema";
  nome: string;
  icon: IconName;
  condicoes: string[];
};

export const paineis: Painel[] = [
  {
    id: "sentinela-caes",
    grupo: "sentinela",
    nome: "Sentinela Cães",
    icon: "paw",
    condicoes: [
      "Atrofia progressiva de retina",
      "Cardiomiopatia dilatada (PDK4/TTN)",
      "Cistinúria",
      "Cistoadenocarcinoma renal e dermatofibrose nodular",
      "Doença do rim policístico",
      "Doença de von Willebrand I, II e III",
      "Doença de disco intervertebral",
      "Hipotireoidismo congênito",
      "Mielopatia degenerativa",
      "MDR1: sensibilidade a fármacos",
      "Mucocele",
      "Osteopatia craniomandibular",
      "Policitemia, urolitíase/hiperuricosúria",
    ],
  },
  {
    id: "sentinela-gatos",
    grupo: "sentinela",
    nome: "Sentinela Gatos",
    icon: "heart",
    condicoes: [
      "Alfa-manosidose felina",
      "Atrofia progressiva da retina",
      "Cardiomiopatia hipertrófica",
      "Deficiência da adesão leucocitária",
      "Deficiência da lipoproteína lipase",
      "Deficiência de di-hidropirimidinase",
      "Deficiência de piruvato quinase",
      "Deficiência do fator XII",
      "Doença de Niemann-Pick",
      "Doença renal policística",
      "Gangliosidose",
      "Hemofilia B",
      "Hiperoxalúria primária tipo 2",
      "Hiperplasia congênita de adrenal",
      "Hipotireoidismo congênito",
      "Mucopolissacaridose",
      "Polimiopatia periódica hipocalêmica",
      "Porfiria aguda intermitente",
      "Raquitismo por deficiência de vitamina D tipo I",
      "Síndrome linfoproliferativa autoimune",
      "Síndrome miastênica congênita",
    ],
  },
  {
    id: "neurologico",
    grupo: "sistema",
    nome: "Neurológico",
    icon: "brain",
    condicoes: [
      "Ataxia cerebelar",
      "Ataxia cerebelar de início precoce e progressiva",
      "Ataxia espinocerebelar",
      "Degeneração cerebelar cortical",
      "Degeneração cortical cerebelar neonatal",
      "Distrofia neuroaxonal",
      "Mielopatia degenerativa",
      "Colapso induzido pelo exercício",
      "Encefalopatia neonatal com convulsões",
      "Epilepsia benigna familiar juvenil",
      "Gangliosidose GM1 e GM2",
      "Hipomielinização do sistema nervoso central",
      "Hipoplasia cerebelar",
      "L-2-hidroxiglutaricacidemia",
      "Leucoencefalomielopatia (LEMP)",
      "Lipofuscinose ceroide neuronal",
      "Narcolepsia",
      "Neuropatia sensorial",
      "Polineuropatia",
      "Polineuropatia juvenil e paralisia da laringe",
      "Síndrome da mutilação acral",
      "Síndrome da queda episódica (EFS)",
    ],
  },
  {
    id: "oftalmologico",
    grupo: "sistema",
    nome: "Oftalmológico",
    icon: "eye",
    condicoes: [
      "Acromatopsia",
      "Amaurose congênita de Leber",
      "Atrofia progressiva da retina 1, 2 e 3",
      "Anomalia do olho de Collie",
      "Discinesia ciliar primária",
      "Displasia oculoesquelética 2",
      "Distrofia macular da córnea",
      "Goniodisgenesia e glaucoma",
      "Glaucoma de ângulo aberto primário",
      "Luxação primária de lente (PLL)",
      "PRA tipo 5",
      "PRA (PRCD)",
      "PRA (Basenji, Papillon)",
      "PRA (Pastor de Shetland)",
      "PRA2",
      "Retinopatia multifocal 1, 2 e 3",
    ],
  },
  {
    id: "hematologico",
    grupo: "sistema",
    nome: "Hematológico",
    icon: "drop",
    condicoes: [
      "Anomalia de May-Hegglin",
      "Deficiência de fator IX (hemofilia B)",
      "Deficiência de fator VII e VIII, variantes 1 e 2",
      "Deficiência de pré-calicreína",
      "Desordem de coagulação por deficiência de P2RY12",
      "Doença de von Willebrand I, II e III",
      "Eliptocitose",
      "Mucocele da vesícula biliar (variante de risco)",
      "Policitemia",
      "Síndrome de Bernard-Soulier (BSS)",
      "Síndrome de Scott",
      "Síndrome do neutrófilo aprisionado",
      "Trombastenia",
      "Trombocitopenia",
      "Trombopatia",
    ],
  },
  {
    id: "dermatologico",
    grupo: "sistema",
    nome: "Dermatológico",
    icon: "paw",
    condicoes: [
      "Dermatomiosite, variantes de risco 1 e 2",
      "Displasia ectodérmica anidrótica",
      "Epidermólise bolhosa distrófica (tipo Golden Retriever)",
      "Hiperqueratose epidermolítica",
      "Hiperqueratose palmoplantar (dos coxins)",
      "Ictiose",
      "Paraqueratose nasal (HNPK)",
      "Síndrome de Ehlers-Danlos",
    ],
  },
];

export const laudos = [
  {
    src: "/media/laudo-sentinela.jpg",
    categoria: "Medicina Preditiva",
    titulo: "Painel Sentinela · Cães",
    texto: "Resultado por doença, com genes e raças de referência.",
    alt: "Primeira página de um laudo-modelo do Painel Sentinela para cães, com a lista de doenças genéticas avaliadas, o resultado de cada uma e os genes de referência",
  },
  {
    src: "/media/laudo-neurologico.jpg",
    categoria: "Diagnóstico",
    titulo: "Painel Neurológico",
    texto: "Cada condição neurológica com o gene avaliado e as raças associadas.",
    alt: "Primeira página de um laudo-modelo do Painel Neurológico, com doenças avaliadas, resultado e genes de referência por raça",
  },
  {
    src: "/media/laudo-oncorisk.jpg",
    categoria: "Medicina Preditiva",
    titulo: "OncoRisk",
    texto: "Variantes germinativas encontradas e recomendação de vigilância clínica.",
    alt: "Primeira página de um laudo-modelo do OncoRisk, com o resultado de variantes germinativas, a recomendação clínica e considerações importantes",
  },
] as const;

export const oncoscanGrupos = [
  { nome: "Resposta à quimio", genes: "BRCA1/2, MGMT, RRM1/2 e outros" },
  { nome: "Terapias-alvo", genes: "EGFR, HER2, PIK3CA, KIT, PDGFR e outros" },
  { nome: "Prognóstico e resistência", genes: "BCL2/6, CDK4, MYC, TP53 e PGP (ABCB1)" },
] as const;

/** valor: texto do numero de genes, true = Incluido, false = Nao incluido. */
export const oncoscanLinhas: { item: string; full: string | boolean; compact: string | boolean }[] = [
  { item: "Resposta a terapia-alvo", full: "26 genes", compact: "17 genes" },
  { item: "Resistência tumoral", full: "2 genes", compact: "1 gene" },
  { item: "Resposta à quimioterapia", full: true, compact: true },
  { item: "Via de sinalização PI3K", full: true, compact: true },
  { item: "Via de sinalização MAPK", full: true, compact: false },
  { item: "Genes de prognóstico", full: true, compact: false },
];

export const compactIndicacoes = [
  "Carcinoma urotelial",
  "Carcinoma mamário",
  "Carcinoma de saco anal",
  "Carcinoma hepatocelular",
] as const;

export const oncoscanInfo = [
  {
    titulo: "Amostra",
    texto:
      "Bloco de parafina ou lâminas não coradas. Também aceita punções ou pequenos fragmentos de tumor em RNAlater.",
  },
  {
    titulo: "Envio",
    texto:
      "Retiramos os blocos diretamente no laboratório de patologia. Amostras em RNAlater viajam sem refrigeração.",
  },
  {
    titulo: "Liberação",
    texto: "30 a 60 dias, com relatório técnico e opções terapêuticas apoiadas no perfil do paciente.",
  },
] as const;

export const ihcRna: { item: string; ihc: string; rna: string }[] = [
  {
    item: "O que avalia",
    ihc: "A proteína no tecido, marcada por anticorpo",
    rna: "A expressão do gene (mRNA), por RT-PCR quantitativo",
  },
  {
    item: "Quem faz a leitura",
    ihc: "O patologista, ao microscópio: análise subjetiva e semiquantitativa",
    rna: "O equipamento, com medida objetiva",
  },
  {
    item: "Variabilidade",
    ihc: "O resultado pode variar entre intérpretes",
    rna: "Menor risco de variabilidade por intérprete",
  },
  {
    item: "Como o resultado sai",
    ihc: "Escores e categorias de marcação",
    rna: "**Um número:** quantas vezes o RNA está aumentado ou diminuído em relação ao controle",
  },
  {
    item: "Anticorpos",
    ihc: "Depende de anticorpos validados para a espécie",
    rna: "**Não usa anticorpos:** sem problema de validação de anticorpo",
  },
  {
    item: "Abrangência",
    ihc: "Poucos marcadores por painel",
    rna: "24 ou 48 genes em uma única análise",
  },
];

/** pct = largura da barra, como no laudo-modelo. */
export const expressao = [
  { gene: "FLT3", valor: "4,9×", pct: 64, sentido: "up", nota: "alvo de toceranib e sorafenib" },
  { gene: "RRM1", valor: "4,3×", pct: 57, sentido: "up", nota: "maior resistência à gencitabina" },
  { gene: "AKT3", valor: "2,2×", pct: 29, sentido: "up", nota: "alvo de rapamicina" },
  { gene: "TP53", valor: "5,7×", pct: 75, sentido: "down", nota: "associado a pior prognóstico" },
] as const;

export type Categoria = "Preditiva" | "Diagnóstico" | "Prognóstico" | "Precisão";

const SWAB = "Swab bucal";
const LAMINAS = "3 lâminas de aspirado de linfonodo";
const BLOCO = "Bloco de parafina ou 6 lâminas não coradas";

export const portfolio: {
  categoria: Categoria;
  exame: string;
  nota?: string;
  novo?: boolean;
  especie: string;
  amostra: string;
  prazo: string;
}[] = [
  { categoria: "Preditiva", exame: "Sentinela", especie: "Cães e gatos", amostra: SWAB, prazo: "6 a 8 semanas" },
  { categoria: "Preditiva", exame: "OncoRisk", especie: "Cães", amostra: SWAB, prazo: "6 a 8 semanas" },
  { categoria: "Preditiva", exame: "Sentinela + OncoRisk", especie: "Cães", amostra: SWAB, prazo: "6 a 8 semanas" },
  { categoria: "Diagnóstico", exame: "Painel Neurológico", especie: "Cães", amostra: SWAB, prazo: "6 a 8 semanas" },
  { categoria: "Diagnóstico", exame: "Painel Oftalmológico", especie: "Cães", amostra: SWAB, prazo: "6 a 8 semanas" },
  { categoria: "Diagnóstico", exame: "Painel Hematológico", especie: "Cães", amostra: SWAB, prazo: "6 a 8 semanas" },
  { categoria: "Diagnóstico", exame: "Painel Dermatológico", especie: "Cães", amostra: SWAB, prazo: "6 a 8 semanas" },
  { categoria: "Diagnóstico", exame: "PARR", especie: "Cães e gatos", amostra: LAMINAS, prazo: "15 dias" },
  { categoria: "Diagnóstico", exame: "Citomolecular (citologia + PARR)", especie: "Cães e gatos", amostra: LAMINAS, prazo: "15 dias" },
  { categoria: "Diagnóstico", exame: "Imuno-histoquímica Diagnóstica", novo: true, especie: "Cães e gatos", amostra: LAMINAS, prazo: "15 dias" },
  { categoria: "Prognóstico", exame: "IHC Mastocitoma (c-KIT, Ki-67)", especie: "Cães e gatos", amostra: BLOCO, prazo: "15 dias" },
  { categoria: "Prognóstico", exame: "IHC Mama Cadela (RE, RP, COX-2, Ki-67)", especie: "Cães", amostra: BLOCO, prazo: "15 dias" },
  { categoria: "Prognóstico", exame: "IHC Mama Gata (RE, RP, COX-2, HER2, Ki-67)", especie: "Gatos", amostra: BLOCO, prazo: "15 dias" },
  { categoria: "Prognóstico", exame: "Imunofenotipagem de linfomas", especie: "Cães e gatos", amostra: BLOCO, prazo: "15 dias" },
  {
    categoria: "Precisão",
    exame: "OncoScan Compact (24 genes)",
    nota: "Opção para carcinoma urotelial, mamário, saco-anal e hepatocelular",
    especie: "Cães",
    amostra: BLOCO,
    prazo: "30 a 60 dias",
  },
  { categoria: "Precisão", exame: "OncoScan (48 genes)", especie: "Cães", amostra: BLOCO, prazo: "30 a 60 dias" },
  { categoria: "Precisão", exame: "FidoCure (67 genes, exoma)", especie: "Cães", amostra: BLOCO, prazo: "30 a 60 dias" },
];

export const vantagens: { titulo: string; icon: IconName; itens: string[] }[] = [
  {
    titulo: "Para o paciente",
    icon: "paw",
    itens: [
      "Doenças detectadas antes dos sintomas, quando ainda dá para prevenir ou retardar.",
      "Fármacos escolhidos com segurança: um resultado MDR1 positivo muda a escolha de ivermectina, loperamida e alguns quimioterápicos.",
      "No paciente oncológico, terapias com mais chance de resposta e menos tentativa e erro.",
    ],
  },
  {
    titulo: "Para o médico-veterinário",
    icon: "stethoscope",
    itens: [
      "Decisões apoiadas em dados moleculares, não só em estatística da doença.",
      "Diagnósticos difíceis fechados com um exame não invasivo.",
      "Atualização profissional: medicina de precisão aplicada no dia a dia, com base científica.",
    ],
  },
  {
    titulo: "Para a clínica",
    icon: "clinic",
    itens: [
      "Um serviço diferenciado que fideliza o tutor e posiciona a clínica como referência.",
      "Nova linha de receita sem equipamento, sem laboratório próprio e sem treinamento complexo.",
      "Agenda de acompanhamento gerada pelo próprio resultado: retornos, check-ups e rastreamento.",
      "Condições comerciais diferenciadas pela Parceria Vet Box4Vets.",
    ],
  },
  {
    titulo: "Para o tutor",
    icon: "heart",
    itens: [
      "Tranquilidade de saber o que esperar e o que fazer.",
      "Um plano de cuidados feito para o pet dele, não um protocolo genérico.",
    ],
  },
];

export const passos = [
  {
    titulo: "Faça o pedido do exame online",
    texto:
      "Crie sua conta no portal, escolha o exame e preencha os dados do paciente. A confirmação chega por e-mail.",
  },
  {
    titulo: "Colete a amostra no consultório",
    texto:
      "Swab bucal com o paciente de boca fechada: friccione bochecha e gengiva por 15 a 30 segundos. Para oncologia, use o bloco de parafina ou as lâminas que você já tem.",
  },
  {
    titulo: "Prepare e envie",
    texto:
      "Seque o swab ao ar por pelo menos 10 minutos, guarde no envelope, identifique pet e tutor e envie pelo envelope já endereçado.",
  },
  {
    titulo: "Receba o resultado",
    texto:
      "Quando o laudo estiver pronto, você recebe um aviso por e-mail e acessa o resultado no portal com sua senha.",
  },
  {
    titulo: "Conte com suporte especializado",
    texto:
      "Dúvidas sobre indicação, coleta ou interpretação do laudo são respondidas pela equipe técnica por WhatsApp.",
  },
] as const;

/** `tabela: true` marca a resposta que leva o link da tabela de precos. */
export const faq: { q: string; a: string; tabela?: boolean }[] = [
  {
    q: "Preciso de algum equipamento ou treinamento?",
    a: "Não. A coleta por swab é feita em menos de um minuto, e as amostras oncológicas são o bloco de parafina ou as lâminas que você já tem. Toda a análise acontece no laboratório da Box4Vets.",
  },
  {
    q: "Atendem clínicas fora de São Paulo?",
    a: "Sim. O processo é o mesmo em qualquer cidade do país: requisição online, envio da amostra e laudo no portal.",
  },
  {
    q: "O teste genético substitui outros exames?",
    a: "Não. O resultado é complementar e deve ser interpretado com o histórico, o exame clínico, os exames laboratoriais e de imagem.",
  },
  {
    q: "Um resultado sem variantes garante que o animal não vai adoecer?",
    a: "Não. Ele indica que as variantes avaliadas não foram encontradas. Mutações somáticas, fatores ambientais e outras variantes não incluídas no painel também influenciam o risco.",
  },
  {
    q: "Qual exame escolher para um paciente oncológico?",
    a: "Para estimar o comportamento do tumor, os painéis prognósticos. Para escolher a terapia, o OncoScan, o OncoScan Compact ou o FidoCure. A equipe técnica ajuda a definir o melhor para cada caso.",
  },
  { q: "Quanto custam os exames?", a: "", tabela: true },
  {
    q: "Quanto tempo leva?",
    a: "Testes de DNA por swab: 6 a 8 semanas. OncoScan e FidoCure: 30 a 60 dias. PARR, citomolecular e imuno-histoquímica: 15 dias.",
  },
  {
    q: "Como recebo o resultado?",
    a: "Por aviso no e-mail e acesso ao portal com senha. O laudo traz a técnica, o resultado e o gene de referência por raça.",
  },
];

export const contatos = [
  { label: "WhatsApp", valor: "(12) 99211-1805", href: "https://wa.me/5512992111805" },
  { label: "E-mail", valor: "contato@box4pets.com.br", href: "mailto:contato@box4pets.com.br" },
  { label: "Instagram", valor: "@box4petsdna", href: "https://instagram.com/box4petsdna" },
  {
    label: "Representante Comercial",
    valor:
      "Estima Diagnóstico e Especialidades · Av. Granadeiro Guimarães, 155, Centro, Taubaté/SP, 12020-130",
  },
] as const;

/** Faixa em tela cheia com parallax. Preencha `video` (mp4 em /public/media) para trocar a foto por video. */
export const faixa = {
  imagem: "/media/coleta.jpg",
  video: "",
  alt: "Veterinária coletando swab bucal de um cão",
} as const;
