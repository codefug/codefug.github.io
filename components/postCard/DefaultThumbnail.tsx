import { FALLBACK_GROUP_ID, getGroupIdByTag } from "@/constants/categories";
import {
  THUMBNAIL_BG_STYLE,
  THUMBNAIL_GROUP_STYLE,
  THUMBNAIL_TEXT_STYLE,
} from "@/constants/thumbnail";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";

/**
 * teaser 이미지가 없는 글에 쓰는 기본 썸네일.
 * 글의 첫 카테고리가 속한 그룹을 기준으로 색·이니셜·캐치프레이즈를 고른다.
 */
export function DefaultThumbnail({
  category,
  className,
  compact = false,
}: {
  category: string;
  className?: string;
  /** 좁은 자리(리스트 뷰 등)에서는 캡션 문구를 생략하고 이니셜만 보여준다. */
  compact?: boolean;
}) {
  const t = useTranslations("categories");
  const groupId = getGroupIdByTag(category) ?? FALLBACK_GROUP_ID;
  const { tone, initial } = THUMBNAIL_GROUP_STYLE[groupId];

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-1.5 overflow-hidden",
        THUMBNAIL_BG_STYLE({ tone }),
        className,
      )}
    >
      <span
        className={cn(
          "font-mono leading-none",
          compact ? "text-lg" : "text-2xl",
          THUMBNAIL_TEXT_STYLE({ tone }),
        )}
        aria-hidden="true"
      >
        {initial}
      </span>
      {!compact && (
        <span className="px-2 text-center text-[10px] text-foreground/50 leading-snug">
          {t(`${groupId}.thumbnailCaption`)}
        </span>
      )}
    </div>
  );
}
