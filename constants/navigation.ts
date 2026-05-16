import { PATH } from "./path";

export const NAVIGATION_ITEMS = [
  {
    label: "Resume",
    href: PATH.RESUME,
    target: "_self",
    rel: "noopener noreferrer",
  },
  // {
  //   label: "Portfolio",
  //   href: PATH.PORTFOLIO,
  //   target: "_self",
  //   rel: "noopener noreferrer",
  // },
  {
    label: "Search",
    href: PATH.SEARCH,
    target: "_self",
    rel: "noopener noreferrer",
  },
] as const;
