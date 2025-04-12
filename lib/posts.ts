import { FrontMatter } from "@/constants/mdx";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import grayMatter from "gray-matter";

const postsDirectory = join(process.cwd(), "markdown");
const folderNames = readdirSync(postsDirectory);
export const getFrontMatterList = () =>
  folderNames.map((folderName) => {
    const fullPath = join(postsDirectory, folderName, "frontmatter.mdx");
    const fileContents = readFileSync(fullPath, "utf8");
    const matterResult = grayMatter(fileContents);

    return {
      id: folderName,
      ...(matterResult.data as FrontMatter),
    };
  });
