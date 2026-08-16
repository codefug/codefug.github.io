import type { MetadataRoute } from "next";
import { PATH } from "@/constants/path";
import { SITE_URL as BASE_URL } from "@/constants/site";
import getFrontMatterList from "@/lib/posts";
import { buildSeriesSummaries } from "@/util/post";

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
      url: `${BASE_URL}${PATH.PORTFOLIO}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
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

  return [...postSiteMap, ...seriesSiteMap, ...basePages];
}
