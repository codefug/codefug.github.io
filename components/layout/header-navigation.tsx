"use client";

import { trimEnd } from "es-toolkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import {
  getNavigationItems,
  type NavigationItem,
  type NavigationLink,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const HeaderNavigation = memo(function HeaderNavigation({
  usedTags,
}: {
  usedTags: string[];
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <nav className="flex items-center gap-1 font-semibold text-sm md:text-base">
        {getNavigationItems(usedTags).map((item) => {
          // 사이드바에도 있는 메뉴라 모바일에서는 숨긴다. 아이콘 하나로 자리를 적게 차지하는 검색만 남긴다.
          const visibility = item.icon ? undefined : "hidden md:block";

          return item.links ? (
            <NavigationDropdown
              key={item.label}
              label={item.label}
              ariaLabel={item.ariaLabel}
              links={item.links}
              className={visibility}
            />
          ) : (
            <NavigationLinkItem
              key={item.label}
              item={item}
              className={visibility}
            />
          );
        })}
      </nav>
    </TooltipProvider>
  );
});

/** trailingSlash 설정 탓에 usePathname()은 끝에 /를 달고 온다. */
function isSamePath(pathname: string, href: string): boolean {
  return trimEnd(pathname, "/") === href;
}

function ActiveUnderline() {
  return (
    <span
      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary"
      aria-hidden="true"
    />
  );
}

function NavigationLinkItem({
  item,
  className,
}: {
  item: Extract<NavigationItem, { href: string }>;
  className?: string;
}) {
  const pathName = usePathname();
  const isActive = isSamePath(pathName, item.href);
  const Icon = item.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          target={item.target}
          className={cn(
            "relative rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground",
            isActive && "text-foreground",
            className,
          )}
          aria-label={item.ariaLabel}
          aria-current={isActive ? "page" : undefined}
          rel={item.rel}
        >
          {Icon ? (
            <Icon height={20} width={20} className="h-5 w-5" />
          ) : (
            item.label
          )}
          {isActive && <ActiveUnderline />}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-52 text-center">
        <span className="font-semibold">{item.label}</span>
        <span className="block font-normal opacity-80">{item.description}</span>
      </TooltipContent>
    </Tooltip>
  );
}

function NavigationDropdown({
  label,
  ariaLabel,
  links,
  className,
}: {
  label: string;
  ariaLabel: string;
  links: NavigationLink[];
  className?: string;
}) {
  const pathName = usePathname();
  const isActive = links.some((link) => isSamePath(pathName, link.href));

  return (
    <div className={cn("group relative", className)}>
      {/*
        focus-within은 클릭에도 걸려 마우스를 치워도 메뉴가 열린 채 남으므로 focus-visible로 연다.
        터치 기기에서는 이 메뉴가 숨고 사이드바 트리가 같은 역할을 한다.
      */}
      <button
        type="button"
        aria-label={ariaLabel}
        aria-current={isActive ? "page" : undefined}
        aria-haspopup="menu"
        className={cn(
          "relative rounded-md px-2 py-1 text-muted-foreground transition-colors group-hover:text-foreground group-has-focus-visible:text-foreground",
          isActive && "text-foreground",
        )}
      >
        {label}
        {isActive && <ActiveUnderline />}
      </button>
      {/* 트리거와 메뉴 사이가 끊기면 호버가 풀리므로 여백 없이 붙인다. */}
      <div
        className={cn(
          "invisible absolute top-full left-1/2 z-40 w-52 -translate-x-1/2 pt-1 opacity-0 transition-[opacity,visibility] duration-150",
          "group-hover:visible group-hover:opacity-100 group-has-focus-visible:visible group-has-focus-visible:opacity-100",
        )}
      >
        <ul className="overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg">
          {links.map((link) => {
            const isCurrent = isSamePath(pathName, link.href);
            return (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-md px-3 py-2 transition-colors hover:bg-accent",
                    isCurrent
                      ? "bg-accent/60 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <span className="block font-medium text-sm">
                    {link.label}
                  </span>
                  <span className="mt-0.5 block font-normal text-muted-foreground/70 text-xs leading-snug">
                    {link.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
