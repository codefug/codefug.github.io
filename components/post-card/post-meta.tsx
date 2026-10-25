import { cn } from "@/lib/utils";

/** 글 목록 항목 아래에 붙는 "날짜 · 읽는 시간" 줄 */
export function PostMeta({
  date,
  readingTime,
  className,
}: {
  date: string;
  readingTime?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-muted-foreground/60 text-xs",
        className,
      )}
    >
      <time>{date}</time>
      {readingTime && (
        <>
          <span aria-hidden="true">·</span>
          <span>{`${readingTime}분`}</span>
        </>
      )}
    </div>
  );
}
