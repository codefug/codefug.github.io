import { Flame, Notebook } from "lucide-react";
import type { Metadata } from "next";
import { BirthdayBanner } from "@/components/event/birthday-banner";
import { HeroSection } from "@/components/home/hero-section";
import { HomeClientContent } from "@/components/home/home-client-content";
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
import { shouldShowBirthdayBanner } from "@/util/birthday";
import { HomeSectionTitle } from "../components/home/home-section-title";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: createAlternateLinks("/"),
  };
}

export default async function Home() {
  const frontMatterListByLocale = getFrontMatterListForAllLocales();
  const showBirthdayBanner = shouldShowBirthdayBanner();

  return (
    <div>
      <StructuredData
        jsonLd={createBlogItemListStructuredData(
          frontMatterListByLocale[defaultLocale],
          defaultLocale,
        )}
      />
      {showBirthdayBanner && <BirthdayBanner />}
      <section className="my-10 lg:mt-0">
        <HeroSection
          postCount={frontMatterListByLocale[defaultLocale].length}
        />
      </section>
      <section className="mb-2">
        <BlockHeader
          title={
            <HomeSectionTitle
              translationKey="recentPosts"
              icon={<Flame className="text-red-500" />}
            />
          }
        />
      </section>
      <div className="mb-14 rounded-lg py-3">
        <HomeClientContent
          cardNumber={10}
          frontMatterListByLocale={frontMatterListByLocale}
        />
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
