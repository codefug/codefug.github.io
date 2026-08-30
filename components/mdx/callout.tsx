import type { JSX } from "react";
import {
  CALL_OUT_TYPE_COLOR,
  CALL_OUT_TYPE_ICON,
  type CalloutType,
} from "@/constants/callout";
import { QUOTE_STYLE, QUOTE_TITLE_STYLE } from "@/constants/variants";
import { cn } from "@/lib/utils";

export default function Callout({
  type,
  title,
  content,
}: {
  type: CalloutType | null;
  title: string;
  content: JSX.Element[];
}) {
  const children = content.map((child) =>
    typeof child === "string" ? "\n" : child.props.children,
  );
  if (type !== null)
    children[1] = children[1].slice(children[1].indexOf("] ") + 1);

  return (
    <blockquote
      className={cn(
        QUOTE_STYLE({ type: type ? CALL_OUT_TYPE_COLOR[type] : "gray" }),
        "rounded-r-md p-4 not-italic",
      )}
    >
      <div
        className={cn(
          QUOTE_TITLE_STYLE({ type: type && CALL_OUT_TYPE_COLOR[type] }),
          "mb-1.5 flex items-center gap-2 font-semibold text-base md:text-lg",
        )}
      >
        {type !== null && (
          <span className="shrink-0 [&_svg]:size-5">
            {CALL_OUT_TYPE_ICON[type]}
          </span>
        )}
        <span>{title}</span>
      </div>
      <section className="text-sm md:text-base">
        {content.map((child) => child)}
      </section>
    </blockquote>
  );
}
