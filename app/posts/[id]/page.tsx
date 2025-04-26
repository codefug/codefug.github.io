import { GtmPageView } from "@/components/gtm/gtmPageView";
import MenuBar from "@/components/postMenuBar/menu-bar";
import PostHeader from "@/components/ui/post-header";
import { ParsedFrontMatter } from "@/constants/mdx";
import { mdxMap } from "@/lib/mdxMap";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const mdxFilePath = path.join(
    process.cwd(),
    "markdown",
    id,
    "frontmatter.mdx",
  );
  const fileContent = await readFile(mdxFilePath, "utf8");
  const { data } = matter(fileContent);

  const mdxModule = mdxMap[id];
  if (!mdxModule) return <div>해당 포스트를 찾을 수 없습니다.</div>;
  const Content = mdxModule.default;
  return (
    <section>
      <GtmPageView slug={id} />
      <PostHeader {...(data as ParsedFrontMatter)} />
      <section className="lg:flex lg:items-baseline">
        <MenuBar />
        <section className="max-w-full">
          <Content />
        </section>
      </section>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = path.join(process.cwd(), "markdown");
  const directories = await readdir(posts);
  const paths = directories.map((id) => ({
    id,
  }));
  return paths;
}

export const dynamicParams = false;
