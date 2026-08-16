"use client";

import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export default function PostCard({
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
      className="h-full"
    >
      <Card className="group relative flex h-full min-h-56 cursor-pointer flex-col overflow-hidden bg-card p-5 transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <span
          className="absolute inset-x-0 top-0 h-0.5 bg-primary/40 transition-colors duration-300 group-hover:bg-primary"
          aria-hidden="true"
        />
        <div className="mb-2.5 flex flex-wrap gap-1">
          {categories.map((category) => (
            <Badge key={category + id} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
        <h2 className="mb-2 line-clamp-2 font-bold text-lg leading-snug transition-colors group-hover:text-primary">
          {title}
        </h2>
        <p className="line-clamp-4 flex-1 text-muted-foreground text-sm">
          {excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-muted-foreground/60 text-xs">
          <time>{date}</time>
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{t("post.readingTime", { minutes: readingTime })}</span>
            </>
          )}
        </div>
      </Card>
    </a>
  );
}
