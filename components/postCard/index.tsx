"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export default function PostCard({
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
    >
      <Card className="group relative h-[450px] cursor-pointer overflow-hidden bg-card transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            priority={false}
            src={header.teaser}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            className={cn(
              "h-52 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105",
            )}
          />
        </div>
        <div className="flex h-[calc(100%-13rem)] flex-col p-5">
          <div className="mb-2.5 flex flex-wrap gap-1">
            {categories.map((category) => (
              <Badge key={category + id} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
          <h2 className="mb-2 line-clamp-2 font-bold text-lg leading-snug">
            {title}
          </h2>
          <p className="line-clamp-3 flex-1 text-muted-foreground text-sm">
            {excerpt}
          </p>
          <time className="mt-3 text-muted-foreground/60 text-xs">{date}</time>
        </div>
      </Card>
    </a>
  );
}
