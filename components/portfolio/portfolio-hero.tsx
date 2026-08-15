"use client";

import { ArrowRight, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { PATH } from "@/constants/path";

export function PortfolioHero() {
  const t = useTranslations("portfolio.hero");
  const tNow = useTranslations("portfolio.now");
  const tArchitecture = useTranslations("portfolio.architecture");

  return (
    <section className="relative mb-16 overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/8 via-card to-card px-6 py-12 md:px-12 md:py-16">
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
        <Badge variant="outline" className="mb-4 bg-card/60">
          <Building2 className="mr-1.5 h-3 w-3" aria-hidden="true" />
          {t("current")} · {tNow("company")}
        </Badge>

        <h1 className="mb-1 font-bold text-3xl md:text-5xl">{t("name")}</h1>
        <p className="mb-5 font-mono text-muted-foreground text-sm md:text-base">
          {t("role")}
        </p>

        <p className="mb-4 text-balance font-bold text-xl leading-snug md:text-2xl">
          {t("tagline")}
        </p>
        <p className="mb-7 max-w-2xl text-muted-foreground leading-relaxed">
          {t("summary")}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#architecture"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-90"
          >
            {tArchitecture("title")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={PATH.RESUME}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-medium text-sm transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t("viewResume")}
          </a>
          <a
            href={PATH.HOME}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-medium text-sm transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t("viewBlog")}
          </a>
        </div>
      </div>
    </section>
  );
}
