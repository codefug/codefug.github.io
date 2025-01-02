import { readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { readFileSync } from "fs";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { default: Post } = await import(`@/public/posts/${id}/content.mdx`);
  const Str = readFileSync(`public/posts/${id}/content.mdx`, "utf8");
  console.log(matter(Str).data);
  return <Post />;
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
