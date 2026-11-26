import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Capa, PostCard } from "@/components/blog/PostCard";
import { FadeUp } from "@/components/motion/FadeUp";
import { Words } from "@/components/motion/Words";
import { Contato } from "@/components/sections/Contato";
import { Header } from "@/components/sections/Header";
import { SplitButton } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";
import { autor, dataPost, posts } from "@/content/blog";
import { JsonLd } from "@/components/JsonLd";
import { links, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.resumo,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.titulo,
      description: post.resumo,
      url: `/blog/${post.slug}`,
      publishedTime: post.data,
      ...(post.capa ? { images: [post.capa] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const outras = posts.filter((p) => p.slug !== slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.titulo,
          description: post.resumo,
          datePublished: post.data,
          inLanguage: "pt-BR",
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          ...(post.capa ? { image: `${site.url}${post.capa}` } : {}),
          author: { "@type": "Organization", name: autor },
          publisher: { "@type": "Organization", name: site.nome, logo: `${site.url}/logo.svg` },
        }}
      />
      <Header base="/" current="blog" />
      <main>
        <article>
          <header className="pt-2">
            <div className="panel grad-soft pt-[130px] pb-10 md:pt-[170px] md:pb-14">
              <div className="container-page">
                <Link
                  href="/blog"
                  className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-roxo"
                >
                  <ArrowRight size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" />
                  Blog
                </Link>
                <p className="mt-4 w-fit rounded-full bg-roxo px-3 py-1.5 text-[0.8125rem] font-semibold text-white">
                  {post.categoria}
                </p>
                <Words
                  as="h1"
                  eager
                  delay={0.1}
                  className="display mt-5 max-w-[900px] text-[clamp(2rem,4.4vw,3.75rem)] text-ink"
                  parts={[post.titulo]}
                />
                <p className="mt-5 max-w-[680px] text-[1.1875rem] text-mute">{post.resumo}</p>
                <p className="mt-6 text-[0.875rem] text-mute">
                  {autor} · {dataPost(post.data)} · {post.leitura} de leitura
                </p>
                <div className="group relative mt-10 aspect-[16/9] overflow-hidden rounded-[20px] md:aspect-[21/9]">
                  <Capa post={post} sizes="(min-width: 1240px) 1160px, 94vw" priority />
                </div>
              </div>
            </div>
          </header>

          <div className="container-page py-14 md:py-20">
            <div className="mx-auto flex max-w-[720px] flex-col gap-6 text-[1.125rem] leading-[1.7] text-ink/85">
              {post.corpo.map((b, i) => {
                if (b.tipo === "h2")
                  return (
                    <h2 key={i} className="display mt-6 text-title text-ink">
                      {b.texto}
                    </h2>
                  );
                if (b.tipo === "lista")
                  return (
                    <ul key={i} className="flex flex-col gap-3">
                      {b.itens.map((item) => (
                        <li key={item} className="flex gap-3.5">
                          <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-roxo text-white">
                            <Check size={12} strokeWidth={2.6} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                if (b.tipo === "destaque")
                  return (
                    <FadeUp key={i}>
                      <blockquote className="display my-4 rounded-panel bg-roxo p-8 text-[1.5rem] leading-snug text-white md:p-10 md:text-[1.75rem]">
                        {b.texto}
                      </blockquote>
                    </FadeUp>
                  );
                return <p key={i}>{b.texto}</p>;
              })}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-panel bg-paper p-7">
                <p className="display max-w-[380px] text-[1.25rem] text-ink">
                  Quer aplicar isso nos seus atendimentos?
                </p>
                <SplitButton href={links.exame}>Solicitar exame</SplitButton>
              </div>
            </div>
          </div>
        </article>

        <section className="pb-20 md:pb-28">
          <div className="container-page">
            <h2 className="display text-title text-ink">Continue lendo</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {outras.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
        <Contato base="/" />
      </main>
    </>
  );
}
