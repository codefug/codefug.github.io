import type { Metadata } from "next";
import { CategoryPosts } from "@/components/postGallery/category-posts";
import { createAlternateLinks } from "@/components/seo/utils";
import { TAG_LIST } from "@/constants/categories";
import { PATH } from "@/constants/path";
import { getTranslations } from "@/lib/messages";
import { getFrontMatterList } from "@/lib/posts";
import { getPostsByTag } from "@/util/post";

/** 태그 이름은 그대로 노출하기엔 식별이 어려워(kkom-kkom 등) 표시명을 따로 찾는다. */
async function resolveTagLabel(tag: string): Promise<string> {
  const series = await getTranslations("series");
  const name = series.raw(`${tag}.name`);
  return typeof name === "string" ? name : tag;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const t = await getTranslations("categories");
  const label = await resolveTagLabel(tag);

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
  const label = await resolveTagLabel(tag);

  return <CategoryPosts tag={tag} label={label} posts={posts} />;
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
