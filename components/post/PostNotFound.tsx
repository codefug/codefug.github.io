"use client";

import { FileX2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PostNotFound() {
  const t = useTranslations("post");
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-muted-foreground">
      <FileX2 className="h-12 w-12 opacity-30" />
      <p className="text-base">{t("notFound")}</p>
    </div>
  );
}
