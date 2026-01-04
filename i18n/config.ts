export const locales = ["ko", "en"] as const;
export const defaultLocale = "ko" as const;

export type Locale = (typeof locales)[number];

/**
 * 로케일에 따른 timezone 매핑
 */
export function getTimeZone(locale: Locale): string {
  const timeZoneMap: Record<Locale, string> = {
    ko: "Asia/Seoul",
    en: "UTC",
  };
  return timeZoneMap[locale];
}
