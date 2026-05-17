"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { Badge } from "../ui/badge";

export default function PostListItem({
  categories,
  date,
  excerpt,
  header,
  title,
  id,
}: FrontMatter) {
  const t = useTranslations("common.aria");
  const linkHref = useMemo(() => `${PATH.POSTS}/${id}`, [id]);

  return (
    <a
      href={linkHref}
      aria-label={t("postRead", { title })}
      rel="bookmark"
      title={title}
      className="group flex gap-4 rounded-xl border border-border bg-background p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-md sm:gap-5"
    >
      <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-32">
        <Image
          priority={false}
          src={header.teaser}
          alt={title}
          fill
          sizes="(max-width: 640px) 96px, 128px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="mb-1.5 flex flex-wrap gap-1">
            {categories.map((category) => (
              <Badge key={category + id} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <h2 className="mb-1 line-clamp-1 font-bold text-sm sm:text-base">
            {title}
          </h2>
          <p className="line-clamp-2 text-muted-foreground text-xs sm:text-sm">
            {excerpt}
          </p>
        </div>
        <time className="mt-2 text-muted-foreground text-xs">{date}</time>
      </div>
    </a>
  );
}
