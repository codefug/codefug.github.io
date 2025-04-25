import getFrontMatterList from "@/lib/posts";
import { MetadataRoute } from "next";

const BASE_URL = "https://codefug.github.io";

const postFrontMatter = getFrontMatterList();
const postSiteMap: MetadataRoute.Sitemap = postFrontMatter.map((post) => {
  return {
    url: `${BASE_URL}/posts/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "daily",
    priority: 0.7,
  };
});

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...postSiteMap,
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/search `,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
