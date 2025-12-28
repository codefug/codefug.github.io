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

  return (
    <a target="_blank" {...props} href={href.toString()}>
      {children}
    </a>
  );
}
