"use client";

import { SearchX } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useTranslations } from "@/lib/messages";
import { createSearchIndex, searchPosts, suggestPosts } from "@/lib/search";
import { cn } from "@/lib/utils";
import BlockHeader from "../ui/block-header";
import { Input } from "../ui/input";
import PostGallery from ".";

/**
 * 검색은 엔터로 확정한다.
 * 타이핑마다 결과 목록이 갈리면 읽는 중에 화면이 계속 흔들리기 때문이다.
 * 대신 입력 중에는 자동완성만 늦춰서 보여준다.
 */
export default function PostSearchGallery({
  totalFrontMatterList,
}: {
  totalFrontMatterList: FrontMatter[];
}) {
  const t = useTranslations("search");
  const inputRef = useRef<HTMLInputElement>(null);

  /** 입력 중인 값 — 자동완성에만 쓴다. */
  const [draft, setDraft] = useState("");
  /** 엔터로 확정한 값 — 결과 목록은 이것만 본다. */
  const [committed, setCommitted] = useState("");
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // 타이핑마다 인덱스를 뒤지지 않도록 자동완성만 늦춘다.
  const debouncedDraft = useDebouncedValue(draft, 200);

  // 인덱스는 글 목록이 바뀔 때만 다시 만든다.
  const index = useMemo(
    () => createSearchIndex(totalFrontMatterList),
    [totalFrontMatterList],
  );

  const suggestions = useMemo(
    () => suggestPosts(index, debouncedDraft),
    [index, debouncedDraft],
  );

  const results = useMemo(
    () => searchPosts(index, committed),
    [index, committed],
  );

  const visibleSuggestions = isSuggestOpen ? suggestions : [];

  const closeSuggest = () => {
    setIsSuggestOpen(false);
    setActiveIndex(-1);
  };

  const commit = (value: string) => {
    setDraft(value);
    setCommitted(value);
    closeSuggest();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      closeSuggest();
      return;
    }
    if (!visibleSuggestions.length) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const size = visibleSuggestions.length + 1;
    const next = (activeIndex + delta + size + 1) % size;
    // 목록 끝을 지나면 -1로 돌아와 입력한 값 그대로 검색할 수 있게 한다.
    setActiveIndex(next === visibleSuggestions.length ? -1 : next);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const picked = visibleSuggestions[activeIndex];
    commit(picked ? picked.title : draft);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative mt-4 mb-7">
        <Input
          placeholder={t("placeholder")}
          ref={inputRef}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            setIsSuggestOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsSuggestOpen(true)}
          onBlur={() => setTimeout(closeSuggest, 120)}
          className="h-9 md:h-16 md:text-xl"
          aria-expanded={visibleSuggestions.length > 0}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
        />
        {visibleSuggestions.length > 0 && (
          <ul
            id="search-suggestions"
            className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-border bg-card shadow-lg"
          >
            {visibleSuggestions.map((suggestion, i) => (
              <li key={suggestion.id}>
                <button
                  type="button"
                  onMouseDown={() => commit(suggestion.title)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "block w-full truncate px-4 py-2.5 text-left text-sm transition-colors",
                    i === activeIndex
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted",
                  )}
                >
                  {suggestion.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>
      <PostSearchBarResult
        query={committed}
        filteredFrontMatterList={results}
      />
    </div>
  );
}

function PostSearchBarResult({
  query,
  filteredFrontMatterList,
}: {
  query: string;
  filteredFrontMatterList: FrontMatter[];
}) {
  const t = useTranslations("search");

  if (query === "") {
    return <p className="text-muted-foreground text-sm">{t("noSearchYet")}</p>;
  }

  if (filteredFrontMatterList.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
        <SearchX className="h-10 w-10 opacity-40" />
        <p className="text-sm">{t("noResults")}</p>
      </div>
    );
  }

  return (
    <BlockHeader title={t("resultsFor", { query })}>
      <PostGallery postInfoList={filteredFrontMatterList} />
    </BlockHeader>
  );
}
