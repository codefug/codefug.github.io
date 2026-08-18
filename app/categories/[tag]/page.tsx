import type { Metadata } from "next";
import { CategoryPosts } from "@/components/postGallery/category-posts";
import { createAlternateLinks } from "@/components/seo/utils";
import { TAG_LIST } from "@/constants/categories";
import { PATH } from "@/constants/path";
import { getTranslations } from "@/lib/messages";
import { getFrontMatterList } from "@/lib/posts";
import { getPostsByTag } from "@/util/post";
import { resolveTagLabel } from "@/util/tag-label";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const t = await getTranslations("categories");
  const label = resolveTagLabel(tag);

  return {
    title: t("pageTitle", { category: label }),
    description: t("pageDescription", { category: label }),
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

export function generateStaticParams() {
  const posts = getFrontMatterList();
  // 태그 목록을 원천으로 두되, 글이 없는 태그는 페이지를 만들지 않는다.
  // 정의되지 않은 태그가 글에 붙어도 누락되지 않도록 실제 사용된 태그까지 합친다.
  const used = new Set(posts.flatMap((post) => post.categories));
  const known = Object.values(TAG_LIST) as string[];
  return [...new Set([...known, ...used])]
    .filter((tag) => used.has(tag))
    .map((tag) => ({ tag }));
}

export const dynamicParams = false;
