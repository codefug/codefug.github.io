import type { MetadataRoute } from "next";
import { PATH } from "@/constants/path";
import { locales } from "@/i18n/config";
import getFrontMatterList from "@/lib/posts";

const BASE_URL = "https://codefug.github.io";

const postFrontMatter = getFrontMatterList();
const postSiteMap: MetadataRoute.Sitemap = postFrontMatter.map((post) => {
  return {
    url: `${BASE_URL}${PATH.POSTS}/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "daily",
    priority: 0.7,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [
          locale === "ko" ? "ko-KR" : "en-US",
          `${BASE_URL}${PATH.POSTS}/${post.id}`,
        ]),
      ),
    },
  };
});

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [
            locale === "ko" ? "ko-KR" : "en-US",
            BASE_URL,
          ]),
        ),
      },
    },
    {
      url: `${BASE_URL}${PATH.PORTFOLIO}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [
            locale === "ko" ? "ko-KR" : "en-US",
            `${BASE_URL}${PATH.PORTFOLIO}`,
          ]),
        ),
      },
    },
    {
      url: `${BASE_URL}${PATH.SEARCH}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [
            locale === "ko" ? "ko-KR" : "en-US",
            `${BASE_URL}${PATH.SEARCH}`,
          ]),
        ),
      },
    },
  ];

  return [...postSiteMap, ...basePages];
}
