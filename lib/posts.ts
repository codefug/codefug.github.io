import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "public", "posts");
const POSTS_PER_PAGE = 6;

export function getAllPosts() {
  const folderNames = fs.readdirSync(POSTS_DIR); // ['my-first-post', 'second-post', ...]

  const posts = folderNames.map((folder) => {
    const mdxPath = path.join(POSTS_DIR, folder, "content.mdx");
    const fileContents = fs.readFileSync(mdxPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: folder, // 폴더명을 슬러그로 사용
      ...(data as { title: string; date: string; description: string }),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPaginatedPosts(page: number) {
  const allPosts = getAllPosts();
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return {
    posts: allPosts.slice(start, end),
    totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
  };
}
