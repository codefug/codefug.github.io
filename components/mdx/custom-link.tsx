import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { PATH } from "@/constants/path";

export default function CustomLink({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps>) {
  const url = href.toString();
  if (url.startsWith(PATH.HOME)) return <Link href={href}>{children}</Link>;

  // rel 없는 target="_blank"는 window.opener로 이 창을 조작당할 수 있어(reverse tabnabbing) 항상 막는다.
  return (
    <a target="_blank" rel="noopener noreferrer" {...props} href={url}>
      {children}
    </a>
  );
}
