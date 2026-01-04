"use client";

import { useLocale } from "next-intl";
import { useLayoutEffect } from "react";
import type { Locale } from "@/i18n/config";
import { mdxMap } from "@/lib/mdxMap";
import { usePostContentStore } from "@/store/use-post-content-store";
import { PostContentSkeleton } from "./PostContentSkeleton";

type Props = {
  postId: string;
};

export function PostContent({ postId }: Props) {
  const locale = useLocale() as Locale;
  const { isMounted, setIsMounted } = usePostContentStore();

  useLayoutEffect(() => {
    setIsMounted(true);

    // 컴포넌트 언마운트 시 상태 초기화
    return () => {
      setIsMounted(false);
    };
  }, [setIsMounted]);

  // locale이 로드되기 전까지 스켈레톤 표시
  if (!isMounted) {
    return <PostContentSkeleton />;
  }

  const mdxModule = mdxMap[locale]?.[postId];
  if (!mdxModule) {
    return null;
  }

  const Content = mdxModule.default;
  return <Content />;
}
