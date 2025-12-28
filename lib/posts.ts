import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import grayMatter from "gray-matter";
import type { FrontMatter } from "@/constants/mdx";

const postsDirectory = join(process.cwd(), "markdown");
const folderNames = readdirSync(postsDirectory);
const getFrontMatterList = () =>
  folderNames
    .map((folderName) => {
      const fullPath = join(postsDirectory, folderName, "frontmatter.mdx");
      const fileContents = readFileSync(fullPath, "utf8");
      const matterResult = grayMatter(fileContents);

      return {
        id: folderName,
        ...(matterResult.data as Omit<FrontMatter, "id">),
      };
    })
    .reverse(); // 최신순으로 정렬

export default getFrontMatterList;
