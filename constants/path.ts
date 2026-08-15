/**
 * 사이드바(글 목록)를 쓰지 않는 페이지들.
 * 이 경로에서는 사이드바 토글 버튼도 노출하지 않는다.
 */
export const SIDEBAR_OFF_PATHS = ["/resume", "/portfolio"] as const;

export function isSidebarOffPath(pathname: string): boolean {
  return SIDEBAR_OFF_PATHS.some(
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
  ABOUT: "/about",
} as const;
