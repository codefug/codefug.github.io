"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { Badge } from "../ui/badge";
import { DefaultThumbnail } from "./DefaultThumbnail";
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
}: FrontMatter) {
  const t = useTranslations();
  const linkHref = useMemo(() => `${PATH.POSTS}/${id}`, [id]);

  return (
    <Link
      href={linkHref}
      aria-label={t("common.aria.postRead", { title })}
      rel="bookmark"
      title={title}
      className="group relative flex gap-4 rounded-xl border border-border bg-background p-4 pl-5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
    >
      <span
        className="absolute top-4 bottom-4 left-0 w-0.5 rounded-full bg-primary/0 transition-colors duration-200 group-hover:bg-primary/60"
        aria-hidden="true"
      />
      {/*
        카드와 같은 규칙 — 정사각 자리에 원본 비율로 넣고 남는 곳은 여백으로 둔다.
        teaser가 없으면 같은 자리에 카테고리 기반 기본 썸네일을 넣는다.
      */}
      {header?.teaser ? (
        <div className="hidden aspect-square w-20 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/30 p-3 sm:flex">
          <img
            src={header.teaser}
            alt=""
            aria-hidden
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="hidden aspect-square w-20 shrink-0 overflow-hidden rounded-lg border border-border/60 sm:block">
          <DefaultThumbnail
            category={categories[0]}
            caption={header?.thumbnailCaption}
            compact
          />
        </div>
      )}
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
