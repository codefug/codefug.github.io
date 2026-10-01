"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { Badge } from "../ui/badge";
import { PostThumbnail } from "./post-thumbnail";
import { SeriesOrderBadge } from "./series-order-badge";

export default function PostListItem({
  categories,
  date,
  excerpt,
  title,
  id,
  readingTime,
  header,
  seriesOrder,
  cover,
  coverFit,
}: FrontMatter) {
  const t = useTranslations();
  const linkHref = useMemo(() => `${PATH.POSTS}/${id}`, [id]);

  return (
    <Link
      href={linkHref}
      aria-label={t("common.aria.postRead", { title })}
      rel="bookmark"
      title={title}
      className="group relative flex gap-3 rounded-xl border border-border bg-background p-4 pl-5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm sm:gap-4"
    >
      <span
        className="absolute top-4 bottom-4 left-0 w-0.5 rounded-full bg-primary/0 transition-colors duration-200 group-hover:bg-primary/60"
        aria-hidden="true"
      />
      <div className="aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg border border-border/60 sm:w-36">
        <PostThumbnail
          id={id}
          title={title}
          categories={categories}
          seriesOrder={seriesOrder}
          header={header}
          cover={cover}
          coverFit={coverFit}
          size="sm"
        />
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
        <p className="line-clamp-2 text-muted-foreground text-sm">{excerpt}</p>
        <div className="mt-1 flex items-center gap-2 text-muted-foreground/60 text-xs">
          <time>{date}</time>
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{t("post.readingTime", { minutes: readingTime })}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
