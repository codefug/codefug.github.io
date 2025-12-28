import type { JSX } from "react";
import type { CalloutType } from "@/constants/callout";

export function isCallout(children: JSX.Element[]) {
  if (
    typeof children[1].props.children === "string" &&
    children[1].props.children.startsWith("[!")
  )
    return true;
  return false;
}

export function extractCallOutType(
  children: { props: { children: string } }[],
): CalloutType {
  const callOutType = children[1].props.children.slice(
    2,
    children[1].props.children.indexOf("] "),
  );
  return callOutType as CalloutType;
}

export default function processCallout(children: JSX.Element[]) {
  // 콜백 확인하고
  if (!isCallout(children))
    return {
      type: null,
      title: "",
      content: children,
    };
  const type = extractCallOutType(children);
  const text = children[1].props.children;
  const endOfPrefix = text.indexOf("] ");
  const title = endOfPrefix !== -1 ? text.slice(endOfPrefix + 2) : type;
  // 콜백이면 콜백 type을 추출하고 콜백 sign을 제거한다.
  return {
    type,
    title,
    content: children.slice(2),
  };
}
