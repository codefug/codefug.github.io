"use client";

import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { Badge } from "../ui/badge";

export default function PostListItem({
  categories,
  date,
  excerpt,
  title,
  id,
  readingTime,
}: FrontMatter) {
  const t = useTranslations();
  const linkHref = useMemo(() => `${PATH.POSTS}/${id}`, [id]);

  return (
    <a
      href={linkHref}
      aria-label={t("common.aria.postRead", { title })}
      rel="bookmark"
      title={title}
      className="group relative flex flex-col gap-1.5 rounded-xl border border-border bg-background p-4 pl-5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
    >
      <span
        className="absolute top-4 bottom-4 left-0 w-0.5 rounded-full bg-primary/0 transition-colors duration-200 group-hover:bg-primary/60"
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-center gap-1">
        {categories.map((category) => (
          <Badge key={category + id} variant="outline" className="text-xs">
            {category}
          </Badge>
        ))}
      </div>
      <h2 className="line-clamp-1 font-bold text-base transition-colors group-hover:text-primary sm:text-lg">
        {title}
      </h2>
      <p className="line-clamp-2 text-muted-foreground text-sm">{excerpt}</p>
      <div className="mt-1 flex items-center gap-2 text-muted-foreground/60 text-xs">
        <time>{date}</time>
        {readingTime && (
          <>
            <span aria-hidden="true">·</span>
            <span>{t("post.readingTime", { minutes: readingTime })}</span>
          </>
        )}
      </div>
    </a>
  );
}
