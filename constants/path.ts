/**
 * 사이드바(글 목록)를 쓰지 않는 페이지들.
 * 이 경로에서는 사이드바 토글 버튼도 노출하지 않는다.
 */
export const SIDEBAR_OFF_PATHS = ["/resume", "/portfolio"] as const;

export function isSidebarOffPath(pathname: string): boolean {
  return matchesAny(SIDEBAR_OFF_PATHS, pathname);
}

/**
 * 헤더·푸터 없이 본문만 보여주는 페이지.
 * 이력서는 그 자체가 하나의 문서이고 인쇄가 주 용도라 화면 장식을 두지 않는다.
 */
export const CHROME_LESS_PATHS = ["/resume"] as const;

export function isChromeLessPath(pathname: string): boolean {
  return matchesAny(CHROME_LESS_PATHS, pathname);
}

function matchesAny(paths: readonly string[], pathname: string): boolean {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export const PATH = {
  HOME: "/",
  POSTS: "/posts",
  SERIES: "/series",
  PORTFOLIO: "/portfolio",
  RESUME: "/resume",
  SEARCH: "/search",
} as const;
