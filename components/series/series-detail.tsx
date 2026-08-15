"use client";

import { ArrowLeft, Layers } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import type { Locale } from "@/i18n/config";

export function SeriesDetail({
  slug,
  postsByLocale,
}: {
  slug: string;
  postsByLocale: Record<Locale, FrontMatter[]>;
}) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const posts = postsByLocale[locale] ?? postsByLocale.ko;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <a
        href={PATH.HOME}
        className="mb-6 inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("series.backToList")}
      </a>

      <header className="mb-8 border-border border-b pb-6">
        <div className="mb-2 flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-medium text-muted-foreground text-sm">
            {t("series.postCount", { count: posts.length })}
          </span>
        </div>
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">
          {t(`series.${slug}.name`)}
        </h1>
        <p className="text-muted-foreground">
          {t(`series.${slug}.description`)}
        </p>
      </header>

      <ol className="flex flex-col gap-3">
        {posts.map((post, index) => (
          <li key={post.id}>
            <SeriesPostItem post={post} order={index + 1} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function SeriesPostItem({ post, order }: { post: FrontMatter; order: number }) {
  const t = useTranslations();

  return (
    <a
      href={`${PATH.POSTS}/${post.id}`}
      aria-label={t("common.aria.postRead", { title: post.title })}
      rel="bookmark"
      className="group flex gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
    >
      <span
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
        aria-hidden="true"
      >
        {order}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="mb-1 font-bold text-base transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mb-2 line-clamp-2 text-muted-foreground text-sm">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-muted-foreground/60 text-xs">
          <time>{post.date}</time>
          {post.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {t("post.readingTime", { minutes: post.readingTime })}
              </span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}
