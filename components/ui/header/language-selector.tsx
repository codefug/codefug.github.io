"use client";

import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { memo, useState } from "react";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALE_LABELS: Record<string, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

export const LanguageSelector = memo(function LanguageSelector() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
    // Reload with new locale using window.location to avoid hydration issues
    window.location.href = `/${newLocale}${pathnameWithoutLocale}`;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-600 hover:text-black hover:drop-shadow-lg dark:text-gray-300 dark:hover:text-white"
        aria-label="언어 선택"
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
            aria-label="언어 선택 닫기"
          />
          <div className="absolute top-full right-0 z-50 mt-2 w-32 rounded-lg border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {routing.locales.map((locale) => (
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
