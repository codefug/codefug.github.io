import type { Metadata } from "next";
import PostSearch from "@/components/post-gallery/post-search";
import { createAlternateLinks } from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { getFrontMatterList } from "@/lib/posts";

export function generateMetadata(): Metadata {
  return {
    alternates: createAlternateLinks(PATH.SEARCH),
  };
}

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-350 px-4">
      <PostSearch posts={getFrontMatterList()} />
    </div>
  );
}
