"use client";

import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FrontMatter } from "@/constants/mdx";
import BlockHeader from "../ui/block-header";
import { Input } from "../ui/input";
import PostGallery from ".";

export default function PostSearchGallery({
  totalFrontMatterList,
}: {
  totalFrontMatterList: FrontMatter[];
}) {
  const t = useTranslations("search");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const regexValue = useMemo(() => {
    try {
      return new RegExp(debouncedQuery, "i");
    } catch {
      return /(?:)/;
    }
  }, [debouncedQuery]);

  const filteredFrontMatterList = useMemo(
    () =>
      totalFrontMatterList.filter((v) => {
        if (!debouncedQuery.trim()) return false;
        return regexValue.test(v.title);
      }),
    [debouncedQuery, totalFrontMatterList, regexValue],
  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="mt-4 mb-7">
        <Input
          placeholder={t("placeholder")}
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 md:h-16 md:text-xl"
        />
      </form>
      <PostSearchBarResult
        query={debouncedQuery}
        filteredFrontMatterList={filteredFrontMatterList}
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
