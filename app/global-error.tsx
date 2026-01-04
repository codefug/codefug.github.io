"use client";

import { useTranslations } from "next-intl";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common.error");
  return (
    <html lang="en">
      <body>
        <div>
          <h2>{t("title")}</h2>
          <div>{error.message}</div>
          <button onClick={reset} aria-label={t("retryAriaLabel")}>
            {t("retry")}
          </button>
        </div>
      </body>
    </html>
  );
}
