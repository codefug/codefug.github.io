import Link from "next/link";
import { PATH } from "@/constants/path";
import type { FrontMatter } from "@/types/post";
import { Badge } from "../ui/badge";
import { PostMeta } from "./post-meta";
import { PostThumbnail } from "./post-thumbnail";
import { SeriesOrderBadge } from "./series-order-badge";

export default function PostListItem({ post }: { post: FrontMatter }) {
  const { id, title, excerpt, categories, seriesOrder } = post;

  return (
    <Link
      href={`${PATH.POSTS}/${id}`}
      aria-label={`${title} 포스트 읽기`}
      rel="bookmark"
      title={title}
      className="group relative flex gap-3 rounded-xl border border-border bg-background p-4 pl-5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm sm:gap-4"
    >
      <span
        className="absolute top-4 bottom-4 left-0 w-0.5 rounded-full bg-primary/0 transition-colors duration-200 group-hover:bg-primary/60"
        aria-hidden="true"
      />
      {/* 옆 글 열이 짧아도 썸네일이 늘어나지 않게 self-start로 뗀다. */}
      <div className="h-18 w-24 shrink-0 self-start overflow-hidden rounded-lg border border-border/60 sm:h-32 sm:w-43">
        <PostThumbnail post={post} size="sm" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-1">
          {seriesOrder && <SeriesOrderBadge seriesOrder={seriesOrder} />}
          {categories.map((category) => (
            <Badge key={category + id} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <h2 className="line-clamp-1 font-bold text-base transition-colors group-hover:text-primary sm:text-lg">
          {title}
        </h2>
        {/* 요약이 한 줄이어도 두 줄 높이를 차지해 카드 높이가 일정하다 */}
        <p className="line-clamp-2 min-h-[2lh] text-muted-foreground text-sm">
          {excerpt}
        </p>
        <PostMeta
          date={post.date}
          readingTime={post.readingTime}
          className="mt-1"
        />
      </div>
    </Link>
  );
}
