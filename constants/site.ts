/**
 * 사이트의 정식 주소. 도메인이 바뀌면 여기 한 곳만 고친다.
 *
 * 환경변수로 덮어쓸 수 있게 둔 것은 커스텀 도메인을 붙이거나 다른 주소로
 * 시험 배포할 때를 위해서다. 값을 주지 않으면 운영 주소를 쓴다.
 *
 * 주의: giscus의 `data-repo`는 도메인이 아니라 레포 이름이라
 * 여기에 묶이지 않는다. components/giscus 참고.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://codefug.github.io";

/**
 * 내부 경로를 절대 URL로 만든다. 이력서는 PDF로 인쇄돼 도메인 밖에서 열리므로
 * 상대 경로로 두면 링크가 죽는다.
 *
 * 이미 절대 URL인 값(외부 링크)은 그대로 돌려준다.
 */
export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
