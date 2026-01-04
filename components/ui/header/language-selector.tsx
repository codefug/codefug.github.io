"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { memo, useState, useTransition } from "react";
import { type Locale, locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

export const LanguageSelector = memo(function LanguageSelector() {
  const currentLocale = useLocale();
  const t = useTranslations("common.language");
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    // Set cookie and reload
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    startTransition(() => {
      window.location.reload();
    });
  };

  const LOCALE_LABELS: Record<Locale, string> = {
    ko: t("ko"),
    en: t("en"),
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-600 hover:text-black hover:drop-shadow-lg dark:text-gray-300 dark:hover:text-white"
        aria-label={t("select")}
      >
        <Globe className="h-5 w-5" />
        <span className="hidden md:inline">{LOCALE_LABELS[currentLocale]}</span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsOpen(false);
            }}
            aria-label={t("close")}
          />
          <div className="absolute top-full right-0 z-50 mt-2 w-32 rounded-lg border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {locales.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => {
                  handleLocaleChange(locale);
                  setIsOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-sm first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100 dark:hover:bg-gray-700",
                  currentLocale === locale &&
                    "bg-gray-100 font-semibold dark:bg-gray-700",
                )}
              >
                {LOCALE_LABELS[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});
