import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import grayMatter from "gray-matter";
import type { FrontMatter } from "@/constants/mdx";
import { defaultLocale } from "@/i18n/config";

const postsDirectory = join(process.cwd(), "markdown");

const getFrontMatterList = () => {
  // 함수 내부에서 파일 시스템 작업 수행 (서버 사이드에서만 실행)
  const folderNames = readdirSync(postsDirectory);
  return folderNames
    .map((folderName) => {
      // SSG 모드에서는 항상 한국어(기본 locale) 사용
      const locale = defaultLocale;
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

export default getFrontMatterList;
