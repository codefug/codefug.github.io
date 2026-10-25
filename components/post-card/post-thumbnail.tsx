import {
  getGroup,
  getGroupIdByTag,
  getSectionIdByTag,
  getSeriesInfo,
} from "@/constants/categories";
import { cn } from "@/lib/utils";
import type { FrontMatter } from "@/types/post";

const pad = (n: number) => String(n).padStart(2, "0");

export function PostThumbnail({
  post,
  size = "md",
}: {
  post: FrontMatter;
  size?: "md" | "sm";
}) {
  const { categories, seriesOrder, cover, coverFit } = post;
  const series = categories
    .map((tag) => ({ tag, info: getSeriesInfo(tag) }))
    .find((c) => c.info);
  const seriesTag = series?.tag;
  const group = getGroup(getGroupIdByTag(seriesTag ?? categories[0]));
  // 프로젝트 글은 제목이 추상적이라 그룹 라벨 대신 프로젝트 이름을 단다.
  const projectName =
    seriesTag && getSectionIdByTag(seriesTag) === "project"
      ? series?.info?.name
      : undefined;

  const sm = size === "sm";
  const photo =
    cover !== undefined && !cover.endsWith(".svg") && coverFit !== "contain";
  const label = cn(
    "absolute font-mono text-foreground/60 uppercase",
    photo &&
      "rounded-full bg-background/80 px-1.5 py-0.5 text-foreground/80 backdrop-blur-sm",
    sm
      ? "top-1.5 text-[7px] tracking-[0.12em]"
      : "top-3.5 text-[10px] tracking-[0.2em]",
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-primary/5">
      <img
        src={cover}
        alt=""
        aria-hidden
        loading="lazy"
        className={cn(
          "h-full w-full transition-transform duration-500 group-hover:scale-105",
          photo ? "object-cover" : "object-contain",
          !photo && (sm ? "p-1 pt-3" : "p-3 pt-8"),
        )}
      />
      <span
        className={cn(
          label,
          "flex items-center gap-1",
          sm ? "left-2" : "left-4",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]",
            sm ? "size-1" : "size-1.5",
          )}
        />
        {projectName ?? group.label}
      </span>
      {seriesOrder && (
        <span className={cn(label, "tabular-nums", sm ? "right-2" : "right-4")}>
          {pad(seriesOrder.index)}/{pad(seriesOrder.total)}
        </span>
      )}
    </div>
  );
}
