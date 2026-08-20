"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { DefaultThumbnail } from "./DefaultThumbnail";
import { SeriesOrderBadge } from "./series-order-badge";

export default function PostCard({
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
      className="h-full"
    >
      <Card className="group relative flex h-108 cursor-pointer flex-col overflow-hidden bg-card p-5 transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <span
          className="absolute inset-x-0 top-0 h-0.5 bg-primary/40 transition-colors duration-300 group-hover:bg-primary"
          aria-hidden="true"
        />
        {/*
          teaser는 대부분 기술 로고다. 꽉 채우면 로고가 늘어나 보이므로
          정사각 자리를 잡고 그 안에 원본 비율로 넣는다.
          teaser가 없으면 같은 자리에 카테고리 기반 기본 썸네일을 넣는다.
        */}
        {header?.teaser ? (
          <div className="-mx-5 -mt-5 mb-4 flex h-40 shrink-0 items-center justify-center border-border/60 border-b bg-muted/30 sm:h-48">
            <img
              src={header.teaser}
              alt=""
              aria-hidden
              className="aspect-square h-full w-auto max-w-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="-mx-5 -mt-5 mb-4 h-40 shrink-0 border-border/60 border-b sm:h-48">
            <DefaultThumbnail
              category={categories[0]}
              caption={header?.thumbnailCaption}
            />
          </div>
        )}
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
        <div className="mt-4 flex items-center gap-2 text-muted-foreground/60 text-xs">
          <time>{date}</time>
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{t("post.readingTime", { minutes: readingTime })}</span>
            </>
          )}
        </div>
      </Card>
    </Link>
  );
}
