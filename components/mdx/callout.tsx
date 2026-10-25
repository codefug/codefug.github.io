import type { JSX } from "react";
import {
  CALL_OUT_TYPE_COLOR,
  CALL_OUT_TYPE_ICON,
  type CalloutType,
  type ColorType,
} from "@/constants/callout";
import { cn } from "@/lib/utils";

const QUOTE_STYLE: Record<ColorType, string> = {
  blue: "bg-quote-blue border-blue-500",
  green: "bg-quote-green border-green-500",
  yellow: "bg-quote-yellow border-yellow-500",
  orange: "bg-quote-orange border-orange-500",
  red: "bg-quote-red border-red-500",
  purple: "bg-quote-purple border-purple-500",
  gray: "bg-quote-gray border-gray-500",
  "sky-blue": "bg-quote-sky-blue border-blue-500",
};

const QUOTE_TITLE_STYLE: Record<ColorType, string> = {
  blue: "text-blue-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  orange: "text-orange-500",
  red: "text-red-500",
  purple: "text-purple-500",
  gray: "text-gray-500",
  "sky-blue": "text-blue-500",
};

export default function Callout({
  type,
  title,
  content,
}: {
  type: CalloutType;
  title: string;
  content: JSX.Element[];
}) {
  const color = CALL_OUT_TYPE_COLOR[type];

  return (
    <blockquote
      className={cn(
        "border-l-4",
        QUOTE_STYLE[color],
        "rounded-r-md p-4 not-italic",
      )}
    >
      <div
        className={cn(
          QUOTE_TITLE_STYLE[color],
          "mb-1.5 flex items-center gap-2 font-semibold text-base md:text-lg",
        )}
      >
        <span className="shrink-0 [&_svg]:size-5">
          {CALL_OUT_TYPE_ICON[type]}
        </span>
        <span>{title}</span>
      </div>
      <section className="text-sm md:text-base">{content}</section>
    </blockquote>
  );
}
