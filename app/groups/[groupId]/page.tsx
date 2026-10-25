import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPosts } from "@/components/post-gallery/category-posts";
import { createAlternateLinks } from "@/components/seo/utils";
import {
  fromGroupSlug,
  GROUPS_WITH_PAGE,
  getGroup,
  toGroupSlug,
} from "@/constants/categories";
import { PATH } from "@/constants/path";
import { getPostsByGroup } from "@/lib/post-grouping";
import { getFrontMatterList } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ groupId: string }>;
}): Promise<Metadata> {
  const { groupId: slug } = await params;
  const groupId = fromGroupSlug(slug);

  if (!groupId) return {};
  const group = getGroup(groupId);

  return {
    title: group.label,
    description: group.description,
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

  const group = getGroup(groupId);
  const posts = getPostsByGroup(getFrontMatterList(), groupId);

  return (
    <CategoryPosts
      scope={`group-${groupId}`}
      label={group.label}
      description={group.description}
      posts={posts}
    />
  );
}

export function generateStaticParams() {
  const posts = getFrontMatterList();
  return GROUPS_WITH_PAGE.filter(
    (groupId) => getPostsByGroup(posts, groupId).length > 0,
  ).map((groupId) => ({ groupId: toGroupSlug(groupId) }));
}

export const dynamicParams = false;
