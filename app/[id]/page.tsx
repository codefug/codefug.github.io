import PostHeader from "@/components/ui/post-header";
import { readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { FrontMatter } from "@/constants/mdx";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { default: Post, frontmatter } = await import(
    `@/public/posts/${id}/content.mdx`
  );
  const { data } = matter(frontmatter);
  return (
    <section>
      <PostHeader {...(data as FrontMatter)} />
      <Post />
    </section>
  );
}

export async function generateStaticParams() {
  const posts = path.join("public/posts");
  const directories = await readdir(posts);
  const paths = directories.map((id) => ({
    id,
  }));
  return paths;
}

export const dynamicParams = false;
