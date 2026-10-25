export const PATH = {
  HOME: "/",
  POSTS: "/posts",
  SERIES: "/series",
  CATEGORIES: "/categories",
  GROUPS: "/groups",
  RESUME: "/resume",
  CAREER: "/career",
  SEARCH: "/search",
} as const;

/** 인쇄가 주 용도인 이력서와 경력기술서 경로. */
const PRINT_PATHS = [PATH.RESUME, PATH.CAREER];

/** 사이드바와 그 토글 버튼을 함께 숨긴다. */
export function isSidebarOffPath(pathname: string): boolean {
  return matchesAny(PRINT_PATHS, pathname);
}

/** 헤더와 푸터를 숨긴다. 이력서와 경력기술서는 인쇄가 주 용도다. */
export function isChromeLessPath(pathname: string): boolean {
  return matchesAny(PRINT_PATHS, pathname);
}

function matchesAny(paths: readonly string[], pathname: string): boolean {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
