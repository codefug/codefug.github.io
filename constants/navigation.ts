import { type CategoryGroupId, getSectionGroupTags } from "./categories";
import { PATH } from "./path";

/** 라벨·설명은 messages의 categories.<groupId>에서 가져온다. */
export type NavigationChild = {
  groupId: CategoryGroupId;
  href: string;
};

type NavigationLabelName = "Posts" | "Series" | "Notes" | "Career" | "Search";

type NavigationBase = {
  label: NavigationLabelName;
  target: "_self";
  rel: string;
};

/** 고정된 하위 링크를 펼치는 메뉴. 라벨·설명은 messages의 navigation.menu.<key>에서 가져온다. */
export type NavigationLink = {
  key: "resume" | "career";
  href: string;
};

/**
 * 링크로 동작하는 항목, 하위 카테고리를 펼치는 항목, 고정 링크를 펼치는 항목은
 * 서로 배타적이다. 둘 이상이 함께 있는 상태를 타입으로 막는다.
 */
export type NavigationItem = NavigationBase &
  (
    | { href: string; section?: never; links?: never }
    | {
        href?: never;
        /** 이 대분류의 하위 카테고리를 호버 메뉴로 펼친다. */
        section: "notes";
        links?: never;
      }
    | { href?: never; section?: never; links: NavigationLink[] }
  );

/**
 * 대분류의 하위 카테고리를 메뉴 항목으로 만든다.
 *
 * 글이 없는 태그는 카테고리 페이지가 만들어지지 않으므로(generateStaticParams가
 * 실제 쓰인 태그만 만든다) 메뉴에서도 빼야 링크가 404로 떨어지지 않는다.
 */
export function getSectionChildren(
  section: "notes",
  usedTags: Set<string>,
): NavigationChild[] {
  return getSectionGroupTags(section)
    .filter(({ tag }) => usedTags.has(tag))
    .map(({ groupId, tag }) => ({
      groupId,
      href: `${PATH.CATEGORIES}/${tag}`,
    }));
}

/**
 * label을 소문자로 만든 값이 i18n 키가 된다. (navigation.<key>, navigation.description.<key>)
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Posts",
    href: PATH.POSTS,
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Series",
    href: PATH.SERIES,
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Notes",
    section: "notes",
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Career",
    links: [
      { key: "resume", href: PATH.RESUME },
      { key: "career", href: PATH.CAREER },
    ],
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Search",
    href: PATH.SEARCH,
    target: "_self",
    rel: "noopener noreferrer",
  },
];

export type NavigationLabel = NavigationLabelName;
