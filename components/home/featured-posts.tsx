import Link from "next/link";
import { resolveTagLabel } from "@/constants/categories";
import { PATH } from "@/constants/path";
import type { FrontMatter } from "@/types/post";
import { SectionHeading } from "../ui/section-heading";

/** 최신순은 아래 기술 칸이 맡으므로 여기는 직접 고른 글만, 썸네일 없이 글자로 보인다. */
export function FeaturedPosts({ posts }: { posts: FrontMatter[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mb-14">
      <SectionHeading className="mb-2">대표 글</SectionHeading>
      <ul className="divide-y divide-border">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`${PATH.POSTS}/${post.id}`}
              className="group flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-8"
            >
              <span className="shrink-0 text-muted-foreground text-xs md:w-36">
                {resolveTagLabel(post.categories[0])}
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-lg leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </span>
                <span className="mt-1 line-clamp-2 block text-muted-foreground text-sm leading-relaxed">
                  {post.excerpt}
                </span>
              </span>
              <time className="hidden shrink-0 text-muted-foreground/70 text-xs tabular-nums md:block">
                {post.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
