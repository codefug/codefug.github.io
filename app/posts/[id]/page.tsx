import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { GtmPageView } from "@/components/gtm/gtmPageView";
import { PostContent } from "@/components/post/PostContent";
import { PostHeaderClient } from "@/components/post/PostHeaderClient";
import PostNotFound from "@/components/post/PostNotFound";
import MenuBar from "@/components/postMenuBar/menu-bar";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createBlogPostStructuredData,
} from "@/components/seo/utils";
import type { ParsedFrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import type { Locale } from "@/i18n/config";
import { defaultLocale, locales } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    alternates: createAlternateLinks(`${PATH.POSTS}/${id}`),
  };
}

async function getFrontMatterForAllLocales(id: string) {
  const frontMatters: Record<Locale, ParsedFrontMatter> = {} as Record<
    Locale,
    ParsedFrontMatter
  >;

  for (const locale of locales) {
    const mdxFilePath = path.join(
      process.cwd(),
      "markdown",
      id,
      locale,
      "frontmatter.mdx",
    );
    try {
      const fileContent = await readFile(mdxFilePath, "utf8");
      const { data } = matter(fileContent);
      frontMatters[locale] = data as ParsedFrontMatter;
    } catch {
      // If file doesn't exist for this locale, skip
    }
  }

  return frontMatters;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 모든 locale의 frontmatter를 읽어옴
  const frontMatters = await getFrontMatterForAllLocales(id);

  // 기본 locale의 frontmatter가 없으면 404
  if (!frontMatters[defaultLocale]) {
    return <PostNotFound />;
  }

  // 기본 locale의 frontmatter를 사용 (SEO용)
  const frontMatterData = frontMatters[defaultLocale];
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
      <PostHeaderClient frontMatters={frontMatters} />
      <section className="lg:flex lg:items-baseline">
        <MenuBar />
        <section className="max-w-full">
          <PostContent postId={id} />
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
