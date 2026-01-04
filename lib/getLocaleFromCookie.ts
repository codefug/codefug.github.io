import { cookies } from "next/headers";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

/**
 * 서버 컴포넌트에서 쿠키로부터 locale을 가져오는 함수
 * SSG 모드에서는 항상 defaultLocale 반환
 */
export async function getLocaleFromCookie(): Promise<Locale> {
  // SSG 모드에서는 쿠키에 접근할 수 없으므로 기본 locale 반환
  if (process.env.NODE_ENV === "production") {
    return defaultLocale;
  }

  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get("NEXT_LOCALE");

    if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
      return localeCookie.value as Locale;
    }
  } catch {
    // 쿠키 접근 실패 시 기본 locale 반환
  }

  return defaultLocale;
}
