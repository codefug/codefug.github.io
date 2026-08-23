import { CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ParsedFrontMatter } from "@/constants/mdx";

type Props = {
  frontMatter: ParsedFrontMatter;
};

export function PostHeaderContent({ frontMatter }: Props) {
  const { title, categories, excerpt, date, readingTime } = frontMatter;
  const normalizedCategories = Array.isArray(categories)
    ? categories
    : [categories];

  return (
    <header className="not-prose mb-10">
      {/*
        teaser 이미지는 포스트 고유 이미지가 아니라 기술 로고여서
        450px를 차지하면서 카테고리 뱃지와 같은 말을 반복했다.
        이미지를 걷어내고 제목 자체를 배너로 세운다.
      */}
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
            {normalizedCategories.map((category) => (
              <Badge key={category} variant="outline" className="bg-card/60">
                {category}
              </Badge>
            ))}
          </div>

          {/*
            긴 제목("순록의 편지 — 연말에 예약 편지를 보내는 서비스를 만들며"
            정도)이 데스크톱에서 한 줄에 들어가도록 크기를 낮췄다.
            좁은 화면은 어차피 줄바꿈되므로 기존 크기를 유지한다.
          */}
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
