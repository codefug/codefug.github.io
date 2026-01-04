"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { mdxMap } from "@/lib/mdxMap";

type Props = {
  postId: string;
};

export function PostContent({ postId }: Props) {
  const locale = useLocale() as Locale;
  const mdxModule = mdxMap[locale]?.[postId];

  if (!mdxModule) {
    return null;
  }

  const Content = mdxModule.default;
  return <Content />;
}
