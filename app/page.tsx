import PostGallery from "@/components/postGallery";
import { getFrontMatterList } from "@/lib/posts";

export default function Home() {
  const frontMatterList = getFrontMatterList();

  return (
    <div>
      <PostGallery postInfoList={frontMatterList} />
    </div>
  );
}
