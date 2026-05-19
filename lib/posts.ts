import { readdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import grayMatter from "gray-matter";
import { cache } from "react";
import type { FrontMatter, ParsedFrontMatter } from "@/constants/mdx";
import { defaultLocale, type Locale, locales } from "@/i18n/config";
import { getReadingTime } from "@/util/reading-time";

const postsDirectory = join(process.cwd(), "markdown");

const getFrontMatterList = (locale: Locale = defaultLocale) => {
  const folderNames = readdirSync(postsDirectory);
  return folderNames
    .map((folderName) => {
      const fullPath = join(
        postsDirectory,
        folderName,
        locale,
        "frontmatter.mdx",
      );
      const fileContents = readFileSync(fullPath, "utf8");
      const matterResult = grayMatter(fileContents);

      return {
        id: folderName,
        ...(matterResult.data as Omit<FrontMatter, "id">),
      };
    })
    .reverse();
};

export const getFrontMatterListForAllLocales = cache(
  (): Record<Locale, FrontMatter[]> => {
    const folderNames = readdirSync(postsDirectory);
    const result: Record<Locale, FrontMatter[]> = { ko: [], en: [] };

    for (const locale of locales) {
      result[locale] = folderNames
        .map((folderName) => {
          const fullPath = join(
            postsDirectory,
            folderName,
            locale,
            "frontmatter.mdx",
          );
          try {
            const fileContents = readFileSync(fullPath, "utf8");
            const matterResult = grayMatter(fileContents);
            return {
              id: folderName,
              ...(matterResult.data as Omit<FrontMatter, "id">),
            };
          } catch {
            return null;
          }
        })
        .filter((item): item is FrontMatter => item !== null)
        .reverse();
    }

    return result;
  },
);

export async function getPostFrontMattersByIdForAllLocales(
  id: string,
): Promise<Record<Locale, ParsedFrontMatter>> {
  const frontMatters = {} as Record<Locale, ParsedFrontMatter>;

  for (const locale of locales) {
    const frontMatterPath = join(postsDirectory, id, locale, "frontmatter.mdx");
    const contentPath = join(postsDirectory, id, locale, "content.mdx");
    try {
      const [frontMatterFile, contentFile] = await Promise.all([
        readFile(frontMatterPath, "utf8"),
        readFile(contentPath, "utf8"),
      ]);
      const { data } = grayMatter(frontMatterFile);
      const { content } = grayMatter(contentFile);
      frontMatters[locale] = {
        ...(data as ParsedFrontMatter),
        readingTime: getReadingTime(content, locale),
      };
    } catch {
      // skip missing locales
    }
  }

  return frontMatters;
}

function scoreByCategories(
  post: FrontMatter,
  targetCategories: string[],
): number {
  return post.categories.filter((c) => targetCategories.includes(c)).length;
}

export function getRelatedPosts(
  currentId: string,
  categories: string[],
  count = 3,
): FrontMatter[] {
  const allPosts = getFrontMatterListForAllLocales()[defaultLocale];
  return allPosts
    .filter((post) => post.id !== currentId)
    .map((post) => ({ post, score: scoreByCategories(post, categories) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ post }) => post);
}

export default getFrontMatterList;
