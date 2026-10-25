import Link from "next/link";
import { PATH } from "@/constants/path";
import type { FrontMatter } from "@/types/post";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { PostMeta } from "./post-meta";
import { PostThumbnail } from "./post-thumbnail";
import { SeriesOrderBadge } from "./series-order-badge";

export default function PostCard({ post }: { post: FrontMatter }) {
  const { id, title, excerpt, categories, seriesOrder } = post;

  return (
    <Link
      href={`${PATH.POSTS}/${id}`}
      aria-label={`${title} 포스트 읽기`}
      rel="bookmark"
      title={title}
      className="h-full"
    >
      <Card className="group relative flex h-108 cursor-pointer flex-col overflow-hidden bg-card p-5 transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <span
          className="absolute inset-x-0 top-0 h-0.5 bg-primary/40 transition-colors duration-300 group-hover:bg-primary"
          aria-hidden="true"
        />
        <div className="-mx-5 -mt-5 mb-4 h-40 shrink-0 border-border/60 border-b sm:h-48">
          <PostThumbnail post={post} />
        </div>
        <div className="mb-2.5 flex flex-wrap items-center gap-1">
          {seriesOrder && <SeriesOrderBadge seriesOrder={seriesOrder} />}
          {categories.map((category) => (
            <Badge key={category + id} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
        <h2 className="mb-2 line-clamp-2 font-bold text-lg leading-snug transition-colors group-hover:text-primary">
          {title}
        </h2>
        <p className="line-clamp-4 flex-1 text-muted-foreground text-sm">
          {excerpt}
        </p>
        <PostMeta
          date={post.date}
          readingTime={post.readingTime}
          className="mt-4"
        />
      </Card>
    </Link>
  );
}
