import { CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { FrontMatter } from "@/types/post";

type Props = {
  frontMatter: FrontMatter;
};

export function PostHeader({ frontMatter }: Props) {
  const { title, categories, excerpt, date, readingTime } = frontMatter;

  return (
    <header className="not-prose mb-10">
      {/* teaser는 기술 로고라 카테고리 뱃지와 중복되므로 배너에 쓰지 않는다. */}
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-linear-to-br from-primary/8 via-card to-card px-6 py-10 md:px-10 md:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, currentColor 7%, transparent) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="bg-card/60">
                {category}
              </Badge>
            ))}
          </div>

          {/* 긴 제목이 데스크톱에서 한 줄에 들어가도록 lg 이상에서 크기를 낮춘다. */}
          <h1 className="mb-4 text-balance font-bold text-3xl leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
            {title}
          </h1>

          <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
            {excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground/70 text-sm">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <time dateTime={date}>{date}</time>
            </span>
            {readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />약 {readingTime}
                분
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
