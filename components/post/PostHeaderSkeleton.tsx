import { CalendarDays } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function PostHeaderSkeleton() {
  return (
    <header className="mb-8">
      {/* 히어로 이미지 스켈레톤 */}
      <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-xl sm:h-[400px] md:h-[450px]">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

        {/* 카테고리 태그 스켈레톤 */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 sm:top-6 sm:left-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      {/* 포스트 메타데이터 스켈레톤 */}
      <div className="mb-6 space-y-4">
        {/* 제목 스켈레톤 */}
        <Skeleton className="h-10 w-3/4 sm:h-12 md:h-14" />

        {/* 날짜 스켈레톤 */}
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* 설명 스켈레톤 */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-gray-200 border-b dark:border-gray-800" />
    </header>
  );
}
