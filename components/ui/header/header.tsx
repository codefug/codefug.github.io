"use client";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { POST_PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import SidebarButton from "../../sidebar/sidebar-button";
import { useSidebar } from "../sidebar";
import Switch from "../switch";
import headerVariant from "./variant";

export default function Header() {
  const { showFloatingHeader: isShow } = useShowFloatingHeader();
  const pathName = usePathname();
  const isShowVerticalScrollbar = useMemo(
    () => pathName.includes(POST_PATH),
    [pathName],
  );
  return (
    <header className={cn(headerVariant({ isShow, isShowVerticalScrollbar }))}>
      <div className="flex items-center justify-between gap-6 py-4">
        <section className="flex items-center gap-4">
          <SideBarToggleButton />
          <Link
            href="/"
            passHref
            className="flex flex-shrink-0 items-center gap-2 hover:opacity-95 hover:drop-shadow-lg"
          >
            <Image
              src="/images/main-logo.png"
              alt="logo"
              height={28}
              width={28}
              sizes="28px"
            />
            <div className="hidden whitespace-nowrap text-lg font-bold text-black dark:text-white md:block">
              Codefug Blog
            </div>
          </Link>
        </section>
        <section className="flex items-center gap-4 text-sm font-semibold md:text-base">
          <HeaderNavigation />
          <HeaderSwitch />
        </section>
      </div>
      {isShowVerticalScrollbar && <HorizontalScrollbar />}
    </header>
  );
}

const HeaderNavigation = memo(function HeaderNavigation() {
  const pathName = usePathname();

  return (
    <nav className="flex items-center gap-4 text-sm font-semibold md:text-base">
      {NAVIGATION_ITEMS.map((item) => {
        switch (item.label) {
          case "Portfolio":
            return (
              <a
                href="https://www.figma.com/proto/KSWARGDkXi9Wt8ARq2uGCa/leeseounghyun-resume?node-id=401-2&node-type=canvas&t=z2H9bL74afXrrgPS-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1"
                target="_blank"
                key={item.label}
                className={cn(
                  `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg dark:hover:text-white`,
                  pathName === item.href && "text-black dark:text-white",
                )}
              >
                {item.label}
              </a>
            );
          case "About":
            return (
              <Link
                href={item.href}
                passHref
                key={item.label}
                className={cn(
                  `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg dark:hover:text-white`,
                  pathName === item.href && "text-black dark:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          case "Search":
            return (
              <Link
                href={item.href}
                passHref
                key={item.label}
                className={cn(
                  `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg dark:hover:text-white`,
                  pathName === item.href && "text-black dark:text-white",
                )}
              >
                <Search height={20} width={20} className="h-5 w-5" />
              </Link>
            );
          default:
            throw new Error("올바르지 않은 아이템 입니다 - HeaderNavigation");
        }
      })}
    </nav>
  );
});

const HeaderSwitch = memo(function HeaderSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") setIsChecked(true);
    else setIsChecked(false);
  }, [theme]);

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={() =>
        theme === "light" ? setTheme("dark") : setTheme("light")
      }
    />
  );
});

const SideBarToggleButton = memo(function SideBarToggleButton() {
  const { isMobile, state } = useSidebar();
  const isNeedCloseButton = useMemo(
    () => state === "expanded" && !isMobile,
    [state, isMobile],
  );
  return (
    <div className="ml-2">
      <SidebarButton>
        {isNeedCloseButton ? (
          <PanelLeftClose size={20} />
        ) : (
          <PanelLeftOpen size={20} />
        )}
      </SidebarButton>
    </div>
  );
});

const HorizontalScrollbar = memo(function VerticalScrollbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
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
