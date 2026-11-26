import { asset } from "@/lib/base";
import { posts } from "@/content/blog";
import { PostCard } from "../blog/PostCard";
import { FadeUp } from "../motion/FadeUp";
import { Words } from "../motion/Words";
import { SplitButton, Tag } from "../ui/Button";

/** Chamada do blog na home: uma materia em destaque e duas ao lado. */
export function Blog() {
  const [destaque, ...outras] = posts;
  return (
    <section id="blog" className="pb-24 md:pb-36">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeUp>
              <Tag>Blog</Tag>
            </FadeUp>
            <Words className="display mt-6 text-display text-ink" parts={["Genética na rotina, caso a caso"]} />
          </div>
          <FadeUp delay={0.1}>
            <SplitButton href={asset("/blog/")} variant="ghost" external={false}>
              Ver todas as matérias
            </SplitButton>
          </FadeUp>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <FadeUp>
            <PostCard post={destaque} grande />
          </FadeUp>
          <div className="grid gap-5">
            {outras.slice(0, 2).map((p, i) => (
              <FadeUp key={p.slug} delay={0.1 + i * 0.1} className="grid">
                <PostCard post={p} />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
