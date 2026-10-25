import type { MDXComponents } from "mdx/types";
import { createElement, type ReactNode } from "react";
import Callout from "./components/mdx/callout";
import CodeOverlay from "./components/mdx/code-overlay";
import CustomLink from "./components/mdx/custom-link";
import ImageOverlay from "./components/mdx/image-overlay";
import Mermaid from "./components/mdx/mermaid-lazy";
import processCallout from "./lib/callout";

/** h1부터 h6까지 차례로 입히는 형광펜 색(app/hltr.css). */
const HEADING_HIGHLIGHTS = [
  "hltr-red",
  "hltr-orange",
  "hltr-yellow",
  "hltr-green",
  "hltr-cyan",
  "hltr-blue",
];

const heading =
  (level: number) => (props: { id?: string; children?: ReactNode }) =>
    createElement(`h${level}`, {
      className: HEADING_HIGHLIGHTS[level - 1],
      ...props,
    });

/** ```mermaid 코드 블록이면 다이어그램 원문을, 아니면 null을 돌려준다. */
function getMermaidCode(preChildren: ReactNode): string | null {
  if (!preChildren || typeof preChildren !== "object") return null;
  if (!("props" in preChildren) || !preChildren.props) return null;

  const codeProps = preChildren.props as {
    className?: string;
    children?: ReactNode;
  };
  if (
    typeof codeProps.className !== "string" ||
    !codeProps.className.includes("language-mermaid")
  ) {
    return null;
  }

  if (typeof codeProps.children === "string") return codeProps.children;
  if (Array.isArray(codeProps.children)) return codeProps.children.join("");
  return String(codeProps.children || "");
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(5),
    h6: heading(6),
    blockquote: (props) => {
      const { children } = props;
      const { type, title, content } = processCallout(children);
      if (type === null) return createElement("blockquote", props);
      return <Callout type={type} title={title} content={content} />;
    },
    pre: (props) => {
      const mermaidCode = getMermaidCode(props.children);
      if (mermaidCode !== null) return <Mermaid>{mermaidCode}</Mermaid>;
      return <CodeOverlay {...props} />;
    },
    table: (props) => (
      <div className="my-6 w-full overflow-x-auto">
        <table {...props} />
      </div>
    ),
    th: (props) => <th className="whitespace-nowrap" {...props} />,
    td: (props) => (
      <td className="break-keep first:whitespace-nowrap" {...props} />
    ),
    a: CustomLink,
    img: (props) => <ImageOverlay {...props} />,
    ...components,
  };
}
