import { readdir, readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import PostHeader from "@/components/ui/post-header";
import MenuBar from "@/components/postMenuBar/menu-bar";
import { ParsedFrontMatter } from "@/constants/mdx";
import { mdxMap } from "@/lib/mdxMap";

export default async function Page({ params }: { params: { id: string } }) {
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
      <PostHeader {...(data as ParsedFrontMatter)} />
      <section className="lg:flex lg:items-baseline">
        <MenuBar id={id} />
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
