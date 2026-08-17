import type { Metadata } from "next";
import { UpcomingCard } from "@/components/notes/upcoming-card";
import PostGallery from "@/components/postGallery";
import { createAlternateLinks } from "@/components/seo/utils";
import { getSectionIdByTag } from "@/constants/categories";
import { PATH } from "@/constants/path";
import { getTranslations } from "@/lib/messages";
import { getFrontMatterList } from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notes.meta");

  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.NOTES),
  };
}

export default async function Page() {
  const t = await getTranslations("notes");
  // 회고 대분류에 속한 태그의 글을 모은다. (그룹이 늘어도 따라온다)
  const posts = getFrontMatterList().filter((post) =>
    post.categories.some((tag) => getSectionIdByTag(tag) === "notes"),
  );

  return (
    <div className="mx-auto w-full max-w-350 px-4 py-8">
      <header className="mb-6">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </header>

      {posts.length > 0 && (
        <div className="mb-8">
          <PostGallery postInfoList={posts} viewMode="grid" />
        </div>
      )}

      {/* 아직 채우지 못한 갈래가 있다는 걸 알려준다. */}
      <UpcomingCard
        title={t("emptyTitle")}
        description={t("emptyDescription")}
        badge={t("upcoming")}
      />
    </div>
  );
}
