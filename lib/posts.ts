import { readdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import grayMatter from "gray-matter";
import { cache } from "react";
import type { FrontMatter, ParsedFrontMatter } from "@/constants/mdx";
import { defaultLocale, type Locale, locales } from "@/i18n/config";
import { getReadingTime } from "@/util/reading-time";

const postsDirectory = join(process.cwd(), "markdown");

/**
 * 목록 카드는 썸네일 대신 읽는 시간을 보여주므로,
 * 프론트매터를 읽을 때 본문 기준 읽는 시간을 함께 계산해 둔다.
 */
function readReadingTime(
  folderName: string,
  locale: Locale,
): number | undefined {
  try {
    const contentPath = join(postsDirectory, folderName, locale, "content.mdx");
    const { content } = grayMatter(readFileSync(contentPath, "utf8"));
    return getReadingTime(content, locale);
  } catch {
    return undefined;
  }
}

function readFrontMatter(
  folderName: string,
  locale: Locale,
): FrontMatter | null {
  const fullPath = join(postsDirectory, folderName, locale, "frontmatter.mdx");
  try {
    const fileContents = readFileSync(fullPath, "utf8");
    const matterResult = grayMatter(fileContents);
    return {
      id: folderName,
      ...(matterResult.data as Omit<FrontMatter, "id">),
      readingTime: readReadingTime(folderName, locale),
    };
  } catch {
    return null;
  }
}

/**
 * 숨김 처리된 글을 제외한다.
 * 목록·검색·RSS·사이트맵 등 "글을 보여주는" 모든 경로는 이 필터를 거쳐야 한다.
 */
export function excludeHidden(postList: FrontMatter[]): FrontMatter[] {
  return postList.filter((post) => !post.hidden);
}

/**
 * 모든 로케일의 프론트매터 목록. 최신 글이 앞에 온다.
 * 숨김 글은 제외된다. (숨김 글까지 필요하면 getAllFrontMatterListIncludingHidden 사용)
 */
export const getFrontMatterListForAllLocales = cache(
  (): Record<Locale, FrontMatter[]> => {
    const all = getAllFrontMatterListIncludingHidden();
    return {
      ko: excludeHidden(all.ko),
      en: excludeHidden(all.en),
    };
  },
);

/**
 * 숨김 글을 포함한 전체 목록.
 * 정적 경로 생성(generateStaticParams)처럼 숨김 글도 빌드되어야 하는 곳에서만 쓴다.
 */
export const getAllFrontMatterListIncludingHidden = cache(
  (): Record<Locale, FrontMatter[]> => {
    const folderNames = readdirSync(postsDirectory);
    const result: Record<Locale, FrontMatter[]> = { ko: [], en: [] };

    for (const locale of locales) {
      result[locale] = folderNames
        .map((folderName) => readFrontMatter(folderName, locale))
        .filter((item): item is FrontMatter => item !== null)
        .reverse();
    }

    return result;
  },
);

const getFrontMatterList = (locale: Locale = defaultLocale) =>
  getFrontMatterListForAllLocales()[locale];

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
        id,
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

export type AdjacentPosts = {
  previous: FrontMatter | null;
  next: FrontMatter | null;
};

/**
 * 시간 순서상 이전/다음 글.
 * 목록은 최신순이므로 배열 뒤쪽이 과거(previous), 앞쪽이 미래(next)다.
 * 숨김 글은 건너뛴다.
 */
export function getAdjacentPosts(
  currentId: string,
  locale: Locale = defaultLocale,
): AdjacentPosts {
  const posts = getFrontMatterListForAllLocales()[locale];
  const index = posts.findIndex((post) => post.id === currentId);

  if (index === -1) return { previous: null, next: null };

  return {
    next: posts[index - 1] ?? null,
    previous: posts[index + 1] ?? null,
  };
}

export function isHiddenPost(id: string): boolean {
  const all = getAllFrontMatterListIncludingHidden()[defaultLocale];
  return all.find((post) => post.id === id)?.hidden === true;
}

export default getFrontMatterList;
