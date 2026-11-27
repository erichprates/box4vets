# Manual do projeto Box4Vets

Site da Box4Vets para médicos-veterinários: uma página longa (home), um blog e uma versão
estática de prévia para o cliente. Este documento registra o estado do projeto, as decisões
já tomadas, como publicar e o que ainda está pendente.

Atualizado em 27/11/2026.

---

## 1. Endereços

| O quê | Onde |
|---|---|
| Prévia para o cliente | https://erichprates.github.io/box4vets/ |
| Código-fonte | https://github.com/erichprates/box4vets (branch `main`) |
| Desenvolvimento local | `npm run dev -- -p 3210` e abrir http://localhost:3210 (o Box4Pets Criador usa a 3211) |
| Domínio final previsto | https://box4vets.com.br (definido em `src/content/site.ts`) |

A prévia sai **fora dos buscadores** (`noindex` e `robots.txt` fechado). A versão do domínio
final sai liberada.

O script `dev` já sobe com `NODE_OPTIONS=--max-http-header-size=65536`. Sem isso o
`localhost` pode responder erro 431, por causa dos cookies acumulados de outros projetos.

Site irmão: **Box4Pets Criador**, em `../box4pets_criador`, criado a partir desta base
(mesmo design system e animações). Tem manual próprio.

## 2. Origem do conteúdo e da aparência

- **Conteúdo:** veio de um protótipo em canvas (artifact "Box4Pets para Veterinários"). Os
  textos foram mantidos; mudou a forma de apresentar.
- **Aparência:** inspirada em https://curenast.framer.website/ (painéis arredondados, títulos
  em Poppins, etiquetas em pílula, FAQ numerado, rodapé em cartão).
- **Dinâmica:** mesma base do site do Aquamundo (Next.js, Tailwind, Framer Motion, rolagem
  suave com Lenis).

## 3. Tecnologia

- Next.js 16 (App Router), React 19, Tailwind 4, Framer Motion, Lenis.
- Fontes: Poppins (títulos, pesos 300, 500 e 600) e Instrument Sans (texto).
- Sem banco de dados e sem servidor próprio: todas as páginas são geradas como HTML estático.

Comandos:

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (domínio próprio, Vercel ou servidor Node) |
| `npm run build:pages` | Build estático em `out/` para a prévia no GitHub Pages |

## 4. Onde fica cada coisa

| Caminho | Conteúdo |
|---|---|
| `src/content/site.ts` | **Todos os textos e dados da home**: links, menu, cards, painéis de doenças, laudos, OncoScan, portfólio, vantagens, passos, FAQ, contatos, dados de SEO |
| `src/content/blog.ts` | As matérias do blog |
| `src/app/globals.css` | Cores, tamanhos de texto, margens e utilitários (design system) |
| `src/app/page.tsx` | Ordem das seções da home e dados estruturados |
| `src/components/sections/` | Uma seção por arquivo |
| `src/components/motion/` | Animações reutilizáveis (entrada de blocos, títulos palavra a palavra, contador, parallax) |
| `src/components/ui/` | Botão, etiqueta, logo e ícones |
| `public/media/` | Fotos e vídeos |

Para mudar um texto, quase sempre basta editar `src/content/site.ts`.

### Ordem das seções da home

1. `Hero`: vídeo de DNA ao fundo, logo, título, botões e o box com o vídeo da coleta
2. `Inovacao`: texto que acende com a rolagem e três cards com foto
3. `Abordagem` (`#abordagem`): quatro momentos do paciente, em rolagem horizontal travada
4. `TestesIntro` (`#testes`): abertura com ícones em órbita
5. `Doencas` (`#doencas`): explorador dos seis painéis genéticos
6. `Laudos` (`#laudos`): três laudos-modelo com visualizador
7. `FaixaVideo`: vídeo do laboratório em tela cheia, com o logo e a frase no centro
8. `Oncoscan` (`#oncoscan`): comparação OncoScan × Compact e abas de detalhes
9. `IhcRna` (`#ihc-rna`): comparador de critérios e gráfico de expressão gênica
10. `Portfolio` (`#portfolio`): tabela de exames com filtro
11. `Vantagens`: abas por público, com dois vídeos em formato de stories
12. `Implementar` (`#implementar`): faixa com a foto da coleta e os cinco passos
13. `Blog` (`#blog`): três matérias
14. `Faq` (`#faq`)
15. `Contato` (`#contato`): chamada final, formulário e rodapé

