import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { FadeUp } from "@/components/motion/FadeUp";
import { Words } from "@/components/motion/Words";
import { Contato } from "@/components/sections/Contato";
import { Header } from "@/components/sections/Header";
import { Tag } from "@/components/ui/Button";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog" },
  description: "Medicina preditiva e de precisão aplicada à rotina clínica veterinária.",
};

export default function BlogPage() {
  const [destaque, ...outras] = posts;
  return (
    <>
      <Header base="/" current="blog" />
      <main>
        <section className="pt-2">
          <div className="panel grad-soft pt-[150px] pb-16 md:pt-[190px] md:pb-24">
            <div className="container-page flex flex-col items-center text-center">
              <Tag>Blog</Tag>
              <Words
                as="h1"
                eager
                delay={0.15}
                className="display mt-6 max-w-[820px] text-hero text-ink"
                parts={["Genética na rotina,", { text: "caso a caso", className: "text-ciano-700" }]}
              />
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container-page grid gap-5 lg:grid-cols-2">
            <FadeUp className="lg:col-span-2">
              <PostCard post={destaque} grande />
            </FadeUp>
            {outras.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.1} className="grid">
                <PostCard post={p} />
              </FadeUp>
            ))}
          </div>
        </section>
        <Contato base="/" />
      </main>
    </>
  );
}
