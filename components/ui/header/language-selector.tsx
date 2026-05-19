"use client";

import { useLocale, useTranslations } from "next-intl";
import { memo, useLayoutEffect, useState, useTransition } from "react";
import { type Locale, locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

function persistLocale(locale: Locale): void {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
}

export const LanguageSelector = memo(function LanguageSelector() {
  const currentLocale = useLocale();
  const t = useTranslations("common.language");
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [, startTransition] = useTransition();

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    persistLocale(newLocale);
    startTransition(() => window.location.reload());
  };

  if (!isMounted) {
    return <div className="h-5 w-8 animate-pulse rounded bg-muted" />;
  }

  const LOCALE_LABELS: Record<Locale, string> = {
    ko: t("ko"),
    en: t("en"),
  };

  const LOCALE_CODES: Record<Locale, string> = {
    ko: "KO",
    en: "EN",
  };

  const currentLocaleTyped = currentLocale as Locale;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium text-muted-foreground text-sm transition-colors hover:cursor-pointer hover:text-foreground"
        aria-label={t("select")}
      >
        {LOCALE_CODES[currentLocaleTyped]}
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
          <div className="absolute top-full right-0 z-50 mt-2 w-24 overflow-hidden rounded-lg border border-border bg-background shadow-md">
            {locales.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => {
                  handleLocaleChange(locale);
                  setIsOpen(false);
                }}
                className={cn(
                  "block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                  currentLocaleTyped === locale &&
                    "font-semibold text-foreground",
                  currentLocaleTyped !== locale && "text-muted-foreground",
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
