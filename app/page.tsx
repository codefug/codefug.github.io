import { Flame, Notebook } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PostCategoryGallery from "@/components/postGallery/postCategoryGallery";
import PostSwiper from "@/components/postSwiper";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createWebSiteStructuredData,
} from "@/components/seo/utils";
import BlockHeader from "@/components/ui/block-header";
import getFrontMatterList from "@/lib/posts";
import { HomeClientContent } from "../components/home/home-client-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: createAlternateLinks("/"),
  };
}

export default async function Home() {
  const t = await getTranslations("home");
  const totalFrontMatterList = getFrontMatterList();

  return (
    <div>
      <StructuredData jsonLd={createWebSiteStructuredData()} />
      <section className="mb-2">
        <BlockHeader
          title={
            <span className="flex gap-1">
              {t("recentPosts")}
              <Flame className="text-red-500" />
            </span>
          }
        >
          <HomeClientContent
            cardNumber={10}
            totalFrontMatterList={totalFrontMatterList}
          />
        </BlockHeader>
      </section>
      <div className="mb-14 rounded-lg py-3">
        <PostSwiper cardNumber={10} postInfoList={totalFrontMatterList} />
      </div>
      <div>
        <BlockHeader
          title={
            <span className="flex gap-1">
              {t("allPosts")} <Notebook className="text-green-400" />
            </span>
          }
        >
          <PostCategoryGallery totalFrontMatterList={totalFrontMatterList} />
        </BlockHeader>
      </div>
    </div>
  );
}
