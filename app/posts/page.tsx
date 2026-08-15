import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AllPosts } from "@/components/postGallery/all-posts";
import { createAlternateLinks } from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { getFrontMatterListForAllLocales } from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("posts");

  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.POSTS),
  };
}

export default function Page() {
  return (
    <AllPosts frontMatterListByLocale={getFrontMatterListForAllLocales()} />
  );
}
