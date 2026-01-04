"use client";

import { useTranslations } from "next-intl";
import {
  type FormEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const [value, setValue] = useState("");
  const regexValue = useMemo(() => new RegExp(value, "i"), [value]);
  const filteredFrontMatterList = useMemo(
    () =>
      totalFrontMatterList.filter((v) => {
        if (!value.trim()) return false;
        return regexValue.test(v.title);
      }),
    [value, totalFrontMatterList, regexValue],
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler = useCallback((e) => {
    e.preventDefault();
    const searchValue = searchInputRef.current?.value || "";
    setValue(searchValue);
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4 mb-7">
        <Input
          placeholder={t("placeholder")}
          ref={searchInputRef}
          className="h-9 md:h-16 md:text-xl"
        />
      </form>
      <PostSearchBarResult
        value={value}
        filteredFrontMatterList={filteredFrontMatterList}
      />
    </div>
  );
}

function PostSearchBarResult({
  value,
  filteredFrontMatterList,
}: {
  value: string;
  filteredFrontMatterList: FrontMatter[];
}) {
  const t = useTranslations("search");
  const isEmpty = useMemo(
    () => filteredFrontMatterList.length === 0,
    [filteredFrontMatterList],
  );
  const isNotSearchYet = useMemo(() => value === "", [value]);

  if (isNotSearchYet) return <div>{t("noSearchYet")}</div>;

  if (isEmpty) return <div>{t("noResults")}</div>;

  return (
    <BlockHeader title={t("resultsFor", { query: value })}>
      <PostGallery postInfoList={filteredFrontMatterList} />
    </BlockHeader>
  );
}
