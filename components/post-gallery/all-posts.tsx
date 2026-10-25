"use client";

import { useMemo, useState } from "react";
import {
  FILTER_FACETS,
  facetLabel,
  matchesFacet,
} from "@/constants/categories";
import { useViewMode } from "@/hooks/use-view-mode";
import type { FrontMatter } from "@/types/post";
import { Badge } from "../ui/badge";
import PostGallery from "./post-gallery";
import { ViewToggle } from "./view-toggle";

const ALL = "all";

export function AllPosts({
  frontMatterList: posts,
}: {
  frontMatterList: FrontMatter[];
}) {
  const [selected, setSelected] = useState<string>(ALL);
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
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">전체 글</h1>
        <p className="text-muted-foreground">
          카테고리 구분 없이 모든 글을 최신순으로 봅니다.
        </p>
      </header>

      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          <FilterChip
            label={"전체"}
            total={posts.length}
            isSelected={selected === ALL}
            onSelect={() => setSelected(ALL)}
          />
          {facets.map(({ facet, total }) => (
            <FilterChip
              key={facet.id}
              label={facetLabel(facet)}
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
        moreLabel={"더 보기"}
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
