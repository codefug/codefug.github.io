import PostSearchGallery from "@/components/postGallery/postSearchGallery";
import getFrontMatterList from "@/lib/posts";

export default function Page() {
  const totalFrontMatterList = getFrontMatterList();

  return <PostSearchGallery totalFrontMatterList={totalFrontMatterList} />;
}
