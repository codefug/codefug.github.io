"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  CATEGORY_GROUP_ORDER,
  type CategoryGroupId,
  getGroupIdByTag,
} from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import { useViewMode } from "@/hooks/useViewMode";
import type { Locale } from "@/i18n/config";
import { Badge } from "../ui/badge";
import PostGallery from ".";
import { ViewToggle } from "./view-toggle";

const ALL = "all";

/**
 * 카테고리 구분 없이 모든 글을 한 곳에서 보는 페이지.
 * 홈은 카테고리별로 나뉘어 있어 "전체를 시간순으로" 훑기 어렵기 때문에 따로 둔다.
 */
export function AllPosts({
  frontMatterListByLocale,
}: {
  frontMatterListByLocale: Record<Locale, FrontMatter[]>;
}) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const posts = frontMatterListByLocale[locale] || frontMatterListByLocale.ko;

  const [group, setGroup] = useState<CategoryGroupId | typeof ALL>(ALL);
  const { viewMode, toggle } = useViewMode("all-posts");

  const groupCounts = useMemo(() => {
    const counts = new Map<CategoryGroupId, number>();
    for (const post of posts) {
      // 한 글이 여러 그룹에 걸칠 수 있으므로 그룹 기준으로 중복 없이 센다.
      for (const id of new Set(post.categories.map(getGroupIdByTag))) {
        counts.set(id, (counts.get(id) ?? 0) + 1);
      }
    }
    return counts;
  }, [posts]);

  const filtered = useMemo(() => {
    if (group === ALL) return posts;
    return posts.filter((post) =>
      post.categories.some((tag) => getGroupIdByTag(tag) === group),
    );
  }, [posts, group]);

  return (
    <div className="mx-auto w-full max-w-350 px-4 py-8">
      <header className="mb-6">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">
          {t("posts.title")}
        </h1>
        <p className="text-muted-foreground">{t("posts.description")}</p>
      </header>

      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          <FilterChip
            label={t("common.category.all")}
            total={posts.length}
            isSelected={group === ALL}
            onSelect={() => setGroup(ALL)}
          />
          {CATEGORY_GROUP_ORDER.filter((id) => groupCounts.has(id)).map(
            (id) => (
              <FilterChip
                key={id}
                label={t(`categories.${id}.label`)}
                total={groupCounts.get(id) ?? 0}
                isSelected={group === id}
                onSelect={() => setGroup(id)}
              />
            ),
          )}
        </div>
        <ViewToggle viewMode={viewMode} onToggle={toggle} />
      </div>

      <PostGallery
        postInfoList={filtered}
        viewMode={viewMode}
        moreLabel={t("common.category.showMore")}
      />
    </div>
  );
}

function FilterChip({
  label,
  total,
  isSelected,
  onSelect,
}: {
  label: string;
  total: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className="cursor-pointer"
    >
      <Badge
        className="h-8 text-sm"
        variant={isSelected ? "default" : "outline"}
      >
        {label}({total})
      </Badge>
    </button>
  );
}
