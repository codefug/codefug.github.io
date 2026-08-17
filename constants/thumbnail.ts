import { cva } from "class-variance-authority";
import type { CategoryGroupId } from "./categories";

/**
 * teaser가 없는 글에 쓰는 기본 썸네일의 그룹별 톤.
 * quote 팔레트(색상 8종)를 그룹 10개에 재사용한다 — 톤이 겹치는 그룹은
 * 이니셜과 캐치프레이즈로 구분되므로 문제되지 않는다.
 */
type ThumbnailTone =
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "gray"
  | "sky-blue";

/** 그룹 라벨을 그대로 쓰지 않고, 그 그룹 글의 정서를 담은 한 줄 + 큰 이니셜로 표현한다. */
export const THUMBNAIL_GROUP_STYLE: Record<
  CategoryGroupId,
  { tone: ThumbnailTone; initial: string }
> = {
  toyProject: { tone: "orange", initial: "◆" },
  workProject: { tone: "blue", initial: "▲" },
  series: { tone: "purple", initial: "»" },
  framework: { tone: "sky-blue", initial: "{}" },
  language: { tone: "yellow", initial: "</>" },
  webDev: { tone: "green", initial: "◎" },
  retrospective: { tone: "red", initial: "↺" },
  review: { tone: "orange", initial: "★" },
  thought: { tone: "purple", initial: "…" },
  etc: { tone: "gray", initial: "·" },
};

export const THUMBNAIL_BG_STYLE = cva("", {
  variants: {
    tone: {
      blue: "bg-quote-blue",
      green: "bg-quote-green",
      yellow: "bg-quote-yellow",
      orange: "bg-quote-orange",
      red: "bg-quote-red",
      purple: "bg-quote-purple",
      gray: "bg-quote-gray",
      "sky-blue": "bg-quote-sky-blue",
    } satisfies Record<ThumbnailTone, string>,
  },
});

export const THUMBNAIL_TEXT_STYLE = cva("", {
  variants: {
    tone: {
      blue: "text-blue-500",
      green: "text-green-500",
      yellow: "text-yellow-600",
      orange: "text-orange-500",
      red: "text-red-500",
      purple: "text-purple-500",
      gray: "text-gray-500",
      "sky-blue": "text-blue-500",
    } satisfies Record<ThumbnailTone, string>,
  },
});
