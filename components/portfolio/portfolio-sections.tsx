"use client";

import {
  FileText,
  MessagesSquare,
  Microscope,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PATH } from "@/constants/path";
import { SectionHeading } from "./architecture-case";

const SERVICE_KEYS = ["allra", "admin"] as const;

/** 어느 회사에서 어떤 서비스를 맡고 있는지 */
export function CurrentWork() {
  const t = useTranslations("portfolio.now");

  return (
    <section className="mb-16">
      <SectionHeading title={t("title")} />

      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-bold text-lg">{t("company")}</span>
        <span className="text-muted-foreground text-sm">{t("team")}</span>
        <span className="font-mono text-muted-foreground/60 text-sm">
          {t("period")}
        </span>
      </div>

      <p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
        {t("serviceLabel")}
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SERVICE_KEYS.map((key) => (
          <Card key={key} className="flex flex-col p-5">
            <h3 className="mb-2 font-bold text-base">
              {t(`services.${key}.name`)}
            </h3>
            <p className="mb-4 flex-1 text-muted-foreground text-sm leading-relaxed">
              {t(`services.${key}.description`)}
            </p>
            <p className="border-border border-t pt-3 text-primary text-sm">
              {t(`services.${key}.role`)}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

const PRINCIPLE_ITEMS = [
  { key: "rootCause", icon: Microscope },
  { key: "typeLevel", icon: ShieldCheck },
  { key: "enforceWithTools", icon: Wrench },
] as const;

export function Principles() {
  const t = useTranslations("portfolio.principles");

  return (
    <section className="mb-16">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PRINCIPLE_ITEMS.map(({ key, icon: Icon }) => (
          <Card key={key} className="flex flex-col p-5">
            <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="mb-2 font-bold text-base leading-snug">
              {t(`items.${key}.title`)}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(`items.${key}.description`)}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

const BEYOND_ITEMS = [
  { key: "backend", icon: Wrench, tagCount: 2 },
  { key: "review", icon: MessagesSquare, tagCount: 1 },
  { key: "writing", icon: FileText, tagCount: 1 },
] as const;

export function BeyondCode() {
  const t = useTranslations("portfolio.beyond");

  return (
    <section className="mb-16">
      <SectionHeading title={t("title")} />
      <div className="flex flex-col gap-4">
        {BEYOND_ITEMS.map(({ key, icon: Icon, tagCount }) => (
          <Card key={key} className="flex gap-4 p-5">
            <Icon
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-base">
                  {t(`items.${key}.title`)}
                </h3>
                {Array.from({ length: tagCount }, (_, index) =>
                  t(`items.${key}.tags.${index}`),
                ).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[11px]">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function Closing() {
  const t = useTranslations("portfolio.closing");

  return (
    <section className="mb-8 rounded-2xl border border-border/60 bg-muted/30 px-6 py-10 text-center md:px-12">
      <h2 className="mb-3 text-balance font-bold text-xl md:text-2xl">
        {t("title")}
      </h2>
      <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed">
        {t("description")}
      </p>
      <a
        href={PATH.HOME}
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-90"
      >
        {t("cta")}
      </a>
    </section>
  );
}

export function PortfolioContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-4xl px-4 py-8">{children}</div>;
}
