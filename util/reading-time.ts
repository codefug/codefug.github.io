const KO_CHARS_PER_MIN = 500;
/** 코드는 산문처럼 읽지 않는다. 훑는 속도를 감안해 글자 수를 이 비율만큼만 센다. */
const CODE_WEIGHT = 0.3;

/** MDX 본문에서 읽는 시간에 영향을 주지 않는 마크업을 걷어낸다. */
function stripMarkup(text: string): string {
  return text
    .replace(/^import\s.+$/gm, "") // MDX 상단 import 문
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // 이미지
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // 링크는 표시 텍스트만 남긴다
    .replace(/<[^>]+>/g, "") // JSX·HTML 태그
    .replace(/[#>*_`|-]/g, ""); // 헤딩·인용·강조·표 기호
}

export function getReadingTime(content: string): number {
  const codeBlocks = content.match(/```[\s\S]*?```/g) ?? [];
  const codeChars = codeBlocks.join("").replace(/\s/g, "").length;
  const proseChars = stripMarkup(
    content.replace(/```[\s\S]*?```/g, ""),
  ).replace(/\s/g, "").length;

  const weighted = proseChars + codeChars * CODE_WEIGHT;
  return Math.max(1, Math.ceil(weighted / KO_CHARS_PER_MIN));
}
