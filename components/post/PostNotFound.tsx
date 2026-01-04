"use client";

import { useTranslations } from "next-intl";

export default function PostNotFound() {
  const t = useTranslations("post");
  return <div>{t("notFound")}</div>;
}
