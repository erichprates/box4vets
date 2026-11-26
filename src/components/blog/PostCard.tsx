import Image from "next/image";
import Link from "next/link";
import { dataPost, type Post } from "@/content/blog";
import { ArrowUpRight, Icon } from "../ui/icons";

/** Capa da materia: foto, ou o degrade da marca com o icone quando ainda nao ha foto. */
export function Capa({ post, sizes, priority }: { post: Post; sizes: string; priority?: boolean }) {
  if (post.capa)
    return (
      <Image
        src={post.capa}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectPosition: post.foco ?? "center 30%" }}
        className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-105"
      />
    );
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden bg-gradient-to-br from-roxo-400 via-roxo to-ink text-white">
      <span className="absolute aspect-square w-[95%] rounded-full border border-white/15 transition-transform duration-[1400ms] ease-out-expo group-hover:scale-110" />
      <span className="absolute aspect-square w-[60%] rounded-full border border-white/20 transition-transform duration-[1400ms] ease-out-expo group-hover:scale-125" />
      <span className="absolute -right-10 -bottom-10 size-56 rounded-full bg-ciano/40 blur-3xl" />
      <Icon name={post.icon} size={72} strokeWidth={0.9} className="relative" />
    </div>
  );
}

export function PostCard({ post, grande = false }: { post: Post; grande?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-panel bg-paper p-2.5 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(63_47_128/0.16)]"
    >
      <span
        className={`relative block flex-1 overflow-hidden rounded-[20px] ${
          grande ? "min-h-[260px] lg:min-h-[360px]" : "min-h-[190px]"
        }`}
      >
        <Capa post={post} sizes={grande ? "(min-width: 1024px) 640px, 94vw" : "(min-width: 1024px) 520px, 94vw"} />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.75rem] font-semibold tracking-[0.06em] text-roxo uppercase backdrop-blur">
          {post.categoria}
        </span>
      </span>
      <span className="flex items-end gap-4 p-4 pt-5 text-ink">
        <span className="flex-1">
          <span className={`display block ${grande ? "text-[1.5rem] md:text-[1.75rem]" : "text-[1.1875rem]"}`}>
            {post.titulo}
          </span>
          {grande && <span className="mt-2 block text-[0.9375rem] text-mute">{post.resumo}</span>}
          <span className="mt-3 block text-[0.8125rem] text-mute">
            {dataPost(post.data)} · {post.leitura} de leitura
          </span>
        </span>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-roxo text-white transition-transform duration-500 ease-out-expo group-hover:rotate-45">
          <ArrowUpRight size={18} />
        </span>
      </span>
    </Link>
  );
}
