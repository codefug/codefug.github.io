import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import CustomLink from "./components/mdx/custom-link";
import processCallout from "./util/callout";
import Callout from "./components/mdx/callout";

// eslint-disable-next-line
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    blockquote: (props) => {
      const { children } = props;
      const { type, title, content } = processCallout(children);
      return <Callout type={type} title={title} content={content} />;
    },
    a: CustomLink,
    img: (props) => {
      const { src } = props;
      const url = src.startsWith("public") ? src.slice(6) : src;
      return (
        <Image
          sizes="900px"
          style={{ width: "50%", height: "auto" }}
          width={0}
          height={0}
          {...(props as ImageProps)}
          src={url}
        />
      );
    },
    ...components,
  };
}
