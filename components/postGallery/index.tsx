"use client";

import { Loader2Icon } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { FrontMatter } from "@/constants/mdx";
import { POST_ITEM_PER_PAGE } from "@/constants/post";
import PostCard from "../postCard";
import PostListItem from "../postCard/post-list-item";

type ViewMode = "grid" | "list";

const PostGallery = memo(function PostGallery({
  postInfoList,
  viewMode = "grid",
}: {
  postInfoList: FrontMatter[];
  viewMode?: ViewMode;
}) {
  const { filteredFrontMatterList, ref, page } = usePostListRender({
    postInfoList,
  });

  return (
    <>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFrontMatterList.map((postInfo) => (
            <PostCard key={postInfo.id} {...postInfo} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredFrontMatterList.map((postInfo) => (
            <PostListItem key={postInfo.id} {...postInfo} />
          ))}
        </div>
      )}
      {postInfoList.length / POST_ITEM_PER_PAGE > page && (
        <div ref={ref} key={page} className="w-full">
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
    setPage(1);
  }, []);

  useEffect(() => {
    if (inView) setPage((p) => p + 1);
  }, [inView]);

  return {
    page,
    ref,
    filteredFrontMatterList,
  };
}
