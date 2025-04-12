import PostGallery from "@/components/postGallery";
import Header from "@/components/ui/header";
import { getFrontMatterList } from "@/lib/posts";

export default function Home() {
  const frontMatterList = getFrontMatterList();

  return (
    <>
      <Header />
      <div>
        <PostGallery postInfoList={frontMatterList} />
      </div>
    </>
  );
}
