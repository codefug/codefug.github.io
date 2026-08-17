"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useViewMode } from "@/hooks/useViewMode";
import { useTranslations } from "@/lib/messages";
import PostGallery from ".";
import { ViewToggle } from "./view-toggle";

/**
 * 어떤 묶음(태그 하나 또는 그룹 하나)에 속한 글 목록.
 * 사이드바에서 카테고리·그룹을 누르면 글로 바로 가는 대신 이 페이지로 온다.
 */
export function CategoryPosts({
  scope,
  label,
  description,
  posts,
}: {
  /** 보기 방식을 묶음별로 따로 기억하기 위한 키 */
  scope: string;
  /** 표시용 이름. 태그 그대로 쓰기 어려운 경우(kkom-kkom 등)를 위해 받는다. */
  label: string;
  /** 이 묶음이 무엇을 모았는지 한 줄 설명. 그룹 페이지에서 쓴다. */
  description?: string;
  posts: FrontMatter[];
}) {
  const t = useTranslations();
  const { viewMode, toggle } = useViewMode(scope);

  return (
    <div className="mx-auto w-full max-w-350 px-4 py-8">
      <Link
        href={PATH.POSTS}
        className="mb-4 inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        {t("categories.backToPosts")}
      </Link>

      <header className="mb-6">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">{label}</h1>
        {description && (
          <p className="mb-1 text-muted-foreground">{description}</p>
        )}
        <p className="text-muted-foreground/70 text-sm">
          {t("categories.postCount", { count: posts.length })}
        </p>
      </header>

      <div className="mb-4 flex justify-end">
        <ViewToggle viewMode={viewMode} onToggle={toggle} />
      </div>

      <PostGallery
        postInfoList={posts}
        viewMode={viewMode}
        moreLabel={t("common.category.showMore")}
      />
    </div>
  );
}
