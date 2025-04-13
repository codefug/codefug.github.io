import PostGallery from "@/components/postGallery";
import BlockHeader from "@/components/ui/block-header";
import { getFrontMatterList } from "@/lib/posts";

export default function Home() {
  const frontMatterList = getFrontMatterList();

  return (
    <BlockHeader title="최신 포스트">
      <PostGallery postInfoList={frontMatterList} />
    </BlockHeader>
  );
}
