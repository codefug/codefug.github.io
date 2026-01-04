"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

type Props = {
  children: ReactNode;
  initialMessages: Record<string, any>;
};

function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("NEXT_LOCALE="));

  if (!cookie) return defaultLocale;

  const locale = cookie.split("=")[1];
  return locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
}

export function LocaleProvider({ children, initialMessages }: Props) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    // Get locale from cookie on client
    const cookieLocale = getLocaleFromCookie();

    if (cookieLocale !== defaultLocale) {
      setLocale(cookieLocale);
      // Load messages for the selected locale
      import(`@/messages/${cookieLocale}.json`).then((mod) => {
        setMessages(mod.default);
      });
    }
  }, []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
