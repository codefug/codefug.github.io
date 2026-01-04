"use client";

import { useTranslations } from "next-intl";
import type { ComponentPropsWithoutRef } from "react";
import { HeadComponent } from "../portfolio/HeadComponent";

interface Props {
  className?: ComponentPropsWithoutRef<"section">["className"];
}

export default function GrowthJourney({ className }: Props) {
  const t = useTranslations("portfolio.growthJourney");
  const growthJourneyText = useTranslations("portfolio.data");

  return (
    <section className={className}>
      <HeadComponent>{t("title")}</HeadComponent>
      <div className="flex flex-col gap-2 whitespace-pre-line">
        {growthJourneyText("growthJourney")}
      </div>
    </section>
  );
}
