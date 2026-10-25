/** 도메인의 단일 원천. 환경변수는 커스텀 도메인이나 시험 배포 주소로 덮어쓸 때만 준다. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://codefug.github.io";

export const SITE_TITLE = "이승현 블로그";

export const SITE_DESCRIPTION =
  "기술 기록과, 기술 밖에서 생각하고 겪은 것을 남기는 이승현의 블로그";

export const SITE_KEYWORDS = [
  "개발",
  "프로그래밍",
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "블로그",
];

export const AUTHOR_NAME = "이승현";

export const CONTACT_EMAIL = "leeseounghyun9917@gmail.com";

export const GITHUB_URL = "https://github.com/codefug";

export const AUTHOR_GIVEN_NAME_EN = "Seounghyun";

export const AUTHOR_NAME_EN = `Lee ${AUTHOR_GIVEN_NAME_EN}`;

/** 화면에 보이는 주소. 프로토콜은 표시 폭만 차지하므로 뗀다. */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

/** 이력서는 PDF로 인쇄돼 도메인 밖에서 열리므로 상대 경로로 두면 링크가 죽는다. */
export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
