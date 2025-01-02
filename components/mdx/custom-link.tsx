import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export default function CustomLink({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps>) {
  const isInternalLink = href.toString() && href.toString().startsWith("/");
  if (isInternalLink) return <Link href={href}>{children}</Link>;

  return (
    <a target="_blank" {...props} href={href.toString()}>
      {children}
    </a>
  );
}
