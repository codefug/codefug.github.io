import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

export function SidebarAnchorButton({
  navType,
  className,
  ...props
}:
  | ({ navType: "a" } & Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "href"
    > & { href: string })
  | ({ navType: "link" } & AnchorHTMLAttributes<HTMLAnchorElement> &
      Omit<LinkProps, "href"> & { href: string })) {
  if (navType === "link")
    return (
      <Link
        className={cn(
          `rounded-md px-2 text-gray-400 hover:bg-accent hover:text-black hover:underline hover:drop-shadow-lg group-hover:text-black hover:dark:text-white group-hover:dark:text-white`,
          className,
        )}
        {...props}
      />
    );
  if (navType === "a")
    return (
      <a
        className={cn(
          `rounded-md px-2 text-gray-400 hover:bg-accent hover:text-black hover:underline hover:drop-shadow-lg group-hover:text-black hover:dark:text-white group-hover:dark:text-white`,
          className,
        )}
        {...props}
      >
        {props.children}
      </a>
    );

  return null;
}
