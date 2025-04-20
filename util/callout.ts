import { CalloutType } from "@/constants/callout";

type childProps = "\n" | { props: { children: string } };

export function isCallout(children: childProps[]) {
  if (
    children[1] !== "\n" &&
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

export default function processCallout(
  children: { props: { children: string } }[],
) {
  // 콜백 확인하고
  if (!isCallout(children))
    return {
      type: null,
      title: "",
      content: children,
    };
  // 콜백이면 콜백 type을 추출하고 콜백 sign을 제거한다.
  return {
    type: extractCallOutType(children),
    title: children[1].props.children.slice(
      children[1].props.children.indexOf("] ") + 1,
    ),
    content: children.slice(2),
  };
}
