import { getRequestConfig } from "next-intl/server";
import { defaultLocale, getTimeZone } from "./config";

export default getRequestConfig(async () => {
  // Always use default locale for SSG build
  // Client-side locale switching will be handled by NextIntlClientProvider
  const locale = defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: getTimeZone(locale),
  };
});
