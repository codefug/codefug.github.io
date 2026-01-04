import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import grayMatter from "gray-matter";
import { cache } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

const postsDirectory = join(process.cwd(), "markdown");

const getFrontMatterList = (locale: Locale = defaultLocale) => {
  // 함수 내부에서 파일 시스템 작업 수행 (서버 사이드에서만 실행)
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
    .reverse(); // 최신순으로 정렬
};

/**
 * 모든 locale의 frontmatter를 가져오는 함수
 * 클라이언트에서 locale에 따라 필터링할 수 있도록 모든 locale의 데이터를 반환
 * React.cache로 메모이제이션하여 동일한 요청에서 중복 실행 방지
 */
export const getFrontMatterListForAllLocales = cache(
  (): Record<Locale, FrontMatter[]> => {
    const folderNames = readdirSync(postsDirectory);
    const result: Record<Locale, FrontMatter[]> = {
      ko: [],
      en: [],
    };

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
            // 파일이 없으면 스킵
            return null;
          }
        })
        .filter((item): item is FrontMatter => item !== null)
        .reverse(); // 최신순으로 정렬
    }

    return result;
  },
);

export default getFrontMatterList;
