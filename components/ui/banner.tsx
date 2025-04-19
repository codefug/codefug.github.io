"use client";

import { POST_PATH } from "@/constants/path";
import { useCallback, useState } from "react";
import { LucideLoader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Banner({ firstPostId }: { firstPostId: string }) {
  return (
    <figure className="relative mb-12 mt-4 overflow-hidden rounded-xl">
      <div className="flex h-[300px] w-full justify-end rounded-2xl bg-gradient-to-r from-[#1f1d80] to-[#000000]">
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <div className="flex flex-col items-center p-8 text-center text-white">
            <h2 className="mb-4 text-center text-xl font-bold md:text-3xl">
              Codefug Blog에 오신 것을 환영합니다!
            </h2>
            <p className="md:text-md mb-6 break-keep text-center text-sm font-semibold text-white/80">
              제가 모르는 누군가가 이 블로그를 보고 지식을 얻고 문제를 해결하고
              더 나은 개발자가 되기를 바랍니다.
            </p>
            <BannerMoveToPageButton firstPostId={firstPostId} />
          </div>
        </div>
      </div>
    </figure>
  );
}

function BannerMoveToPageButton({ firstPostId }: { firstPostId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const activateLoading = useCallback(() => {
    setIsLoading(true);
  }, []);
  return (
    <a
      href={POST_PATH + firstPostId}
      onClick={activateLoading}
      className={cn(
        "md:text-md flex h-9 w-[107px] cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-black px-4 py-2 text-sm font-semibold text-primary-foreground text-white opacity-95 shadow hover:bg-primary/90",
        isLoading ? "hover:cursor-wait" : "",
      )}
    >
      {isLoading ? (
        <LucideLoader2 className="animate-spin stroke-[3] text-white" />
      ) : (
        "최신 글 보기"
      )}
    </a>
  );
}
