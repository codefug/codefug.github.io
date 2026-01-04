import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, type Locale, locales } from "./config";

export default getRequestConfig(async () => {
  // Try to get locale from cookie first
  const cookieStore = await cookies();
  let locale = cookieStore.get("NEXT_LOCALE")?.value;

  // Fallback to Accept-Language header
  if (!locale) {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    if (acceptLanguage) {
      const browserLocale = acceptLanguage.split(",")[0].split("-")[0];
      locale = locales.includes(browserLocale as Locale)
        ? browserLocale
        : defaultLocale;
    }
  }

  // Final fallback to default locale
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
