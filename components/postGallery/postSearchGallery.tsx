"use client";

import { FrontMatter } from "@/constants/mdx";
import {
  FormEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import BlockHeader from "../ui/block-header";
import { Input } from "../ui/input";
import PostGallery from ".";

export default function PostSearchGallery({
  totalFrontMatterList,
}: {
  totalFrontMatterList: FrontMatter[];
}) {
  const [value, setValue] = useState("");
  const filteredFrontMatterList = useMemo(
    () => totalFrontMatterList.filter((v) => v.title.includes(value)),
    [value, totalFrontMatterList],
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler = useCallback((e) => {
    e.preventDefault();
    const searchValue = searchInputRef.current?.value;
    setValue(searchValue ?? "");
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-7 mt-4">
        <Input
          placeholder="검색어를 입력하세요"
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
  const isEmpty = useMemo(
    () => filteredFrontMatterList.length === 0,
    [filteredFrontMatterList],
  );
  const isNotSearchYet = useMemo(() => value === "", [value]);

  if (isNotSearchYet) return <div>검색으로 빠르게 확인하세요!</div>;

  if (isEmpty) return <div>검색 결과가 존재하지 않습니다.</div>;

  return (
    <BlockHeader title={`${value}에 대한 결과`}>
      <PostGallery postInfoList={filteredFrontMatterList} />
    </BlockHeader>
  );
}
