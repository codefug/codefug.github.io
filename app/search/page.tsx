import type { Metadata } from "next";
import PostSearchGallery from "@/components/postGallery/postSearchGallery";
import { createAlternateLinks } from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import getFrontMatterList from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: createAlternateLinks(PATH.SEARCH),
  };
}

export default function Page() {
  const totalFrontMatterList = getFrontMatterList();

  return (
    <div className="mx-auto w-full max-w-350 px-4">
      <PostSearchGallery totalFrontMatterList={totalFrontMatterList} />
    </div>
  );
}
