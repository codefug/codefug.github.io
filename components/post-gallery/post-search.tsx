"use client";

import { SearchX } from "lucide-react";
import type MiniSearch from "minisearch";
import { type FormEvent, type KeyboardEvent, useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { createSearchIndex, searchPosts, suggestPosts } from "@/lib/search";
import { cn } from "@/lib/utils";
import type { FrontMatter } from "@/types/post";
import { Input } from "../ui/input";
import { SectionHeading } from "../ui/section-heading";
import PostGallery from "./post-gallery";

/** -1은 선택 없음(입력값 그대로 검색). 목록 양 끝을 지나면 -1로 돌아온다. */
function moveActiveIndex(current: number, delta: 1 | -1, size: number): number {
  if (size === 0) return -1;
  // -1을 size 번째 자리로 보고 순환시킨다.
  const slot = current === -1 ? size : current;
  const next = (slot + delta + size + 1) % (size + 1);
  return next === size ? -1 : next;
}

// 타이핑마다 결과가 바뀌면 읽는 중에 화면이 흔들려서, 결과는 엔터로 확정하고 입력 중에는 자동완성만 보여준다.
export default function PostSearch({ posts }: { posts: FrontMatter[] }) {
  const [query, setQuery] = useState("");
  const index = useMemo(() => createSearchIndex(posts), [posts]);
  const results = useMemo(() => searchPosts(index, query), [index, query]);

  return (
    <div>
      <SearchBox index={index} onCommit={setQuery} />
      <SearchResults query={query} results={results} />
    </div>
  );
}

function SearchBox({
  index,
  onCommit,
}: {
  index: MiniSearch<FrontMatter>;
  onCommit: (query: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [debouncedDraft] = useDebounceValue(draft, 200);
  const suggestions = useMemo(
    () => suggestPosts(index, debouncedDraft),
    [index, debouncedDraft],
  );
  const visibleSuggestions = isSuggestOpen ? suggestions : [];

  const closeSuggest = () => {
    setIsSuggestOpen(false);
    setActiveIndex(-1);
  };

  const commit = (value: string) => {
    setDraft(value);
    onCommit(value);
    closeSuggest();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      closeSuggest();
      return;
    }
    if (!visibleSuggestions.length) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    setActiveIndex((current) =>
      moveActiveIndex(
        current,
        event.key === "ArrowDown" ? 1 : -1,
        visibleSuggestions.length,
      ),
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const picked = visibleSuggestions[activeIndex];
    commit(picked ? picked.title : draft);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mt-4 mb-7">
      <Input
        placeholder={"검색어를 입력하세요"}
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
  );
}

function SearchResults({
  query,
  results,
}: {
  query: string;
  results: FrontMatter[];
}) {
  if (query === "") {
    return (
      <p className="text-muted-foreground text-sm">
        검색으로 빠르게 확인하세요!
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
        <SearchX className="h-10 w-10 opacity-40" />
        <p className="text-sm">검색 결과가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <SectionHeading as="h1" className="mb-4">
        {`${query}에 대한 결과`}
      </SectionHeading>
      <div className="mb-4 w-full">
        <PostGallery postInfoList={results} />
      </div>
    </div>
  );
}
