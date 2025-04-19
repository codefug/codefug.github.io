import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import grayMatter from "gray-matter";
import { randomUUID } from "crypto";
import { FrontMatter } from "@/constants/mdx";

const postsDirectory = join(process.cwd(), "markdown");
const folderNames = readdirSync(postsDirectory);
const getFrontMatterList = () =>
  folderNames.map((folderName) => {
    const id = randomUUID();
    const fullPath = join(postsDirectory, folderName, "frontmatter.mdx");
    const fileContents = readFileSync(fullPath, "utf8");
    const matterResult = grayMatter(fileContents);

    return {
      id,
      ...matterResult.data,
    } as FrontMatter;
  });

export default getFrontMatterList;
