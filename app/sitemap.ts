import type { MetadataRoute } from "next";
import { PATH } from "@/constants/path";
import getFrontMatterList from "@/lib/posts";

const BASE_URL = "https://codefug.github.io";

const postFrontMatter = getFrontMatterList();
const postSiteMap: MetadataRoute.Sitemap = postFrontMatter.map((post) => {
  return {
    url: `${BASE_URL}${PATH.POSTS}/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  };
});

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
      priority: 0.8,
    },
    {
      url: `${BASE_URL}${PATH.SEARCH}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [...postSiteMap, ...basePages];
}
