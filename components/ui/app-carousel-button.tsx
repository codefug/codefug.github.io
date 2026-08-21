"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { CarouselNext, CarouselPrevious } from "./carousel";

/**
 * 캐러셀 안쪽에 떠 있는 원형 버튼.
 * 배너 바깥으로 넘치지 않도록 좌우 안쪽에 배치하고,
 * 평소에는 은은하게, hover 시 또렷해지도록 처리한다.
 *
 * 배너 이미지 위에 뜨는 버튼이라 대비를 배경에 기대지 않는다.
 * 불투명도를 높이고 blur를 얹어 어떤 이미지 위에서도 화살표가 읽히게 한다.
 */
const buttonClassName = cn(
  // 터치 타깃은 44px 아래로 내려가지 않게 한다. 보이는 원은 그대로 두고
  // before로 히트 영역만 넓혀서, 작은 화면에서도 누르기 쉽게 한다.
  "top-1/2 z-10 size-10 -translate-y-1/2 rounded-full [&_svg]:size-5",
  "before:-translate-x-1/2 before:-translate-y-1/2 before:absolute before:top-1/2 before:left-1/2 before:size-11 before:content-['']",
  "border-border/60 bg-background/85 text-foreground shadow-sm backdrop-blur-md",
  "opacity-0 transition-[opacity,color,background-color,border-color,box-shadow] duration-200",
  "hover:cursor-pointer hover:border-primary/40 hover:bg-background hover:text-primary hover:shadow-md",
  // 눌린 순간을 표시한다. hover가 없는 터치 기기에서 유일한 피드백이다.
  "active:scale-95 active:bg-background active:shadow-sm",
  // 배너 위에 뜨는 버튼이라 링이 배경에 묻힌다. offset으로 띄워 또렷하게 만든다.
  "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  // 터치 기기에는 hover가 없으므로 항상 보이게 한다.
  "max-md:opacity-100 md:group-hover/carousel:opacity-100",
  // 모션을 줄여달라고 한 사용자에게는 페이드 대신 항상 보이게 둔다.
  "motion-reduce:opacity-100 motion-reduce:transition-none motion-reduce:active:scale-100",
);

export function AppCarouselPrevious() {
  const t = useTranslations("common.aria");

  return (
    <CarouselPrevious
      className={cn(buttonClassName, "left-3 md:left-4")}
      aria-label={t("previousSlide")}
    >
      <ChevronLeft aria-hidden="true" />
    </CarouselPrevious>
  );
}

export function AppCarouselNext() {
  const t = useTranslations("common.aria");

  return (
    <CarouselNext
      className={cn(buttonClassName, "right-3 md:right-4")}
      aria-label={t("nextSlide")}
    >
      <ChevronRight aria-hidden="true" />
    </CarouselNext>
  );
}
