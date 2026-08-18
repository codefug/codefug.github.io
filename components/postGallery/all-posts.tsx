"use client";

import { useMemo, useState } from "react";
import {
  FILTER_FACETS,
  facetLabelKey,
  matchesFacet,
} from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import { useViewMode } from "@/hooks/useViewMode";
import { useTranslations } from "@/lib/messages";
import { Badge } from "../ui/badge";
import PostGallery from ".";
import { ViewToggle } from "./view-toggle";

const ALL = "all";

/**
 * 카테고리 구분 없이 모든 글을 한 곳에서 보는 페이지.
 * 홈은 카테고리별로 나뉘어 있어 "전체를 시간순으로" 훑기 어렵기 때문에 따로 둔다.
 */
export function AllPosts({
  frontMatterList: posts,
}: {
  frontMatterList: FrontMatter[];
}) {
  const t = useTranslations();

  const [selected, setSelected] = useState<string | typeof ALL>(ALL);
  const { viewMode, toggle } = useViewMode("all-posts");

  // 글이 없는 칸은 세우지 않는다. 한 글이 여러 칸에 걸칠 수 있어 칸마다 따로 센다.
  const facets = useMemo(
    () =>
      FILTER_FACETS.map((facet) => ({
        facet,
        total: posts.filter((post) => matchesFacet(facet, post.categories))
          .length,
      })).filter(({ total }) => total > 0),
    [posts],
  );

  const filtered = useMemo(() => {
    if (selected === ALL) return posts;
    const found = facets.find(({ facet }) => facet.id === selected);
    if (!found) return posts;
    return posts.filter((post) => matchesFacet(found.facet, post.categories));
  }, [posts, selected, facets]);

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
            isSelected={selected === ALL}
            onSelect={() => setSelected(ALL)}
          />
          {facets.map(({ facet, total }) => (
            <FilterChip
              key={facet.id}
              label={t(facetLabelKey(facet))}
              total={total}
              isSelected={selected === facet.id}
              onSelect={() => setSelected(facet.id)}
            />
          ))}
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
