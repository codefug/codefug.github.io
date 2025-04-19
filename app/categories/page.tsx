import PostCategoryGallery from "@/components/postGallery/postCategoryGallery";
import getFrontMatterList from "@/lib/posts";

export default function Page() {
  const totalFrontMatterList = getFrontMatterList();

  return <PostCategoryGallery totalFrontMatterList={totalFrontMatterList} />;
}
