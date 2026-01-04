"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

type Props = {
  translationKey: "recentPosts" | "allPosts";
  icon: ReactNode;
};

export function HomeSectionTitle({ translationKey, icon }: Props) {
  const t = useTranslations("home");

  return (
    <span className="flex gap-1">
      {t(translationKey)}
      {icon}
    </span>
  );
}