## 5. Design system

### Cores (`src/app/globals.css`)

| Nome | Hex | Uso |
|---|---|---|
| `roxo` | #3f2f80 | Cor da marca: painéis e botões |
| `roxo-700` | #322568 | Hover do roxo |
| `roxo-400` | #7c6bd0 | Degradês e brilhos |
| `ink` | #1b123d | Texto e seções escuras |
| `mute` | #5f6474 | Texto secundário |
| `paper` | #f5f4fa | Fundo alternativo |
| `lilas` | #ebe7f8 | Etiquetas e blocos suaves |
| `line` | #e4e0f0 | Divisórias |
| `ciano` | #00acc8 | Acento da marca |
| `ciano-700` | #00829a | Acento sobre fundo claro |
| `ciano-200` | #8fe3f2 | Acento sobre roxo ou escuro |
| `laranja` | #c2570c | Barra "diminuído" do gráfico |

O roxo e o ciano são os do logo (`public/logo.svg`).

### Padrões

- **Painel:** classe `panel`, um bloco de cantos arredondados (28px) que quase encosta nas
  bordas da tela.
- **Conteúdo:** classe `container-page`, largura máxima de 1240px e margem lateral de 28px no
  celular a 40px no desktop.
- **Título:** classe `display` (Poppins 500, letras apertadas), sempre em caixa mista.
- **Botão:** `SplitButton`, peça única com a seta num quadradinho interno. No hover a seta sai
  pelo canto e outra entra por baixo.
- **Etiqueta:** `Tag`, pílula com um ponto ciano.
- **Animações:** valores padronizados em `src/lib/motion.ts`. Quem pede "reduzir movimento"
  no sistema vê o site sem deslocamentos nem vídeo controlado pela rolagem.

## 6. Decisões tomadas

### Marca e endereços
- A marca nos textos é **Box4Vets**. O logo já diz "box4vets", então não há selo "VET".
- O rodapé aponta para `box4vets.com.br`.
- **Mantidos de propósito**, por serem endereços reais: `vet.box4pets.com.br` (portal de
  exames), `contato@box4pets.com.br` e `@box4petsdna`.

### Header
- Três peças soltas: logo, menu em pílula no centro e os botões à direita.
- Sem borda. No topo o menu não tem fundo; ao rolar ganha um vidro translúcido.
- O logo **não tem fundo**: fica branco sobre blocos escuros e roxo sobre os claros. Blocos
  escuros são marcados com o atributo `data-dark`; o header testa o que está atrás do logo e
  atrás do botão separadamente.
- "Tabela de preços" é azul claro; "Solicitar exame" é branco sobre escuro e roxo sobre claro.
- Na home o logo começa grande no centro do hero e só aparece no menu depois de rolar.
- No celular, ao rolar, o header ganha uma barra escura com o logo branco.

### Hero
- Vídeo de DNA ao fundo, **controlado pela rolagem** (avança ao descer, volta ao subir),
  começando em 2,2s porque o início é um close desfocado.
- Abre em tela cheia e, ao rolar, recua das bordas e ganha cantos arredondados.
- Todo o conteúdo até os botões cabe na primeira dobra no desktop.
- O box mostra o vídeo da coleta (recortado para tirar o logo "box4dog" do canto), sem
  moldura; chega inclinado em perspectiva e levanta com a rolagem.
- O parágrafo de apoio vem **depois do box**, no desktop e no celular, como frase de destaque
  e três pontos numerados. Sem ele na dobra, o box sobe e já aparece na primeira tela.

