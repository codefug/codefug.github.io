import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { PATH } from "@/constants/path";

export default function CustomLink({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps>) {
  const isInternalLink = href.toString()?.startsWith(PATH.HOME);
  if (isInternalLink) return <Link href={href}>{children}</Link>;

  // rel 없이 target="_blank"를 쓰면 열린 문서가 window.opener로 이 창을
  // 조작할 수 있다(리버스 탭내빙). 외부 링크는 본문에서 오므로 항상 막는다.
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      href={href.toString()}
    >
      {children}
    </a>
  );
}
