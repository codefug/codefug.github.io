"use client";

import { Menu, Search } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import SidebarButton from "../../sidebar/sidebar-button";
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
  return (
    <header
      className={cn(
        headerVariant({ isShow, isShowVerticalScrollbar }),
        "print:hidden",
      )}
    >
      <div className="flex items-center justify-between gap-6 p-4">
        <section className="flex items-center gap-4">
          <SideBarToggleButton />
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
          <HeaderNavigation />
          <LanguageSelector />
          <HeaderSwitch />
        </section>
      </div>
      {isShowVerticalScrollbar && <HorizontalScrollbar />}
    </header>
  );
}

const HeaderNavigation = memo(function HeaderNavigation() {
  const pathName = usePathname();
  const t = useTranslations("navigation.aria");

  return (
    <nav className="flex items-center gap-4 font-semibold text-sm md:text-base">
      {NAVIGATION_ITEMS.map((item) => (
        <Link
          href={item.href}
          target={item.target}
          key={item.label}
          passHref
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathName === item.href && "text-black dark:text-white",
          )}
          aria-label={t(
            item.label.toLowerCase() as "resume" | "portfolio" | "search",
          )}
          rel={item.rel}
        >
          {item.label === "Search" ? (
            <Search height={20} width={20} className="h-5 w-5" />
          ) : (
            item.label
          )}
        </Link>
      ))}
    </nav>
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
