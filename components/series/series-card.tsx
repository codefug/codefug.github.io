"use client";

import { ArrowRight, Layers } from "lucide-react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { Card } from "../ui/card";

/**
 * 홈의 시리즈 섹션에 놓이는 목록 한 줄.
 * 개별 글이 아니라 시리즈 전체를 대표하며, 누르면 시리즈 페이지로 이동한다.
 */
export default function SeriesCard({
  slug,
  posts,
  startDate,
  endDate,
}: {
  slug: string;
  posts: FrontMatter[];
  startDate: string;
  endDate: string;
}) {
  const t = useTranslations();
  const name = t(`series.${slug}.name`);

  return (
    <a href={`${PATH.SERIES}/${slug}`} title={name}>
      <Card className="group relative flex cursor-pointer items-center gap-4 overflow-hidden p-5 transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <span
          className="absolute inset-y-0 left-0 w-0.5 bg-primary/40 transition-colors duration-300 group-hover:bg-primary"
          aria-hidden="true"
        />
        <Layers className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="font-bold text-lg transition-colors group-hover:text-primary">
              {name}
            </h3>
            <span className="font-medium text-muted-foreground text-xs">
              {t("series.postCount", { count: posts.length })}
            </span>
          </div>
          <p className="mt-1 line-clamp-1 text-muted-foreground text-sm">
            {t(`series.${slug}.description`)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-muted-foreground/60 text-xs">
          <time className="hidden sm:inline">
            {startDate} ~ {endDate}
          </time>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </Card>
    </a>
  );
}
