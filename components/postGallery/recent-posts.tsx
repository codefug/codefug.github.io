"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import PostGallery from ".";
import { ViewToggle } from "./view-toggle";

const RECENT_COUNT = 8;

/**
 * 홈의 최근 글 목록.
 * 카테고리별 탐색은 /posts와 사이드바가 담당하므로,
 * 홈에서는 구분 없이 최근 글만 보여주고 전체 목록으로 넘긴다.
 *
 * 뷰 모드는 세션 간 기억하지 않는 지역 상태다. sessionStorage로 복원하면
 * 첫 렌더(grid) 이후 effect가 저장된 값(list)으로 덮어써 깜빡임이 생기므로,
 * 누가 오든 항상 갤러리로 시작하게 고정한다.
 */
export function RecentPosts({
  frontMatterList,
}: {
  frontMatterList: FrontMatter[];
}) {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
          <Link
            href={PATH.POSTS}
            className="group inline-flex shrink-0 items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-primary"
          >
            {t("home.viewAllPosts", { count: frontMatterList.length })}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>
      </div>

      <PostGallery postInfoList={recent} viewMode={viewMode} />
    </section>
  );
}
