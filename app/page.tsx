import { BirthdayBanner } from "@/components/event/birthday-banner";
import { FeaturedPosts } from "@/components/home/featured-posts";
import { HeroSection } from "@/components/home/hero-section";
import { RecentPosts } from "@/components/post-gallery/recent-posts";
import { StructuredData } from "@/components/seo/structured-data";
import { createBlogItemListStructuredData } from "@/components/seo/utils";
import SeriesSection from "@/components/series/series-section";
import { getSection, matchesFacet } from "@/constants/categories";
import { shouldShowBirthdayBanner } from "@/lib/birthday";
import { buildSeriesSummaries } from "@/lib/post-grouping";
import { getFrontMatterList } from "@/lib/posts";
import type { FrontMatter } from "@/types/post";

const TECH_COUNT = 8;

function isMePost(post: FrontMatter): boolean {
  return matchesFacet({ kind: "section", id: "me" }, post.categories);
}

export default function Home() {
  const posts = getFrontMatterList();
  const featuredPosts = posts.filter((post) => post.featured);
  const techPosts = posts.filter((post) => !isMePost(post));
  const mePosts = posts.filter(isMePost);

  return (
    <div>
      <StructuredData jsonLd={createBlogItemListStructuredData(posts)} />
      {shouldShowBirthdayBanner() && <BirthdayBanner />}
      <div className="mx-auto w-full max-w-350 px-4">
        <HeroSection />
        <FeaturedPosts posts={featuredPosts} />
        {/* 그룹별 섹션은 1~2편짜리 토막이 되므로 홈은 기술과 Me 두 덩어리로만 나눈다. */}
        <div>
          <SeriesSection seriesList={buildSeriesSummaries(posts)} />
          <RecentPosts
            title="기술"
            postInfoList={techPosts.slice(0, TECH_COUNT)}
            allPostCount={posts.length}
          />
          <RecentPosts title={getSection("me").label} postInfoList={mePosts} />
        </div>
      </div>
    </div>
  );
}
