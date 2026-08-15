"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { PATH } from "@/constants/path";

/**
 * 큰 박스 하나로 눌러 담지 않고 좌우로 나눠 시선이 흐르게 한다.
 * 왼쪽은 무슨 일을 하는 사람인지, 오른쪽은 지금 어디에 있는지.
 */
export function PortfolioHero() {
  const t = useTranslations("portfolio.hero");
  const tNow = useTranslations("portfolio.now");

  return (
    <section className="mb-20 pt-6">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-px w-8 bg-primary" aria-hidden="true" />
        <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]">
          {t("role")}
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <div>
          <h1 className="mb-6 text-balance font-bold text-4xl leading-[1.15] tracking-tight md:text-6xl">
            {t("tagline")}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            {t("summary")}
          </p>
        </div>

        {/* 지금 어디서 무엇을 하는지 — 면접관이 가장 먼저 확인하는 정보 */}
        <dl className="flex flex-col gap-4 border-border border-l pl-6 text-sm lg:pb-2">
          <div>
            <dt className="mb-1 text-muted-foreground/60 text-xs uppercase tracking-wide">
              {t("name")}
            </dt>
            <dd className="font-semibold text-base">{tNow("company")}</dd>
          </div>
          <div>
            <dt className="mb-1 text-muted-foreground/60 text-xs uppercase tracking-wide">
              {tNow("team")}
            </dt>
            <dd className="font-mono text-muted-foreground">
              {tNow("period")}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="#work"
          className="group inline-flex items-center gap-2 font-medium text-sm"
        >
          <span className="border-primary border-b pb-0.5 transition-colors group-hover:text-primary">
            {t("viewWork")}
          </span>
          <ArrowDown
            className="h-4 w-4 text-primary transition-transform group-hover:translate-y-0.5"
            aria-hidden="true"
          />
        </a>
        <a
          href={PATH.RESUME}
          className="group inline-flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          {t("viewResume")}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
        <a
          href={PATH.HOME}
          className="group inline-flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          {t("viewBlog")}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
