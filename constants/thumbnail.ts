import { cva } from "class-variance-authority";
import { MessageCircle } from "lucide-react";
import type { ComponentType } from "react";
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

type ThumbnailMark =
  | { kind: "glyph"; value: string }
  | { kind: "icon"; value: ComponentType<{ className?: string }> };

/** 그룹 라벨을 그대로 쓰지 않고, 그 그룹 글의 정서를 담은 한 줄 + 큰 심볼로 표현한다. */
export const THUMBNAIL_GROUP_STYLE: Record<
  CategoryGroupId,
  { tone: ThumbnailTone; mark: ThumbnailMark }
> = {
  sideProject: { tone: "orange", mark: { kind: "glyph", value: "◆" } },
  toyProject: { tone: "green", mark: { kind: "glyph", value: "◇" } },
  workProject: { tone: "blue", mark: { kind: "glyph", value: "▲" } },
  series: { tone: "purple", mark: { kind: "glyph", value: "»" } },
  framework: { tone: "sky-blue", mark: { kind: "glyph", value: "{}" } },
  language: { tone: "yellow", mark: { kind: "glyph", value: "</>" } },
  webDev: { tone: "green", mark: { kind: "glyph", value: "◎" } },
  retrospective: { tone: "red", mark: { kind: "glyph", value: "↺" } },
  review: { tone: "orange", mark: { kind: "glyph", value: "★" } },
  thought: { tone: "purple", mark: { kind: "icon", value: MessageCircle } },
  etc: { tone: "gray", mark: { kind: "glyph", value: "·" } },
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
