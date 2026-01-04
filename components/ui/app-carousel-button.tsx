"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { CarouselNext, CarouselPrevious } from "./carousel";

export function AppCarouselNext() {
  const t = useTranslations("common.aria");
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="group/next hover:cursor-pointer">
      <CarouselNext
        ref={nextButtonRef}
        className="right-0 h-full w-20 rounded-none border-none bg-transparent group-hover/next:bg-accent group-hover/next:text-accent-foreground"
        aria-label={t("nextSlide")}
      />
      <ChevronsRight
        className="absolute top-1/2 -right-1 -translate-y-[50%] duration-300 group-hover/next:right-4 group-hover/next:opacity-50 group-hover/next:transition-opacity"
        height={80}
        width={40}
        onClick={() => {
          nextButtonRef.current?.click();
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function AppCarouselPrevious() {
  const t = useTranslations("common.aria");
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="group/prev hover:cursor-pointer">
      <CarouselPrevious
        ref={previousButtonRef}
        className="left-0 h-full w-20 rounded-none border-none bg-transparent group-hover/prev:bg-accent group-hover/prev:text-accent-foreground"
        aria-label={t("previousSlide")}
      />
      <ChevronsLeft
        className="absolute top-1/2 -left-1 -translate-y-[50%] duration-300 group-hover/prev:left-4 group-hover/prev:opacity-50 group-hover/prev:transition-opacity"
        width={40}
        height={80}
        onClick={() => {
          previousButtonRef.current?.click();
        }}
        aria-hidden="true"
      />
    </div>
  );
}
