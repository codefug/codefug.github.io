"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRef } from "react";
import { CarouselNext, CarouselPrevious } from "./carousel";

export function AppCarouselNext() {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="group/next hover:cursor-pointer">
      <CarouselNext
        ref={nextButtonRef}
        className="right-0 h-full w-20 rounded-none border-none bg-transparent group-hover/next:bg-accent group-hover/next:text-accent-foreground"
      />
      <ChevronsRight
        className="absolute -right-1 top-1/2 -translate-y-[50%] duration-300 group-hover/next:right-4 group-hover/next:opacity-50 group-hover/next:transition-opacity"
        height={80}
        width={40}
        onClick={() => {
          nextButtonRef.current?.click();
        }}
      />
    </div>
  );
}

export function AppCarouselPrevious() {
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="group/prev hover:cursor-pointer">
      <CarouselPrevious
        ref={previousButtonRef}
        className="left-0 h-full w-20 rounded-none border-none bg-transparent group-hover/prev:bg-accent group-hover/prev:text-accent-foreground"
      />
      <ChevronsLeft
        className="absolute -left-1 top-1/2 -translate-y-[50%] duration-300 group-hover/prev:left-4 group-hover/prev:opacity-50 group-hover/prev:transition-opacity"
        width={40}
        height={80}
        onClick={() => {
          previousButtonRef.current?.click();
        }}
      />
    </div>
  );
}
