"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { CarouselNext, CarouselPrevious } from "./carousel";

/**
 * 캐러셀 안쪽에 떠 있는 원형 버튼.
 * 배너 바깥으로 넘치지 않도록 좌우 안쪽에 배치하고,
 * 평소에는 은은하게, hover 시 또렷해지도록 처리한다.
 */
const buttonClassName = cn(
  "top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full",
  "border-border/50 bg-background/70 text-foreground/70 shadow-sm backdrop-blur-sm",
  "opacity-0 transition-all duration-200",
  "hover:cursor-pointer hover:border-primary/40 hover:bg-background hover:text-primary hover:shadow-md",
  "focus-visible:opacity-100 disabled:opacity-0",
  // 터치 기기에는 hover가 없으므로 항상 보이게 한다.
  "max-md:opacity-100 md:group-hover/carousel:opacity-100",
);

export function AppCarouselPrevious() {
  const t = useTranslations("common.aria");

  return (
    <CarouselPrevious
      className={cn(buttonClassName, "left-3 md:left-4")}
      aria-label={t("previousSlide")}
    >
      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
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
      <ChevronRight className="h-5 w-5" aria-hidden="true" />
    </CarouselNext>
  );
}
