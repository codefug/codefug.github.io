"use client";

import type { ParsedFrontMatter } from "@/constants/mdx";
import { PostHeaderContent } from "./PostHeaderContent";

type Props = {
  frontMatter: ParsedFrontMatter;
};

export function PostHeaderClient({ frontMatter }: Props) {
  return <PostHeaderContent frontMatter={frontMatter} />;
}
