import type { MDXComponents } from "mdx/types";
import { createElement, type ReactNode } from "react";
import Callout from "./components/mdx/callout";
import { getHeaderHltr } from "./constants/header-hltr";
import processCallout from "./util/callout";

function getHeadingIndexWithCloser() {
  let headingIndex = -1;
  return function callBack() {
    headingIndex += 1;
    return headingIndex;
  };
}

function CustomHeading({
  props,
  level,
  headingIndex,
}: {
  props: { children: { props: { children: ReactNode } } };
  level: number;
  headingIndex: () => number;
}) {
  return createElement(`h${level}`, {
    id: headingIndex(),
    className: getHeaderHltr(level),
    ...props,
  });
}

// eslint-disable-next-line
export function useMDXComponents(components: MDXComponents): MDXComponents {
  const getHeadingIndex = getHeadingIndexWithCloser();
  return {
    h1: (props) => {
      return (
        <CustomHeading props={props} level={1} headingIndex={getHeadingIndex} />
      );
    },
    h2: (props) => {
      return (
        <CustomHeading props={props} level={2} headingIndex={getHeadingIndex} />
      );
    },
    h3: (props) => {
      return (
        <CustomHeading props={props} level={3} headingIndex={getHeadingIndex} />
      );
    },
    h4: (props) => {
      return (
        <CustomHeading props={props} level={4} headingIndex={getHeadingIndex} />
      );
    },
    h5: (props) => {
      return (
        <CustomHeading props={props} level={5} headingIndex={getHeadingIndex} />
      );
    },
    h6: (props) => {
      return (
        <CustomHeading props={props} level={6} headingIndex={getHeadingIndex} />
      );
    },
    blockquote: (props) => {
      const { children } = props;
      const { type, title, content } = processCallout(children);
      if (type === null) return createElement("blockquote", props);
      return <Callout type={type} title={title} content={content} />;
    },
    // a: CustomLink,
    // img: (props) => {
    //   const { src } = props;
    //   const url = src.startsWith("public") ? src.slice(6) : src;
    //   return (
    //     <Image
    //       sizes="900px"
    //       style={{ width: "50%", height: "auto" }}
    //       width={0}
    //       height={0}
    //       {...(props as ImageProps)}
    //       src={url}
    //     />
    //   );
    // },
    ...components,
  };
}
