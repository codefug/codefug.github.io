import { PATH } from "./path";

/**
 * label을 소문자로 만든 값이 i18n 키가 된다. (navigation.<key>, navigation.description.<key>)
 */
export const NAVIGATION_ITEMS = [
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
    label: "Resume",
    href: PATH.RESUME,
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Portfolio",
    href: PATH.PORTFOLIO,
    target: "_self",
    rel: "noopener noreferrer",
  },
  {
    label: "Search",
    href: PATH.SEARCH,
    target: "_self",
    rel: "noopener noreferrer",
  },
] as const;

export type NavigationLabel = (typeof NAVIGATION_ITEMS)[number]["label"];
