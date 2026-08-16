"use client";

import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useViewMode } from "@/hooks/useViewMode";
import { useTranslations } from "@/lib/messages";
import PostGallery from ".";
import { ViewToggle } from "./view-toggle";

const RECENT_COUNT = 8;

/**
 * 홈의 최근 글 목록.
 * 카테고리별 탐색은 /posts와 사이드바가 담당하므로,
 * 홈에서는 구분 없이 최근 글만 보여주고 전체 목록으로 넘긴다.
 */
export function RecentPosts({
  frontMatterList,
}: {
  frontMatterList: FrontMatter[];
}) {
  const t = useTranslations();
  const { viewMode, toggle } = useViewMode("home-recent");

  const recent = useMemo(
    () => frontMatterList.slice(0, RECENT_COUNT),
    [frontMatterList],
  );

  return (
    <section className="mb-14">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className="h-5 w-1 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <h2 className="font-bold text-gray-900 text-lg md:text-xl dark:text-gray-100">
            {t("home.recentWriting")}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={PATH.POSTS}
            className="group inline-flex shrink-0 items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-primary"
          >
            {t("home.viewAllPosts", { count: frontMatterList.length })}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <ViewToggle viewMode={viewMode} onToggle={toggle} />
        </div>
      </div>

      <PostGallery postInfoList={recent} viewMode={viewMode} />
    </section>
  );
}
