import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPosts } from "@/components/postGallery/category-posts";
import { createAlternateLinks } from "@/components/seo/utils";
import {
  fromGroupSlug,
  GROUPS_WITH_PAGE,
  toGroupSlug,
} from "@/constants/categories";
import { PATH } from "@/constants/path";
import { getTranslations } from "@/lib/messages";
import { getFrontMatterList } from "@/lib/posts";
import { getPostsByGroup } from "@/util/post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ groupId: string }>;
}): Promise<Metadata> {
  const { groupId: slug } = await params;
  const groupId = fromGroupSlug(slug);
  const t = await getTranslations("categories");

  if (!groupId) return {};

  return {
    title: t(`${groupId}.label`),
    description: t(`${groupId}.description`),
    alternates: createAlternateLinks(`${PATH.GROUPS}/${slug}`),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId: slug } = await params;
  const groupId = fromGroupSlug(slug);
  if (!groupId) notFound();

  const t = await getTranslations("categories");
  const posts = getPostsByGroup(getFrontMatterList(), groupId);

  return (
    <CategoryPosts
      scope={`group-${groupId}`}
      label={t(`${groupId}.label`)}
      description={t(`${groupId}.description`)}
      posts={posts}
    />
  );
}

export function generateStaticParams() {
  // 글이 한 편도 없는 그룹은 빈 페이지가 되므로 만들지 않는다.
  const posts = getFrontMatterList();
  return GROUPS_WITH_PAGE.filter(
    (groupId) => getPostsByGroup(posts, groupId).length > 0,
  ).map((groupId) => ({ groupId: toGroupSlug(groupId) }));
}

export const dynamicParams = false;
