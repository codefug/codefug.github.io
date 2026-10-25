import { type LucideIcon, Search } from "lucide-react";
import { TAG_LIST, type Tag } from "./categories";
import { PATH } from "./path";

export type NavigationLabel = "Posts" | "Series" | "Me" | "Career" | "Search";

type NavigationBase = {
  label: NavigationLabel;
  /** 툴팁에 라벨과 함께 보인다. */
  description: string;
  ariaLabel: string;
  /** 있으면 라벨 대신 아이콘으로 보인다. */
  icon?: LucideIcon;
  target: "_self";
  rel: string;
};

export type NavigationLink = {
  key: "resume" | "career";
  label: string;
  description: string;
  href: string;
};

export type NavigationItem = NavigationBase &
  (
    | {
        href: string;
        /** 카테고리 페이지 링크. 이 태그의 글이 없으면 메뉴에서 뺀다. */
        tag?: Tag;
        links?: never;
      }
    | { href?: never; tag?: never; links: NavigationLink[] }
  );

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Posts",
    description: "모든 글을 한 곳에서",
    ariaLabel: "전체 글 페이지로 이동",
    href: PATH.POSTS,
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Series",
    description: "하나의 주제를 여러 편에 걸쳐 쓴 글",
    ariaLabel: "시리즈 목록 페이지로 이동",
    href: PATH.SERIES,
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Me",
    description: "기술 밖에서 생각하고 겪은 것",
    ariaLabel: "Me 글 목록으로 이동",
    tag: TAG_LIST.ME,
    href: `${PATH.CATEGORIES}/${TAG_LIST.ME}`,
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Career",
    description: "이력서와 경력기술서",
    ariaLabel: "이력서와 경력기술서 메뉴 열기",
    links: [
      {
        key: "resume",
        label: "Resume",
        description: "경력과 성과를 한 장으로",
        href: PATH.RESUME,
      },
      {
        key: "career",
        label: "Career Description",
        description: "프로젝트마다 문제와 판단, 결과까지",
        href: PATH.CAREER,
      },
    ],
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Search",
    description: "제목으로 글 찾기",
    ariaLabel: "검색 페이지로 이동",
    icon: Search,
    href: PATH.SEARCH,
    target: "_self",
    rel: "noopener noreferrer",
  },
];

/** 글이 없는 태그는 카테고리 페이지가 생성되지 않으므로(generateStaticParams) 메뉴에서도 빼야 404로 떨어지지 않는다. */
export function getNavigationItems(usedTags: string[]): NavigationItem[] {
  return NAVIGATION_ITEMS.filter(
    (item) => item.tag === undefined || usedTags.includes(item.tag),
  );
}
