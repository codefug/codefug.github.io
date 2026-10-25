import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { compact, intersection, orderBy } from "es-toolkit";
import grayMatter from "gray-matter";
import { cache } from "react";
import readingTime from "reading-time";
import { z } from "zod";
import { TAG_LIST } from "@/constants/categories";
import { withSeriesOrder } from "@/lib/post-grouping";
import type { FrontMatter } from "@/types/post";

const postsDirectory = join(process.cwd(), "markdown");
const publicDirectory = join(process.cwd(), "public");
const LOCALE_DIR = "ko";

/** 초안을 쓰는 동안 dev 서버가 막히지 않도록, 아직 안 채웠을 수 있는 것은 빌드에서만 확인한다. */
const IS_BUILD = process.env.NODE_ENV === "production";

const text = z.string().trim().min(1);

const FrontMatterSchema = z.object({
  title: text,
  excerpt: text,
  // 정렬, RSS, 사이트맵의 기준이라 형식이 어긋나면 조용히 틀어진다.
  date: z.iso.date(),
  // TAG_LIST에 없는 태그는 오타이거나 등록을 빠뜨린 것이다.
  categories: z.array(z.enum(TAG_LIST)).min(1),
  header: z
    .object({ teaser: z.string().startsWith("/").optional() })
    .optional(),
  cover: z.string().optional(),
  coverFit: z.literal("contain").optional(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
});

/** 한글은 글자 하나를 한 단어로 센다. 속도는 기존 글자 수 기준 값과 비슷하게 나오도록 맞췄다. */
const WORDS_PER_MINUTE = 350;

function readMinutes(content: string): number {
  const { minutes } = readingTime(content, {
    wordsPerMinute: WORDS_PER_MINUTE,
  });
  return Math.max(1, Math.ceil(minutes));
}

function readCover(folderName: string, explicit?: string): string | undefined {
  if (explicit) return explicit;
  const path = `/images/${folderName}/cover.svg`;
  return existsSync(join(publicDirectory, path)) ? path : undefined;
}

/** 빌드가 통과해도 배포 뒤에야 드러나는 문제들. */
function findPublishProblems(post: FrontMatter): string[] {
  const problems: string[] = [];

  // 예약 발행 기능이 없으므로 미래 날짜는 언제나 실수다. CI(UTC)에서도 한국 날짜로 잰다.
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Seoul",
  });
  if (post.date > today) {
    problems.push(`date가 미래다. (${post.date}, 오늘: ${today})`);
  }

  // 목록 썸네일은 커버 그림만 쓰므로 없으면 빈 칸으로 나간다.
  if (!post.hidden && !post.cover) {
    problems.push(
      `커버 그림이 없다. public/images/${post.id}/cover.svg를 그리거나 cover를 지정한다.`,
    );
  }

  // teaser는 OG 이미지라 깨져도 공유하기 전까지 모른다.
  const teaser = post.header?.teaser;
  if (
    teaser &&
    !existsSync(join(publicDirectory, decodeURIComponent(teaser)))
  ) {
    problems.push(`header.teaser 파일이 public에 없다. (${teaser})`);
  }

  return problems;
}

/** 잘못된 글은 목록에서 조용히 빠지지 않도록 에러로 멈춘다. */
function readFrontMatter(folderName: string): FrontMatter | null {
  const dir = join(postsDirectory, folderName, LOCALE_DIR);
  const frontMatterPath = join(dir, "frontmatter.mdx");
  const contentPath = join(dir, "content.mdx");

  if (!existsSync(frontMatterPath)) return null;
  // 본문이 없으면 글 페이지만 404로 빠지고 목록에는 남는다.
  if (!existsSync(contentPath)) {
    throw new Error(
      `${folderName}: frontmatter.mdx는 있는데 content.mdx가 없다.`,
    );
  }

  const parsed = FrontMatterSchema.safeParse(
    grayMatter(readFileSync(frontMatterPath, "utf8")).data,
  );
  if (!parsed.success) {
    throw new Error(
      `${folderName}: frontmatter가 잘못됐다.\n${z.prettifyError(parsed.error)}`,
    );
  }

  const post: FrontMatter = {
    ...parsed.data,
    id: folderName,
    readingTime: readMinutes(
      grayMatter(readFileSync(contentPath, "utf8")).content,
    ),
    cover: readCover(folderName, parsed.data.cover),
  };

  const problems = IS_BUILD ? findPublishProblems(post) : [];
  if (problems.length > 0) {
    throw new Error(`${folderName}: ${problems.join(" ")}`);
  }
  return post;
}

/**
 * 최신 글이 앞에 온다. 목록, 검색, RSS, 사이트맵처럼 글을 보여주는 모든 경로는 이 목록을 쓴다.
 * 편 번호는 숨긴 글까지 센 뒤에 숨긴 글을 빼서, 중간 편을 숨겨도 뒤 글의 번호가 밀리지 않는다.
 */
export const getFrontMatterList = cache((): FrontMatter[] => {
  const all = compact(readdirSync(postsDirectory).map(readFrontMatter));
  return withSeriesOrder(all.reverse()).filter((post) => !post.hidden);
});

/** 숨긴 글은 페이지가 없으므로 찾지 않는다. */
export function getPostFrontMattersById(id: string): FrontMatter | undefined {
  return getFrontMatterList().find((post) => post.id === id);
}

/** 겹치는 카테고리가 많을수록 가깝다. */
export function getRelatedPosts(current: FrontMatter): FrontMatter[] {
  const score = (post: FrontMatter) =>
    intersection(post.categories, current.categories).length;
  const related = getFrontMatterList().filter(
    (post) => post.id !== current.id && score(post) > 0,
  );
  return orderBy(related, [score], ["desc"]).slice(0, 3);
}

/** 관련 포스트는 같은 카테고리가 없으면 비지만, 최신 글은 항상 채워진다. 목록이 이미 최신순이다. */
export function getRecentPosts(excludeIds: string[]): FrontMatter[] {
  return getFrontMatterList()
    .filter((post) => !excludeIds.includes(post.id))
    .slice(0, 6);
}

/** 목록이 최신순이라 배열 뒤쪽이 과거(previous)다. */
export function getAdjacentPosts(currentId: string) {
  const posts = getFrontMatterList();
  const index = posts.findIndex((post) => post.id === currentId);

  if (index === -1) return { previous: null, next: null };

  return {
    next: posts[index - 1] ?? null,
    previous: posts[index + 1] ?? null,
  };
}
