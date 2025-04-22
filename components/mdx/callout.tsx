import {
  CALL_OUT_TYPE_COLOR,
  CALL_OUT_TYPE_ICON,
  CalloutType,
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
  content: { props: { children: string } }[];
}) {
  // props.children을 꺼내서 \n을 기준으로 나눠서 새로운 배열을 만든다.
  const children = content.map((child) =>
    typeof child === "string" ? "\n" : child.props.children,
  );
  // 콜백의 경우 콜백 sign을 제거한다.
  if (type !== null)
    children[1] = children[1].slice(children[1].indexOf("] ") + 1);
  const contentArr = [];
  for (let i = 0; i < children.length; i += 1) {
    if (children[i] === "\n") contentArr.push({ id: `${i}`, content: "\n" });

    if (children[i].includes("\n")) {
      const subChildren = children[i].split("\n");
      for (let j = 0; j < subChildren.length; j += 1)
        contentArr.push({ id: `${i}=${j}`, content: subChildren[j] });
    } else contentArr.push({ id: `${i}`, content: children[i] });
  }
  return (
    <blockquote
      className={cn(
        QUOTE_STYLE({ type: type ? CALL_OUT_TYPE_COLOR[type] : "gray" }),
        "rounded-xl border-y border-r border-y-gray-400 border-r-gray-400 border-opacity-30 py-4 not-italic",
      )}
    >
      <div
        className={cn(
          QUOTE_TITLE_STYLE({ type: type && CALL_OUT_TYPE_COLOR[type] }),
          "flex items-center gap-1 text-lg font-bold md:text-2xl",
        )}
      >
        {type !== null && CALL_OUT_TYPE_ICON[type]}
        <div>{title}</div>
      </div>
      <section className="text-sm font-semibold text-black md:text-base">
        {contentArr.map((child) => {
          if (child.content === "\n") return <br key={child.id} />;
          return <div key={child.id}>{child.content}</div>;
        })}
      </section>
    </blockquote>
  );
}
