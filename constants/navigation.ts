import { PATH } from "./path";

export const NAVIGATION_ITEMS = [
  {
    label: "Resume",
    href: "https://www.figma.com/proto/KSWARGDkXi9Wt8ARq2uGCa/leeseounghyun-resume?node-id=401-2&node-type=canvas&t=z2H9bL74afXrrgPS-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    target: "_blank",
    "aria-label": "이력서 보기 (새 탭에서 열림)",
    rel: "noopener noreferrer",
  },
  {
    label: "Portfolio",
    href: PATH.PORTFOLIO,
    target: "_self",
    "aria-label": "포트폴리오 페이지로 이동",
    rel: "noopener noreferrer",
  },
  {
    label: "Search",
    href: PATH.SEARCH,
    target: "_self",
    "aria-label": "검색 페이지로 이동",
    rel: "noopener noreferrer",
  },
] as const;