### Menos texto, mais descoberta
- Parágrafos de Inovação acendem palavra por palavra.
- Cards de "Como funciona" mostram o essencial e abrem o resto em "Ver exames".
- Doenças, OncoScan, comparador Imuno × RNA e Vantagens são abas: uma coisa por vez.
- Portfólio mostra 6 exames e o botão "Ver todos os 17".
- Passos de implementação: um aberto por vez, avançando sozinho até o clique.

### Abas: regras que evitam problemas já corrigidos
- **Tudo fica no HTML.** O conteúdo das abas não selecionadas está sempre na página, só
  oculto, para os buscadores lerem. Não voltar a renderizar só a aba ativa.
- **Troca só no clique.** Trocar no hover causava tremor (Vantagens).
- **O realce deslizante ignora o mouse** (`pointer-events-none`), senão ele rouba o cursor.
- **Vantagens tem altura fixa:** as quatro listas ocupam a mesma célula, para a página não
  pular ao trocar.
- **Sem animação de saída** nas trocas, para o painel nunca ficar preso apagado.

### Celular
- Nenhuma fileira de abas rola de lado: viram grades de 2 colunas, e cada opção tem forma de
  botão mesmo quando não está selecionada.
- A tabela de exames vira cartões, com rótulo em cada dado.
- Brilhos de fundo são degradês radiais, não filtros de desfoque (pesavam no celular).

### Faixa de vídeo do laboratório
- Logo acima da frase.
- O enquadramento puxa para a direita da imagem (78%), onde estão a pesquisadora e o
  microscópio; no centro eles ficavam cortados. A versão de celular é um recorte do lado
  direito do vídeo.

### Outras
- "Ver laudo completo" abre um visualizador na página, com setas entre os três laudos.
- O gráfico de expressão gênica é um painel escuro, com os genes entrando um por vez.
- O formulário de contato **não tem servidor**: abre o WhatsApp da equipe com a mensagem
  preenchida.

## 7. Mídia

| Arquivo | Origem | Onde aparece |
|---|---|---|
| `hero-dna.mp4` (+ `-mobile`, `.jpg`) | Storyblocks | Fundo do hero |
| `hero-coleta.mp4` (+ `-mobile`, `.jpg`) | Vídeo do cliente (`dog.mp4`), recortado | Box do hero |
| `lab.mp4` (+ `-mobile`, `.jpg`) | Storyblocks, primeiros 6s. A versão `-mobile` é o lado direito do quadro | Faixa antes do OncoScan |
| `story-gato.mp4`, `story-cao.mp4` (+ `.jpg`) | Banco de vídeo, 6s cada | Stories em Vantagens |
| `coleta.jpg`, `kit.jpg` | Fotos do cliente | Faixa de Implementar; `kit.jpg` está sem uso aqui (é usada no Box4Pets Criador) |
| `laudo-*.jpg` | Laudos-modelo do cliente | Seção de laudos e submenu |
| `inovacao-*.jpg`, `abordagem-*.jpg`, `blog-*.jpg` | Geradas por IA (Higgsfield) | Cards e capas do blog |

Como os vídeos foram preparados (ffmpeg):

- **Vídeo controlado pela rolagem** (`hero-dna`): H.264 com um quadro-chave a cada 3 quadros
  (`-g 3 -keyint_min 3 -sc_threshold 0`). Sem isso o avanço fica aos saltos.
- **Vídeos em loop:** H.264, sem áudio, `-movflags +faststart`, trecho curto.
- Cada vídeo tem uma versão menor para celular e uma imagem de capa.

Para trocar a foto de um card, basta apontar o campo `foto` (ou `capa`, no blog) para outro
arquivo em `public/media`. O campo `foco` do blog controla o enquadramento da capa.

## 8. SEO

Já feito:
- Título, descrição, endereço canônico e dados de compartilhamento em todas as páginas.
- Imagem de compartilhamento gerada (`src/app/opengraph-image.tsx`).
- `robots.txt` e `sitemap.xml`.
- Dados estruturados: organização, perguntas frequentes e artigo em cada matéria.
- Conteúdo das abas presente no HTML.

