import PostGallery from "@/components/postGallery";
import Banner from "@/components/ui/banner";
import BlockHeader from "@/components/ui/block-header";
import { getFrontMatterList } from "@/lib/posts";

export default function Home() {
  const frontMatterList = getFrontMatterList();

  return (
    <div>
      <Banner />
      <BlockHeader title="최신 포스트">
        <PostGallery postInfoList={frontMatterList} />
      </BlockHeader>
    </div>
  );
}
