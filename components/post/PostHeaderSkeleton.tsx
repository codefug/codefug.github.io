import { Skeleton } from "@/components/ui/skeleton";

export function PostHeaderSkeleton() {
  return (
    <header className="not-prose mb-10">
      {/* 실제 헤더와 같은 배너 형태로 잡아 레이아웃이 흔들리지 않게 한다. */}
      <div className="rounded-xl border border-border/60 bg-card px-6 py-10 md:px-10 md:py-14">
        <div className="mb-4 flex gap-1.5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
        </div>

        <Skeleton className="mb-2 h-9 w-4/5 sm:h-11 md:h-12" />
        <Skeleton className="mb-4 h-9 w-2/5 sm:h-11 md:h-12" />

        <div className="mb-6 max-w-3xl space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </header>
  );
}
