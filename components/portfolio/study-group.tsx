"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { STUDY_GROUPS } from "@/constants/about";
import { HeadComponent } from "./HeadComponent";

function DescriptionWithDuration({
  title,
  duration,
}: {
  title: ReactNode;
  duration: string;
}) {
  return (
    <div className="mt-0 mb-0">
      <span className="text-gray-700 dark:text-gray-300">{duration}</span>
      <span className="ml-2 text-gray-700 dark:text-gray-300">{title}</span>
    </div>
  );
}

export default function StudyGroup() {
  const t = useTranslations("portfolio.studyGroup");

  return (
    <div className="prose dark:prose-invert mx-auto mt-4">
      <HeadComponent className="mb-4">{t("title")}</HeadComponent>
      {STUDY_GROUPS.map((studyGroup) => (
        <DescriptionWithDuration
          key={studyGroup.titleKey}
          title={
            studyGroup.url ? (
              <Link
                className="text-primary"
                href={studyGroup.url}
                target="_blank"
              >
                {t(studyGroup.titleKey)}
              </Link>
            ) : (
              t(studyGroup.titleKey)
            )
          }
          duration={t(`duration.${studyGroup.durationKey}`)}
        />
      ))}
    </div>
  );
}
