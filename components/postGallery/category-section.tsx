"use client";

import { useMemo, useState } from "react";
import type { CategoryGroupId } from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import { useViewMode } from "@/hooks/useViewMode";
import { useTranslations } from "@/lib/messages";
import { Badge } from "../ui/badge";
import PostGallery from ".";
import { ViewToggle } from "./view-toggle";

const ALL_TAGS = "";

/**
 * 홈에서 세로로 쌓이는 카테고리 한 덩어리.
 * 섹션마다 리스트/갤러리 전환과 태그 필터를 독립적으로 가진다.
 */
export default function CategorySection({
  groupId,
  posts,
  tags,
}: {
  groupId: CategoryGroupId;
  posts: FrontMatter[];
  tags: { tag: string; total: number }[];
}) {
  const t = useTranslations();
  const [selectedTag, setSelectedTag] = useState(ALL_TAGS);
  const { viewMode, toggle } = useViewMode(groupId);

  const filteredPosts = useMemo(() => {
    if (selectedTag === ALL_TAGS) return posts;
    return posts.filter((post) => post.categories.includes(selectedTag));
  }, [posts, selectedTag]);

  // 태그가 하나뿐이면 필터가 의미 없으므로 칩을 그리지 않는다.
  const showTagFilter = tags.length > 1;

  return (
    <section className="mb-14">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className="mt-1 h-5 w-1 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-bold text-gray-900 text-lg md:text-xl dark:text-gray-100">
              {t(`categories.${groupId}.label`)}
              <span className="ml-2 font-normal text-muted-foreground text-sm">
                {posts.length}
              </span>
            </h2>
            <p className="mt-0.5 text-muted-foreground text-sm">
              {t(`categories.${groupId}.description`)}
            </p>
          </div>
        </div>
        <ViewToggle viewMode={viewMode} onToggle={toggle} />
      </div>

      {showTagFilter && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          <TagChip
            label={t("common.category.all")}
            total={posts.length}
            isSelected={selectedTag === ALL_TAGS}
            ariaLabel={t("common.aria.allCategorySelect")}
            onSelect={() => setSelectedTag(ALL_TAGS)}
          />
          {tags.map(({ tag, total }) => (
            <TagChip
              key={tag}
              label={tag}
              total={total}
              isSelected={selectedTag === tag}
              ariaLabel={t("common.aria.categorySelect", {
                category: tag,
                count: total,
              })}
              onSelect={() => setSelectedTag(tag)}
            />
          ))}
        </div>
      )}

      <PostGallery
        postInfoList={filteredPosts}
        viewMode={viewMode}
        moreLabel={t("common.category.showMore")}
      />
    </section>
  );
}

function TagChip({
  label,
  total,
  isSelected,
  ariaLabel,
  onSelect,
}: {
  label: string;
  total: number;
  isSelected: boolean;
  ariaLabel: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={ariaLabel}
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
