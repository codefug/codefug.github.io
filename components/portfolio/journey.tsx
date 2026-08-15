"use client";

import { Award, BookOpen, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./architecture-case";

const JOURNEY_KEYS = ["univ", "bootcamp", "pwc", "allra"] as const;

/** 어떻게 여기까지 왔는지 — 세로 타임라인 */
export function Journey() {
  const t = useTranslations("portfolio.journey");

  return (
    <section className="mb-16">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <ol className="relative flex flex-col gap-8 border-border border-l pl-6">
        {JOURNEY_KEYS.map((key, index) => {
          const isCurrent = index === JOURNEY_KEYS.length - 1;

          return (
            <li key={key} className="relative">
              <span
                className={
                  isCurrent
                    ? "absolute top-1.5 -left-[1.9rem] h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20"
                    : "absolute top-2 -left-[1.72rem] h-2 w-2 rounded-full bg-border"
                }
                aria-hidden="true"
              />
              <p className="mb-1 font-mono text-muted-foreground/70 text-xs">
                {t(`items.${key}.period`)}
              </p>
              <h3 className="mb-1.5 font-bold text-base">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

const CERT_ITEMS = [
  { key: "awsClf", icon: Award },
  { key: "opic", icon: Languages },
] as const;

export function Credentials() {
  const t = useTranslations("portfolio.credentials");

  return (
    <section className="mb-16">
      <SectionHeading title={t("title")} />

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {CERT_ITEMS.map(({ key, icon: Icon }) => (
          <Card key={key} className="flex gap-3 p-5">
            <Icon
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <div className="mb-0.5 flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-bold text-base">
                  {t(`items.${key}.name`)}
                </h3>
                <span className="font-mono text-muted-foreground/60 text-xs">
                  {t(`items.${key}.period`)}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="flex gap-3 p-5">
        <BookOpen
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden="true"
        />
        <div>
          <h3 className="mb-0.5 font-bold text-base">{t("studyLabel")}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t("study")}
          </p>
        </div>
      </Card>
    </section>
  );
}
