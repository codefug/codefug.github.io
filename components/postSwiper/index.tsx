"use client";

import { useMemo, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { FrontMatter } from "@/constants/mdx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import PostCard from "../postCard";

export default function PostSwiper({
  postInfoList,
  cardNumber,
}: {
  postInfoList: FrontMatter[];
  cardNumber: number;
}) {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const filteredPostInfoList = useMemo(
    () => postInfoList.slice(0, cardNumber),
    [postInfoList, cardNumber],
  );

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="mx-auto rounded-xl border bg-primary/5 p-4 md:p-6 lg:p-8"
    >
      <CarouselContent>
        {filteredPostInfoList.map(
          ({ categories, date, excerpt, header, id, title }) => (
            <CarouselItem
              key={id}
              className="pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3 lg:pl-8"
            >
              <PostCard
                categories={categories}
                date={date}
                excerpt={excerpt}
                header={header}
                id={id}
                title={title}
              />
            </CarouselItem>
          ),
        )}
      </CarouselContent>
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
      <div className="group/prev hover:cursor-pointer">
        <CarouselPrevious
          ref={prevButtonRef}
          className="left-0 h-full w-20 rounded-none border-none bg-transparent group-hover/prev:bg-accent group-hover/prev:text-accent-foreground"
        />
        <ChevronsLeft
          className="absolute -left-1 top-1/2 -translate-y-[50%] duration-300 group-hover/prev:left-4 group-hover/prev:opacity-50 group-hover/prev:transition-opacity"
          width={40}
          height={80}
          onClick={() => {
            prevButtonRef.current?.click();
          }}
        />
      </div>
    </Carousel>
  );
}
