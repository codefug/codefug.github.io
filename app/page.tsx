import type { Metadata } from "next";
import { BirthdayBanner } from "@/components/event/birthday-banner";
import { HeroSection } from "@/components/home/hero-section";
import { HomeSectionTitle } from "@/components/home/home-section-title";
import PostCategoryGallery from "@/components/postGallery/postCategoryGallery";
import PostSwiper from "@/components/postSwiper";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createBlogItemListStructuredData,
} from "@/components/seo/utils";
import BlockHeader from "@/components/ui/block-header";
import { getFrontMatterList } from "@/lib/posts";
import { shouldShowBirthdayBanner } from "@/util/birthday";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: createAlternateLinks("/"),
  };
}

export default async function Home() {
  const frontMatterList = getFrontMatterList();
  const showBirthdayBanner = shouldShowBirthdayBanner();

  return (
    <div>
      <StructuredData
        jsonLd={createBlogItemListStructuredData(frontMatterList)}
      />
      {showBirthdayBanner && <BirthdayBanner />}
      <section className="my-10 lg:mt-0">
        <HeroSection postCount={frontMatterList.length} />
      </section>
      <div className="mx-auto w-full max-w-350 px-4">
        <section className="mb-2">
          <BlockHeader
            title={<HomeSectionTitle translationKey="recentPosts" />}
          />
        </section>
        <div className="mb-14">
          <PostSwiper cardNumber={5} frontMatterList={frontMatterList} />
        </div>
        <PostCategoryGallery frontMatterList={frontMatterList} />
      </div>
    </div>
  );
}
