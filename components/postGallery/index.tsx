"use client";

import { ChevronDown } from "lucide-react";
import { memo, useMemo, useState } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { POST_ITEM_PER_PAGE } from "@/constants/post";
import PostCard from "../postCard";
import PostListItem from "../postCard/post-list-item";

type ViewMode = "grid" | "list";

const PostGallery = memo(function PostGallery({
  postInfoList,
  viewMode = "grid",
  moreLabel,
}: {
  postInfoList: FrontMatter[];
  viewMode?: ViewMode;
  /** 더 보기 버튼 문구. 없으면 전부 렌더한다. */
  moreLabel?: string;
}) {
  const [page, setPage] = useState(1);

  const visibleList = useMemo(() => {
    if (!moreLabel) return postInfoList;
    return postInfoList.slice(0, page * POST_ITEM_PER_PAGE);
  }, [postInfoList, page, moreLabel]);

  const hasMore = visibleList.length < postInfoList.length;

  return (
    <>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleList.map((postInfo) => (
            <PostCard key={postInfo.id} {...postInfo} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleList.map((postInfo) => (
            <PostListItem key={postInfo.id} {...postInfo} />
          ))}
        </div>
      )}
      {hasMore && moreLabel && (
        <button
          type="button"
          onClick={() => setPage((p) => p + 1)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border border-dashed py-2.5 text-muted-foreground text-sm transition-colors hover:cursor-pointer hover:border-primary/40 hover:text-primary"
        >
          {moreLabel}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </>
  );
});

export default PostGallery;
