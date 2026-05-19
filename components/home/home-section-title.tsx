"use client";

import { useTranslations } from "next-intl";

type Props = {
  translationKey: "recentPosts" | "allPosts";
};

export function HomeSectionTitle({ translationKey }: Props) {
  const t = useTranslations("home");

  return <span>{t(translationKey)}</span>;
}
