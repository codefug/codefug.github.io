import { uniq } from "es-toolkit";
import type { Metadata } from "next";
import { CategoryPosts } from "@/components/post-gallery/category-posts";
import { createAlternateLinks } from "@/components/seo/utils";
import { resolveTagLabel } from "@/constants/categories";
import { PATH } from "@/constants/path";
import { getPostsByTag } from "@/lib/post-grouping";
import { getFrontMatterList } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const label = resolveTagLabel(tag);

  return {
    title: `${label} 글`,
    description: `${label} 카테고리의 글 목록입니다.`,
    alternates: createAlternateLinks(`${PATH.CATEGORIES}/${tag}`),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(getFrontMatterList(), tag);
  const label = resolveTagLabel(tag);

  return (
    <CategoryPosts scope={`category-${tag}`} label={label} posts={posts} />
  );
}

/** 글에 실제로 붙은 태그마다 페이지를 만든다. TAG_LIST에 없는 태그도 빠지지 않는다. */
export function generateStaticParams() {
  return uniq(getFrontMatterList().flatMap((post) => post.categories)).map(
    (tag) => ({ tag }),
  );
}

export const dynamicParams = false;
