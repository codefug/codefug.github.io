"use client";

import { Menu, Search } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  getSectionChildren,
  NAVIGATION_ITEMS,
  type NavigationLabel,
} from "@/constants/navigation";
import { isSidebarOffPath, PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import SidebarButton from "../../sidebar/sidebar-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { HeaderSwitch } from "./switch";
import headerVariant from "./variant";

export default function Header({ usedTags }: { usedTags: string[] }) {
  const t = useTranslations("common.aria");
  const { showFloatingHeader: isShow } = useShowFloatingHeader();
  const pathName = usePathname();
  const isShowVerticalScrollbar = useMemo(
    () => pathName.includes(PATH.POSTS),
    [pathName],
  );
  // 사이드바가 없는 페이지에서는 여는 버튼도 보이지 않아야 한다.
  const isSidebarOff = useMemo(() => isSidebarOffPath(pathName), [pathName]);
  return (
    <>
      {/*
        진행률 바를 헤더 안에 두면, 아래로 스크롤해 헤더가 숨을 때 같이 사라진다.
        읽는 동안 보여야 하는 것이므로 헤더 밖에 따로 고정한다.
      */}
      {isShowVerticalScrollbar && <HorizontalScrollbar />}
      <header
        className={cn(
          headerVariant({ isShow, isShowVerticalScrollbar }),
          "print:hidden",
        )}
      >
        <div className="flex items-center justify-between gap-6 p-4">
          <section className="flex items-center gap-4">
            {!isSidebarOff && <SideBarToggleButton />}
            <Link
              href={PATH.HOME}
              passHref
              className="flex shrink-0 items-center transition-opacity hover:opacity-75"
              aria-label={t("logo")}
            >
              <span className="font-black text-lg tracking-tight">
                <span className="text-foreground">code</span>
                <span className="bg-linear-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                  fug
                </span>
              </span>
            </Link>
          </section>
          <section className="flex items-center gap-4 font-semibold text-sm md:text-base">
            <HeaderNavigation
              hideDuplicatesOnMobile={!isSidebarOff}
              usedTags={usedTags}
            />
            <HeaderSwitch />
          </section>
        </div>
      </header>
    </>
  );
}

const HeaderNavigation = memo(function HeaderNavigation({
  hideDuplicatesOnMobile,
  usedTags,
}: {
  hideDuplicatesOnMobile: boolean;
  usedTags: string[];
}) {
  const pathName = usePathname();
  const t = useTranslations("navigation");
  const tc = useTranslations("categories");
  const usedTagSet = useMemo(() => new Set(usedTags), [usedTags]);

  return (
    <TooltipProvider delayDuration={150}>
      <nav className="flex items-center gap-1 font-semibold text-sm md:text-base">
        {NAVIGATION_ITEMS.map((item) => {
          const key = item.label.toLowerCase() as Lowercase<NavigationLabel>;
          const isActive = item.href ? isSamePath(pathName, item.href) : false;
          // 사이드바가 있는 화면에서는 모바일에서 같은 메뉴가 두 번 보이지 않게 한다.
          // 검색은 아이콘이고 자주 쓰는 동작이라 예외로 남긴다.
          const isDuplicated =
            hideDuplicatesOnMobile && item.label !== "Search";

          if (item.section || item.links) {
            const entries = item.links
              ? item.links.map((link) => ({
                  id: link.key,
                  href: link.href,
                  label: t(`menu.${link.key}.label`),
                  desc: t(`menu.${link.key}.description`),
                }))
              : getSectionChildren(item.section, usedTagSet).map((child) => ({
                  id: child.groupId,
                  href: child.href,
                  label: tc(`${child.groupId}.label`),
                  desc: tc(`${child.groupId}.description`),
                }));
            // 하위 카테고리에 글이 하나도 없으면 열 메뉴가 없다.
            if (entries.length === 0) return null;

            return (
              <NavigationDropdown
                key={item.label}
                label={item.label}
                messageKey={key}
                entries={entries}
                isDuplicated={isDuplicated}
              />
            );
          }

          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  target={item.target}
                  passHref
                  className={cn(
                    "relative rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "text-foreground",
                    isDuplicated && "hidden md:inline-block",
                  )}
                  aria-label={t(`aria.${key}`)}
                  aria-current={isActive ? "page" : undefined}
                  rel={item.rel}
                >
                  {item.label === "Search" ? (
                    <Search height={20} width={20} className="h-5 w-5" />
                  ) : (
                    item.label
                  )}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </TooltipTrigger>
              {/* 각 메뉴가 무엇을 보여주는 곳인지 한 줄로 설명한다. */}
              <TooltipContent side="bottom" className="max-w-52 text-center">
                <span className="font-semibold">{t(key)}</span>
                <span className="block font-normal opacity-80">
                  {t(`description.${key}`)}
                </span>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
});

/** trailingSlash 설정 탓에 usePathname()은 끝에 /를 달고 온다. */
function isSamePath(pathname: string, href: string): boolean {
  return pathname.replace(/\/$/, "") === href;
}

export type DropdownEntry = {
  id: string;
  href: string;
  label: string;
  desc: string;
};

/**
 * 자기 페이지 없이 하위 항목으로만 들어가는 메뉴.
 * 하위 항목이 카테고리든 고정 링크든 여기서는 같은 모양으로 받는다.
 */
const NavigationDropdown = memo(function NavigationDropdown({
  label,
  messageKey,
  entries,
  isDuplicated,
}: {
  label: string;
  messageKey: Lowercase<NavigationLabel>;
  entries: DropdownEntry[];
  isDuplicated: boolean;
}) {
  const pathName = usePathname();
  const t = useTranslations("navigation");
  const isActive = entries.some((entry) => isSamePath(pathName, entry.href));

  return (
    <div className={cn("group relative", isDuplicated && "hidden md:block")}>
      {/*
        호버와 키보드 포커스로만 연다. focus-within은 클릭에도 걸려서
        한 번 누른 뒤 마우스를 치워도 메뉴가 열린 채로 남으므로,
        키보드 이동에만 반응하는 focus-visible로 본다.
        터치 기기에서는 이 메뉴가 숨고 사이드바 트리가 같은 역할을 한다.
      */}
      <button
        type="button"
        aria-label={t(`aria.${messageKey}`)}
        aria-current={isActive ? "page" : undefined}
        aria-haspopup="menu"
        className={cn(
          "relative rounded-md px-2 py-1 text-muted-foreground transition-colors group-hover:text-foreground group-has-focus-visible:text-foreground",
          isActive && "text-foreground",
        )}
      >
        {label}
        {isActive && (
          <span
            className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary"
            aria-hidden="true"
          />
        )}
      </button>
      {/* 트리거와 메뉴 사이가 끊기면 호버가 풀리므로 여백 없이 붙인다. */}
      <div
        className={cn(
          "invisible absolute top-full left-1/2 z-40 w-52 -translate-x-1/2 pt-1 opacity-0 transition-[opacity,visibility] duration-150",
          "group-hover:visible group-hover:opacity-100 group-has-focus-visible:visible group-has-focus-visible:opacity-100",
        )}
      >
        <ul className="overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg">
          {entries.map((entry) => {
            const isCurrent = isSamePath(pathName, entry.href);
            return (
              <li key={entry.id}>
                <Link
                  href={entry.href}
                  className={cn(
                    "block rounded-md px-3 py-2 transition-colors hover:bg-accent",
                    isCurrent
                      ? "bg-accent/60 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <span className="block font-medium text-sm">
                    {entry.label}
                  </span>
                  <span className="mt-0.5 block font-normal text-muted-foreground/70 text-xs leading-snug">
                    {entry.desc}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

const SideBarToggleButton = memo(function SideBarToggleButton() {
  return (
    <SidebarButton>
      <Menu size={20} />
    </SidebarButton>
  );
});

const HorizontalScrollbar = memo(function VerticalScrollbar() {
  const { scrollYProgress } = useScroll();
  const progress = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => progress.set(v));
    return () => unsubscribe();
  }, [scrollYProgress, progress]);

  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-2 origin-left bg-primary print:hidden"
      style={{
        scaleX,
      }}
    />
  );
});

const useShowFloatingHeader = () => {
  const [showFloatingHeader, setShowFloatingHeader] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          const isScrollingUp = currentScrollY < lastScrollY.current;

          if (isScrollingUp || currentScrollY < 70) setShowFloatingHeader(true);
          else if (isScrollingDown) setShowFloatingHeader(false);

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { showFloatingHeader };
};