O título e a descrição estão em `site` dentro de `src/content/site.ts`.

## 9. Como publicar a prévia do cliente

A prévia **não se atualiza sozinha**. A cada rodada de mudanças:

```bash
npm run build:pages            # gera a pasta out/
cp -R out /tmp/ghp && cd /tmp/ghp
touch .nojekyll                # obrigatório: sem ele o GitHub ignora a pasta _next
git init -b gh-pages && git add -A && git commit -m "Prévia"
git push -f https://github.com/erichprates/box4vets.git gh-pages
```

O GitHub Pages leva cerca de um minuto para atualizar. O código-fonte vai para o `main` com
`git push` normal.

O que o `build:pages` muda em relação ao build comum: exporta HTML puro, prefixa todos os
caminhos com `/box4vets` (variável `NEXT_PUBLIC_BASE_PATH`) e bloqueia buscadores
(`NEXT_PUBLIC_NOINDEX`). Arquivos de `public/` referenciados à mão em `<video>`, `poster` ou
`background-image` precisam passar pela função `asset()` de `src/lib/base.ts`, senão quebram
na prévia.

## 10. Pendências

- [ ] **Blog:** as três matérias são texto simulado, escrito a partir do conteúdo do site.
      Precisam de revisão técnica antes da publicação.
- [ ] **"Resultado de exames"** aponta para o mesmo endereço de "Solicitar exame". Falta o
      link próprio, se existir.
- [ ] **Formulário:** definir se continua abrindo o WhatsApp ou se envia para e-mail ou CRM.
- [ ] **Instagram:** o endereço `instagram.com/box4petsdna` foi deduzido do @; conferir.
- [ ] **Vídeo do hero:** a última cena mostra a caixa do kit com "box4dog" impresso.
- [ ] **Faixa de Implementar:** ainda usa foto. Está pronta para vídeo (campo `faixa.video`).
- [ ] **Repositório público:** os vídeos de banco de imagem e os laudos-modelo ficam visíveis.
      Conferir a licença do Storyblocks.
- [ ] **Domínio final:** confirmar `box4vets.com.br` e onde o site vai ser hospedado.
- [ ] **Velocidade:** rodar o Lighthouse; a home tem cinco vídeos.
- [ ] **Páginas por exame** (Sentinela, OncoRisk, OncoScan): ajudariam muito no SEO.
- [ ] **Testes em aparelho real:** o vídeo do hero e as abas de Vantagens foram corrigidos
      para celular, mas só validados em simulação de tela.

## 11. Histórico

**26/11/2026**
- Site criado a partir do protótipo, com a aparência da referência Curenast.
- Marca trocada para Box4Vets; menu redesenhado três vezes até o formato atual.
- Conteúdo reorganizado em abas e blocos que abrem.
- Fotos geradas por IA para os cards e o blog; quatro vídeos incluídos.
- Blog criado com três matérias simuladas.
- Hero refeito: vídeo controlado pela rolagem, abertura em tela cheia, logo central.
- Versão de celular revista: hero, margens laterais, abas em grade, tabela em cartões.
- SEO básico e conteúdo das abas no HTML.
- Código publicado no GitHub e prévia no GitHub Pages.
- Hero: parágrafo movido para baixo do box também no desktop; box mais alto na dobra.
- Criado o site irmão Box4Pets Criador (`../box4pets_criador`) a partir desta base.

**27/11/2026**
- Faixa de vídeo do laboratório: enquadramento puxado para a direita da imagem (78%), para a pesquisadora e o microscópio aparecerem; a versão de celular (`lab-mobile.mp4`) foi recortada de novo pelo lado direito. Logo acima da frase.
- Manual revisto: endereço local, site irmão, faixa de vídeo e mídia.
- Faixa do laboratório: a frase de apoio fica sempre sozinha na linha de baixo, também no celular.
- "Como funciona a abordagem" no celular: a foto de cada card ficou mais alta (proporção 5:4,4 em vez de uma faixa de 176px), porque as fotos são verticais e eram muito cortadas.
