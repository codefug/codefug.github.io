"use client";

import { ArrowRight, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { Card } from "../ui/card";

/**
 * 홈의 시리즈 섹션에 놓이는 카드 한 장.
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
    <a href={`${PATH.SERIES}/${slug}`} title={name} className="h-full">
      <Card className="group relative flex h-full cursor-pointer flex-col overflow-hidden p-5 transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <span
          className="absolute inset-x-0 top-0 h-0.5 bg-primary/40 transition-colors duration-300 group-hover:bg-primary"
          aria-hidden="true"
        />
        <div className="mb-2 flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-medium text-muted-foreground text-xs">
            {t("series.postCount", { count: posts.length })}
          </span>
        </div>
        <h3 className="mb-2 font-bold text-lg transition-colors group-hover:text-primary">
          {name}
        </h3>
        <p className="line-clamp-3 flex-1 text-muted-foreground text-sm">
          {t(`series.${slug}.description`)}
        </p>
        <div className="mt-4 flex items-center justify-between text-muted-foreground/60 text-xs">
          <time>
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
