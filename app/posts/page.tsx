import type { Metadata } from "next";
import { AllPosts } from "@/components/post-gallery/all-posts";
import { createAlternateLinks } from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { getFrontMatterList } from "@/lib/posts";

export function generateMetadata(): Metadata {
  return {
    title: "전체 글",
    description: "카테고리 구분 없이 모든 글을 최신순으로 봅니다.",
    alternates: createAlternateLinks(PATH.POSTS),
  };
}

export default function Page() {
  return <AllPosts frontMatterList={getFrontMatterList()} />;
}
