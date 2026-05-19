import type { Locale } from "@/i18n/config";

const KO_CHARS_PER_MIN = 500;
const EN_WORDS_PER_MIN = 200;

export function getReadingTime(content: string, locale: Locale): number {
  if (locale === "ko") {
    const chars = content.replace(/\s/g, "").length;
    return Math.max(1, Math.ceil(chars / KO_CHARS_PER_MIN));
  }
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / EN_WORDS_PER_MIN));
}
