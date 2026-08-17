import { TAG_LABEL, type Tag } from "@/constants/categories";
import { getTranslations } from "@/lib/messages";

/**
 * 태그를 화면에 보여줄 이름.
 *
 * slug를 그대로 쓰면 무슨 글인지 알기 어려운 태그가 많다(kkom-kkom, thought).
 * 시리즈 이름 → 그룹 라벨 → 표기 보정 → slug 순으로 찾는다.
 *
 * messages를 읽지만 순수 함수라 서버·클라이언트 어디서든 같은 결과를 준다.
 * 목록·사이드바·상세 페이지가 같은 이름을 보여주려면 모두 이 함수를 거쳐야 한다.
 */
export function resolveTagLabel(tag: string): string {
  const series = getTranslations("series");
  if (typeof series.raw(`${tag}.name`) === "string") {
    return series(`${tag}.name`);
  }

  // 그룹 하나가 태그 하나를 대표하면(생각·회고·후기) 그룹 라벨이 곧 표시명이다.
  const categories = getTranslations("categories");
  if (typeof categories.raw(`${tag}.label`) === "string") {
    return categories(`${tag}.label`);
  }

  return TAG_LABEL[tag as Tag] ?? tag;
}
