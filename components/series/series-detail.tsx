import { ArrowLeft, Layers } from "lucide-react";
import Link from "next/link";
import { requireSeriesInfo } from "@/constants/categories";
import { PATH } from "@/constants/path";
import type { FrontMatter } from "@/types/post";
import { PostMeta } from "../post-card/post-meta";

export function SeriesDetail({
  slug,
  posts,
}: {
  slug: string;
  posts: FrontMatter[];
}) {
  const info = requireSeriesInfo(slug);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <Link
        href={PATH.SERIES}
        className="mb-6 inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        목록으로
      </Link>

      <header className="mb-8 border-border border-b pb-6">
        <div className="mb-2 flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-medium text-muted-foreground text-sm">
            {posts.length}편
          </span>
        </div>
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">{info.name}</h1>
        <p className="text-muted-foreground">{info.description}</p>
      </header>

      <ol className="flex flex-col gap-3">
        {posts.map((post, index) => (
          <li key={post.id}>
            <SeriesPostItem post={post} order={index + 1} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function SeriesPostItem({ post, order }: { post: FrontMatter; order: number }) {
  return (
    <Link
      href={`${PATH.POSTS}/${post.id}`}
      aria-label={`${post.title} 포스트 읽기`}
      rel="bookmark"
      className="group flex gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
    >
      <span
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
        aria-hidden="true"
      >
        {order}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="mb-1 font-bold text-base transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mb-2 line-clamp-2 text-muted-foreground text-sm">
          {post.excerpt}
        </p>
        <PostMeta date={post.date} readingTime={post.readingTime} />
      </div>
    </Link>
  );
}
