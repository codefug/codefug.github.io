import type { MetadataRoute } from "next";
import { GROUPS_WITH_PAGE, toGroupSlug } from "@/constants/categories";
import { PATH } from "@/constants/path";
import { SITE_URL as BASE_URL } from "@/constants/site";
import getFrontMatterList from "@/lib/posts";
import { buildSeriesSummaries, getPostsByGroup } from "@/util/post";

const postFrontMatter = getFrontMatterList();
const postSiteMap: MetadataRoute.Sitemap = postFrontMatter.map((post) => {
  return {
    url: `${BASE_URL}${PATH.POSTS}/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  };
});

const seriesSiteMap: MetadataRoute.Sitemap = buildSeriesSummaries(
  postFrontMatter,
).map(({ slug, endDate }) => ({
  url: `${BASE_URL}${PATH.SERIES}/${slug}`,
  lastModified: new Date(endDate),
  changeFrequency: "monthly",
  priority: 0.8,
}));

// 글이 없는 그룹은 페이지가 만들어지지 않으므로 사이트맵에서도 뺀다.
const groupSiteMap: MetadataRoute.Sitemap = GROUPS_WITH_PAGE.filter(
  (groupId) => getPostsByGroup(postFrontMatter, groupId).length > 0,
).map((groupId) => ({
  url: `${BASE_URL}${PATH.GROUPS}/${toGroupSlug(groupId)}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.7,
}));

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}${PATH.POSTS}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}${PATH.SERIES}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}${PATH.RESUME}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}${PATH.SEARCH}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [...postSiteMap, ...seriesSiteMap, ...groupSiteMap, ...basePages];
}
