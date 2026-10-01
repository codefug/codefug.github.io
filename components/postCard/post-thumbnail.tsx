import type { CSSProperties } from "react";
import { getGroupIdByTag } from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { ThumbnailFrame } from "./thumbnail-frame";

const TITLE_AS_HEADLINE = new Set(["thought", "retrospective", "review"]);

const pad = (n: number) => String(n).padStart(2, "0");

export function PostThumbnail({
  id,
  title,
  categories,
  seriesOrder,
  header,
  cover,
  coverFit,
  size = "md",
}: Pick<
  FrontMatter,
  | "id"
  | "title"
  | "categories"
  | "seriesOrder"
  | "header"
  | "cover"
  | "coverFit"
> & {
  size?: "md" | "sm";
}) {
  const t = useTranslations();
  const seriesTag = categories.find((c) => t.has(`series.${c}.name`));
  const groupId = getGroupIdByTag(seriesTag ?? categories[0]);

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
  const labels = (
    <>
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
            "rounded-full bg-[hsl(var(--thumb-hue)_85%_55%)] shadow-[0_0_8px_hsl(var(--thumb-hue)_85%_55%)]",
            sm ? "size-1" : "size-1.5",
          )}
        />
        {t(`categories.${groupId}.label`)}
      </span>
      {seriesOrder && (
        <span className={cn(label, "tabular-nums", sm ? "right-2" : "right-4")}>
          {pad(seriesOrder.index)}/{pad(seriesOrder.total)}
        </span>
      )}
    </>
  );

  if (cover) {
    return (
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden bg-primary/5"
        style={{ "--thumb-hue": 243 } as CSSProperties}
      >
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
        {labels}
      </div>
    );
  }

  const headline = seriesTag
    ? t(`series.${seriesTag}.name`)
    : TITLE_AS_HEADLINE.has(groupId)
      ? title.split(" — ")[0]
      : t(`categories.${groupId}.thumbnailCaption`);

  return (
    <ThumbnailFrame seed={id} compact={sm} className="h-full w-full">
      {/* 카드 제목(h2)을 되풀이하는 장식이라 스크린리더에서 뺀다. */}
      <p
        aria-hidden
        className={cn(
          "relative line-clamp-2 max-w-[85%] text-balance break-keep bg-[linear-gradient(135deg,hsl(var(--foreground))_35%,hsl(var(--thumb-hue)_75%_50%))] bg-clip-text text-center font-bold text-transparent leading-tight tracking-tight",
          sm
            ? "text-[13px] sm:text-[15px]"
            : headline.length > 12
              ? "text-[21px]"
              : "text-[26px]",
        )}
      >
        {headline}
      </p>
      {labels}
      {header?.teaser && (
        <span
          className={cn(
            "absolute rounded-md border border-white/60 bg-white/80 shadow-sm backdrop-blur-md",
            sm ? "right-1.5 bottom-1.5 p-0.5" : "right-3.5 bottom-3 p-1",
          )}
        >
          <img
            src={header.teaser}
            alt=""
            aria-hidden
            loading="lazy"
            className={cn("object-contain", sm ? "h-3.5 w-3.5" : "h-5 w-5")}
          />
        </span>
      )}
    </ThumbnailFrame>
  );
}
