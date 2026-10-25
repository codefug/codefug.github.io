"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PATH } from "@/constants/path";
import type { ViewMode } from "@/hooks/use-view-mode";
import type { FrontMatter } from "@/types/post";
import { SectionHeading } from "../ui/section-heading";
import PostGallery from "./post-gallery";
import { ViewToggle } from "./view-toggle";

// 뷰 모드를 sessionStorage로 복원하면 첫 렌더(grid) 뒤 effect가 덮어써 깜빡이므로 항상 grid로 시작한다.
export function RecentPosts({
  title,
  postInfoList,
  allPostCount,
}: {
  title: string;
  postInfoList: FrontMatter[];
  /** 주면 전체 글 목록으로 가는 링크를 단다. */
  allPostCount?: number;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  if (postInfoList.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="mb-4 flex items-center justify-between gap-4">
        <SectionHeading>{title}</SectionHeading>
        <div className="flex items-center gap-3">
          {allPostCount !== undefined && (
            <Link
              href={PATH.POSTS}
              className="group inline-flex shrink-0 items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-primary"
            >
              {`전체 ${allPostCount}편 보기`}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          )}
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>
      </div>

      <PostGallery postInfoList={postInfoList} viewMode={viewMode} />
    </section>
  );
}
