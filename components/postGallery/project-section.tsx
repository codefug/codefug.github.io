"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { TAG_LIST } from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import PostCard from "../postCard";

/**
 * 직접 만든 것들. 글이 아니라 결과물이므로 홈 상단에 카드로 둔다.
 */
export function ProjectSection({ posts }: { posts: FrontMatter[] }) {
  const t = useTranslations("categories.project");

  const projects = useMemo(
    () => posts.filter((post) => post.categories.includes(TAG_LIST.PROJECT)),
    [posts],
  );

  if (projects.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="mb-4 flex items-start gap-2.5">
        <span
          className="mt-1 h-5 w-1 shrink-0 rounded-full bg-primary"
          aria-hidden="true"
        />
        <div>
          <h2 className="font-bold text-gray-900 text-lg md:text-xl dark:text-gray-100">
            {t("label")}
            <span className="ml-2 font-normal text-muted-foreground text-sm">
              {projects.length}
            </span>
          </h2>
          <p className="mt-0.5 text-muted-foreground text-sm">
            {t("description")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
