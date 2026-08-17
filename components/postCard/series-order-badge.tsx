import { Layers } from "lucide-react";
import type { FrontMatter } from "@/constants/mdx";
import { cn } from "@/lib/utils";

/**
 * 시리즈에 속한 글이 몇 번째 편인지 목록에서 바로 알아보게 하는 배지.
 * 카테고리 배지와 나란히 놓이므로 색으로 구분한다.
 */
export function SeriesOrderBadge({
  seriesOrder,
  className,
}: {
  seriesOrder: NonNullable<FrontMatter["seriesOrder"]>;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 font-medium text-[11px] text-primary tabular-nums",
        className,
      )}
    >
      <Layers className="h-3 w-3" aria-hidden="true" />
      {seriesOrder.index}/{seriesOrder.total}편
    </span>
  );
}
