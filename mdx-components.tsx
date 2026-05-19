import type { MDXComponents } from "mdx/types";
import { createElement, type ReactNode } from "react";
import Callout from "./components/mdx/callout";
import CodeOverlay from "./components/mdx/code-overlay";
import ImageOverlay from "./components/mdx/image-overlay";
import Mermaid from "./components/mdx/mermaid";
import { getHeaderHltr } from "./constants/header-hltr";
import processCallout from "./util/callout";

function CustomHeading({
  props,
  level,
}: {
  props: { id?: string; children: ReactNode };
  level: number;
}) {
  return createElement(`h${level}`, {
    className: getHeaderHltr(level),
    ...props,
  });
}

// eslint-disable-next-line
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <CustomHeading props={props} level={1} />,
    h2: (props) => <CustomHeading props={props} level={2} />,
    h3: (props) => <CustomHeading props={props} level={3} />,
    h4: (props) => <CustomHeading props={props} level={4} />,
    h5: (props) => <CustomHeading props={props} level={5} />,
    h6: (props) => <CustomHeading props={props} level={6} />,
    blockquote: (props) => {
      const { children } = props;
      const { type, title, content } = processCallout(children);
      if (type === null) return createElement("blockquote", props);
      return <Callout type={type} title={title} content={content} />;
    },
    pre: (props) => {
      const { children } = props;

      // Check if the code block is mermaid
      if (children && typeof children === "object") {
        // Handle React element
        if ("props" in children && children.props) {
          const codeProps = children.props as {
            className?: string;
            children?: ReactNode;
          };

          if (
            codeProps.className &&
            typeof codeProps.className === "string" &&
            codeProps.className.includes("language-mermaid")
          ) {
            const codeContent =
              typeof codeProps.children === "string"
                ? codeProps.children
                : Array.isArray(codeProps.children)
                  ? codeProps.children.join("")
                  : String(codeProps.children || "");
            return <Mermaid>{codeContent}</Mermaid>;
          }
        }
      }

      return <CodeOverlay {...props} />;
    },
    table: (props) => (
      <div className="my-6 w-full overflow-x-auto">
        <table {...props} />
      </div>
    ),
    // a: CustomLink,
    img: (props) => <ImageOverlay {...props} />,
    ...components,
  };
}
