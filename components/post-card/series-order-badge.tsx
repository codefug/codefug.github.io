import { Layers } from "lucide-react";
import type { FrontMatter } from "@/types/post";

export function SeriesOrderBadge({
  seriesOrder,
}: {
  seriesOrder: NonNullable<FrontMatter["seriesOrder"]>;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 font-medium text-[11px] text-primary tabular-nums">
      <Layers className="h-3 w-3" aria-hidden="true" />
      {seriesOrder.index}/{seriesOrder.total}편
    </span>
  );
}
