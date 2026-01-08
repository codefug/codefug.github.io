import { Flame, Notebook } from "lucide-react";
import type { Metadata } from "next";
import PostCategoryGallery from "@/components/postGallery/postCategoryGallery";
import PostSwiper from "@/components/postSwiper";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createBlogItemListStructuredData,
} from "@/components/seo/utils";
import BlockHeader from "@/components/ui/block-header";
import { defaultLocale } from "@/i18n/config";
import { getFrontMatterListForAllLocales } from "@/lib/posts";
import { HomeClientContent } from "../components/home/home-client-content";
import { HomeSectionTitle } from "../components/home/home-section-title";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: createAlternateLinks("/"),
  };
}

export default async function Home() {
  const frontMatterListByLocale = getFrontMatterListForAllLocales();

  return (
    <div>
      <StructuredData
        jsonLd={createBlogItemListStructuredData(
          frontMatterListByLocale[defaultLocale],
          defaultLocale,
        )}
      />
      {/* <BirthdayBanner /> */}
      <section className="mb-2">
        <BlockHeader
          title={
            <HomeSectionTitle
              translationKey="recentPosts"
              icon={<Flame className="text-red-500" />}
            />
          }
        >
          <HomeClientContent
            cardNumber={10}
            frontMatterListByLocale={frontMatterListByLocale}
          />
        </BlockHeader>
      </section>
      <div className="mb-14 rounded-lg py-3">
        <PostSwiper
          cardNumber={10}
          frontMatterListByLocale={frontMatterListByLocale}
        />
      </div>
      <div>
        <BlockHeader
          title={
            <HomeSectionTitle
              translationKey="allPosts"
              icon={<Notebook className="text-green-400" />}
            />
          }
        >
          <PostCategoryGallery
            frontMatterListByLocale={frontMatterListByLocale}
          />
        </BlockHeader>
      </div>
    </div>
  );
}
