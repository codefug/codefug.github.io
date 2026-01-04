import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import grayMatter from "gray-matter";
import type { FrontMatter } from "@/constants/mdx";
import { defaultLocale } from "@/i18n/config";

const postsDirectory = join(process.cwd(), "markdown");
const folderNames = readdirSync(postsDirectory);
const getFrontMatterList = () =>
  folderNames
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

export default getFrontMatterList;
