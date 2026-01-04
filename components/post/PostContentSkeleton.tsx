import { Skeleton } from "@/components/ui/skeleton";

export function PostContentSkeleton() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/6" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
