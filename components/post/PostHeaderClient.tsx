"use client";

import { useLocale } from "next-intl";
import { useLayoutEffect, useState } from "react";
import type { ParsedFrontMatter } from "@/constants/mdx";
import type { Locale } from "@/i18n/config";
import { PostHeaderContent } from "./PostHeaderContent";
import { PostHeaderSkeleton } from "./PostHeaderSkeleton";

type Props = {
  frontMatters: Record<Locale, ParsedFrontMatter>;
};

export function PostHeaderClient({ frontMatters }: Props) {
  const locale = useLocale() as Locale;
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  // locale이 로드되기 전까지 스켈레톤 표시
  if (!isMounted) {
    return <PostHeaderSkeleton />;
  }

  const frontMatter = frontMatters[locale] || frontMatters.ko;

  return <PostHeaderContent frontMatter={frontMatter} />;
}
