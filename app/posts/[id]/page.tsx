import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { GtmPageView } from "@/components/gtm/gtmPageView";
import PostNotFound from "@/components/post/PostNotFound";
import MenuBar from "@/components/postMenuBar/menu-bar";
import { StructuredData } from "@/components/seo/StructuredData";
import { createBlogPostStructuredData } from "@/components/seo/utils";
import PostHeader from "@/components/ui/post-header";
import type { ParsedFrontMatter } from "@/constants/mdx";
import { defaultLocale } from "@/i18n/config";
import { mdxMap } from "@/lib/mdxMap";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // SSG 모드에서는 항상 한국어(기본 locale) 사용
  const locale = defaultLocale;

  const mdxFilePath = path.join(
    process.cwd(),
    "markdown",
    id,
    locale,
    "frontmatter.mdx",
  );
  const fileContent = await readFile(mdxFilePath, "utf8");
  const { data } = matter(fileContent);

  const mdxModule = mdxMap[id];
  if (!mdxModule) return <PostNotFound />;
  const Content = mdxModule.default;

  const frontMatterData = data as ParsedFrontMatter;
  const structuredData = createBlogPostStructuredData({
    id,
    title: frontMatterData.title,
    excerpt: frontMatterData.excerpt,
    date: frontMatterData.date,
    thumbnailImageUrl: frontMatterData.header?.teaser,
  });

  return (
    <section>
      <GtmPageView slug={id} />
      <StructuredData jsonLd={structuredData} />
      <PostHeader {...frontMatterData} />
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
