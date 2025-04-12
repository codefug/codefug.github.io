"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { MAX_POST_LIST_LENGTH } from "@/constants/post";
import PostCard, { PostInfo } from "../postCard";

export default function PostGallery({
  postInfoList,
}: {
  postInfoList: PostInfo[];
}) {
  const { filteredFrontMatterList, ref } = usePostListRender({
    postInfoList,
  });
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFrontMatterList.map((postInfo: PostInfo) => (
          <PostCard key={postInfo.id} {...postInfo} />
        ))}
      </div>
      <div ref={ref} />
    </>
  );
}

function usePostListRender({ postInfoList }: { postInfoList: PostInfo[] }) {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    delay: 0,
    threshold: 0.1,
  });
  const filteredFrontMatterList = useMemo(
    () => postInfoList.slice(0, page * MAX_POST_LIST_LENGTH),
    [page, postInfoList],
  );

  useEffect(() => {
    if (inView) setPage((p) => p + 1);
  }, [inView]);

  return {
    ref,
    filteredFrontMatterList,
  };
}
