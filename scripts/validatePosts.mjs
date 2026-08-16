/**
 * 글 메타데이터 검증.
 *
 * 정적 블로그가 조용히 깨지는 지점은 빌드 실패가 아니라 "발행됐는데 잘못된 글"이다.
 * 프론트매터에 title이 없으면 목록 카드가 빈칸으로 나가고, date 형식이 틀리면
 * 정렬과 RSS pubDate가 어긋나고, teaser 경로가 없으면 OG 카드 이미지가 깨진다.
 * 셋 다 빌드는 성공하므로 배포된 뒤에야 눈에 띈다. 그래서 빌드 전에 막는다.
 *
 * 빌드를 실패시키는 것(error)과 알리기만 하는 것(warning)을 구분한다.
 * 글이 잘못 나가는 문제는 error, 사람이 판단할 문제는 warning이다.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import grayMatter from "gray-matter";

const MARKDOWN_DIR = join(process.cwd(), "markdown");
const PUBLIC_DIR = join(process.cwd(), "public");
const LOCALE = "ko";

/** 오늘 날짜(YYYY-MM-DD)를 한국 시간 기준으로 돌려준다. */
export function todayInSeoul() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
}

/** constants/categories.ts의 TAG_LIST를 소스로 삼는다. 값만 필요하므로 정규식으로 뽑는다. */
export function readKnownTags() {
  const source = readFileSync(
    join(process.cwd(), "constants", "categories.ts"),
    "utf8",
  );
  const tagListBlock = source.match(/export const TAG_LIST = \{([\s\S]*?)\}/);
  if (!tagListBlock) return null;
  return new Set(
    [...tagListBlock[1].matchAll(/:\s*"([^"]+)"/g)].map((m) => m[1]),
  );
}

/** markdown 디렉토리에서 ko 프론트매터가 있는 폴더 목록을 가져온다. */
export function findPostFolders() {
  return readdirSync(MARKDOWN_DIR).filter((folder) =>
    existsSync(join(MARKDOWN_DIR, folder, LOCALE, "frontmatter.mdx")),
  );
}

/**
 * 폴더 하나를 검증해 { errors, warnings }를 반환한다.
 * knownTags가 없으면(카테고리 파일을 못 읽으면) 카테고리 검증은 건너뛴다.
 */
export function validatePostFolder(folder, knownTags) {
  const errors = [];
  const warnings = [];

  const dir = join(MARKDOWN_DIR, folder, LOCALE);
  const frontMatterPath = join(dir, "frontmatter.mdx");
  const where = folder;

  // 프론트매터만 있고 본문이 없으면 글 상세가 빈 페이지로 나간다.
  if (!existsSync(join(dir, "content.mdx"))) {
    errors.push(`${where}: frontmatter.mdx는 있는데 content.mdx가 없다.`);
  }

  let data;
  try {
    ({ data } = grayMatter(readFileSync(frontMatterPath, "utf8")));
  } catch (error) {
    errors.push(`${where}: 프론트매터를 파싱하지 못했다. (${error.message})`);
    return { errors, warnings };
  }

  for (const field of ["title", "excerpt", "date"]) {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(`${where}: '${field}'가 비어 있거나 문자열이 아니다.`);
    }
  }

  // 날짜는 정렬·RSS pubDate·사이트맵 lastModified의 기준이라 형식이 어긋나면 조용히 틀어진다.
  if (typeof data.date === "string") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
      errors.push(
        `${where}: 'date'는 YYYY-MM-DD 형식이어야 한다. (받은 값: ${data.date})`,
      );
    } else if (Number.isNaN(new Date(data.date).getTime())) {
      errors.push(`${where}: 'date'가 실재하지 않는 날짜다. (${data.date})`);
    } else if (data.date > todayInSeoul()) {
      // 예약 발행 기능이 없으므로 미래 날짜는 언제나 실수다.
      // CI(UTC)에서 한국 새벽 빌드가 어제로 판정되지 않도록 KST 기준으로 잰다.
      errors.push(
        `${where}: 'date'가 미래다. (${data.date}, 오늘: ${todayInSeoul()})`,
      );
    }
  }

  if (!Array.isArray(data.categories) || data.categories.length === 0) {
    errors.push(`${where}: 'categories'는 비어 있지 않은 배열이어야 한다.`);
  } else if (knownTags) {
    // 그룹에 없는 태그는 빌드를 막을 일은 아니지만 홈에서 'etc'로 조용히 흘러간다.
    for (const category of data.categories) {
      if (!knownTags.has(category)) {
        warnings.push(
          `${where}: '${category}'는 TAG_LIST에 없다. 홈에서 etc로 분류된다.`,
        );
      }
    }
  }

  // teaser는 OG 태그 전용이라 화면에는 안 보인다. 깨져도 공유하기 전까지 모른다.
  const teaser = data.header?.teaser;
  if (teaser === undefined) {
    warnings.push(`${where}: 'header.teaser'가 없어 OG 이미지가 비어 있다.`);
  } else if (typeof teaser !== "string" || !teaser.startsWith("/")) {
    errors.push(
      `${where}: 'header.teaser'는 '/'로 시작하는 경로여야 한다. (받은 값: ${teaser})`,
    );
  } else if (!existsSync(join(PUBLIC_DIR, teaser))) {
    errors.push(`${where}: 'header.teaser' 파일이 public에 없다. (${teaser})`);
  }

  if (data.hidden !== undefined && typeof data.hidden !== "boolean") {
    errors.push(`${where}: 'hidden'은 true/false여야 한다.`);
  }

  return { errors, warnings };
}

/** 전체 글을 검증해 { errors, warnings, folders }를 반환한다. */
export function validateAllPosts() {
  const errors = [];
  const warnings = [];

  const knownTags = readKnownTags();
  if (!knownTags) {
    warnings.push(
      "constants/categories.ts에서 TAG_LIST를 읽지 못했다. 카테고리 검증을 건너뛴다.",
    );
  }

  const folders = findPostFolders();

  for (const folder of folders) {
    const result = validatePostFolder(folder, knownTags);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  return { errors, warnings, folders };
}

function main() {
  const { errors, warnings, folders } = validateAllPosts();

  for (const warning of warnings) console.warn(`⚠️  ${warning}`);
  for (const error of errors) console.error(`❌ ${error}`);

  if (errors.length > 0) {
    console.error(
      `\n글 검증 실패: ${folders.length}개 글에서 오류 ${errors.length}건.`,
    );
    process.exit(1);
  }

  console.log(
    `✅ 글 검증 통과: ${folders.length}개 글${warnings.length ? `, 경고 ${warnings.length}건` : ""}.`,
  );
}

const isDirectRun =
  process.argv[1] && import.meta.url === `file://${process.argv[1]}`;

if (isDirectRun) {
  main();
}
