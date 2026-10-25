"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PATH } from "@/constants/path";
import { useViewMode } from "@/hooks/use-view-mode";
import type { FrontMatter } from "@/types/post";
import PostGallery from "./post-gallery";
import { ViewToggle } from "./view-toggle";

export function CategoryPosts({
  scope,
  label,
  description,
  posts,
}: {
  /** 보기 방식을 묶음별로 따로 기억하기 위한 키 */
  scope: string;
  /** 태그를 그대로 보여주기 어려운 경우(kkom-kkom 등)를 위해 받는다. */
  label: string;
  description?: string;
  posts: FrontMatter[];
}) {
  const { viewMode, toggle } = useViewMode(scope);

  return (
    <div className="mx-auto w-full max-w-350 px-4 py-8">
      <Link
        href={PATH.POSTS}
        className="mb-4 inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        전체 글로
      </Link>

      <header className="mb-6">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">{label}</h1>
        {description && (
          <p className="mb-1 text-muted-foreground">{description}</p>
        )}
        <p className="text-muted-foreground/70 text-sm">
          {`${posts.length}편`}
        </p>
      </header>

      <div className="mb-4 flex justify-end">
        <ViewToggle viewMode={viewMode} onToggle={toggle} />
      </div>

      <PostGallery
        postInfoList={posts}
        viewMode={viewMode}
        moreLabel={"더 보기"}
      />
    </div>
  );
}
