"use client";

import { POST_ITEM_PER_PAGE } from "@/constants/post";
import { memo, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2Icon } from "lucide-react";
import { FrontMatter } from "@/constants/mdx";
import PostCard from "../postCard";

const PostGallery = memo(function PostGallery({
  postInfoList,
}: {
  postInfoList: FrontMatter[];
}) {
  const { filteredFrontMatterList, ref, page } = usePostListRender({
    postInfoList,
  });
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFrontMatterList.map((postInfo) => (
          <PostCard key={postInfo.id} {...postInfo} />
        ))}
      </div>
      {postInfoList.length / POST_ITEM_PER_PAGE > page && (
        <div ref={ref} className="w-full">
          <Loader2Icon className="mx-auto mt-4 animate-spin text-primary" />
        </div>
      )}
    </>
  );
});

export default PostGallery;

function usePostListRender({ postInfoList }: { postInfoList: FrontMatter[] }) {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    rootMargin: "300px 0px",
    threshold: 0,
  });
  const filteredFrontMatterList = useMemo(
    () => postInfoList.slice(0, page * POST_ITEM_PER_PAGE),
    [page, postInfoList],
  );

  useEffect(() => {
    if (inView) setPage((p) => p + 1);
  }, [inView]);

  return {
    page,
    ref,
    filteredFrontMatterList,
  };
}
