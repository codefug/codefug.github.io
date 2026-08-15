"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { Badge } from "../ui/badge";

/**
 * 최신 게시물 배너 한 장.
 * 목록 카드와 마찬가지로 이미지를 쓰지 않고, 넓은 가로 폭을 타이포그래피로 채운다.
 */
export default function PostBannerCard({
  categories,
  date,
  excerpt,
  title,
  id,
  readingTime,
}: FrontMatter) {
  const t = useTranslations();

  return (
    <a
      href={`${PATH.POSTS}/${id}`}
      aria-label={t("common.aria.postRead", { title })}
      rel="bookmark"
      title={title}
      className="group relative flex min-h-56 flex-col justify-center overflow-hidden rounded-xl border border-border/60 bg-linear-to-br from-primary/8 via-card to-card px-6 py-8 transition-colors duration-300 hover:border-primary/40 md:min-h-64 md:px-14"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, currentColor 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {categories.map((category) => (
            <Badge key={category + id} variant="outline" className="bg-card/60">
              {category}
            </Badge>
          ))}
        </div>
        <h3 className="mb-3 line-clamp-2 text-balance font-bold text-xl leading-tight transition-colors group-hover:text-primary md:text-3xl">
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 text-muted-foreground text-sm md:text-base">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 text-muted-foreground/70 text-xs md:text-sm">
          <time>{date}</time>
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{t("post.readingTime", { minutes: readingTime })}</span>
            </>
          )}
          <ArrowRight
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </a>
  );
}
