"use client";

import { Menu, Search } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { NAVIGATION_ITEMS, type NavigationLabel } from "@/constants/navigation";
import { isSidebarOffPath, PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import SidebarButton from "../../sidebar/sidebar-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { LanguageSelector } from "./language-selector";
import { HeaderSwitch } from "./switch";
import headerVariant from "./variant";

export default function Header() {
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
          <HeaderNavigation hideDuplicatesOnMobile={!isSidebarOff} />
          <LanguageSelector />
          <HeaderSwitch />
        </section>
      </div>
      {isShowVerticalScrollbar && <HorizontalScrollbar />}
    </header>
  );
}

const HeaderNavigation = memo(function HeaderNavigation({
  hideDuplicatesOnMobile,
}: {
  hideDuplicatesOnMobile: boolean;
}) {
  const pathName = usePathname();
  const t = useTranslations("navigation");

  return (
    <TooltipProvider delayDuration={150}>
      <nav className="flex items-center gap-1 font-semibold text-sm md:text-base">
        {NAVIGATION_ITEMS.map((item) => {
          const key = item.label.toLowerCase() as Lowercase<NavigationLabel>;
          const isActive = pathName === item.href;
          // 사이드바가 있는 화면에서는 모바일에서 같은 메뉴가 두 번 보이지 않게 한다.
          // 검색은 아이콘이고 자주 쓰는 동작이라 예외로 남긴다.
          const isDuplicated =
            hideDuplicatesOnMobile && item.label !== "Search";

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
      className="h-2 origin-left bg-primary"
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
