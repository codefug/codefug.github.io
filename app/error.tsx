"use client";

import { useTranslations } from "@/lib/messages";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common.error");
  return (
    <html lang="ko">
      <body>
        <div>
          <h2>{t("title")}</h2>
          <div>{error.message}</div>
          <button
            type="button"
            onClick={reset}
            aria-label={t("retryAriaLabel")}
          >
            {t("retry")}
          </button>
        </div>
      </body>
    </html>
  );
}
