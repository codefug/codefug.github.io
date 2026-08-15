"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Props = {
  adjacentByLocale: Record<
    Locale,
    { previous: FrontMatter | null; next: FrontMatter | null }
  >;
};

/**
 * 댓글 위에서 시간 순서상 이전/다음 글로 이동한다.
 */
export function AdjacentPosts({ adjacentByLocale }: Props) {
  const t = useTranslations("post");
  const locale = useLocale() as Locale;
  const { previous, next } = adjacentByLocale[locale] ?? adjacentByLocale.ko;

  if (!previous && !next) return null;

  return (
    <nav
      aria-label={t("adjacentNav")}
      className="not-prose mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {previous ? (
        <AdjacentLink
          post={previous}
          direction="previous"
          label={t("previous")}
        />
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
      {next && <AdjacentLink post={next} direction="next" label={t("next")} />}
    </nav>
  );
}

function AdjacentLink({
  post,
  direction,
  label,
}: {
  post: FrontMatter;
  direction: "previous" | "next";
  label: string;
}) {
  const isNext = direction === "next";
  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <a
      href={`${PATH.POSTS}/${post.id}`}
      rel={isNext ? "next" : "prev"}
      className={cn(
        "group flex flex-col gap-1 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5",
        isNext && "sm:items-end sm:text-right",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-muted-foreground text-xs",
          isNext && "sm:flex-row-reverse",
        )}
      >
        <Icon
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isNext
              ? "group-hover:translate-x-0.5"
              : "group-hover:-translate-x-0.5",
          )}
          aria-hidden="true"
        />
        {label}
      </span>
      <span className="line-clamp-2 font-semibold text-sm transition-colors group-hover:text-primary">
        {post.title}
      </span>
    </a>
  );
}
