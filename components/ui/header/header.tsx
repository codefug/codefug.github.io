"use client";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { POSTS } from "@/constants/path";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";
import SidebarButton from "../../sidebar/sidebar-button";
import { useSidebar } from "../sidebar";
import Switch from "../switch";
import headerVariant from "./variant";

export default function Header() {
  const { showFloatingHeader: isShow } = useShowFloatingHeader();
  const pathName = usePathname();
  const isShowVerticalScrollbar = useMemo(
    () => pathName.includes(POSTS),
    [pathName],
  );
  return (
    <header className={cn(headerVariant({ isShow, isShowVerticalScrollbar }))}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 py-4">
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
              height={0}
              width={0}
              className="h-7 w-full"
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
      {isShowVerticalScrollbar && <VerticalScrollbar />}
    </header>
  );
}

const HeaderNavigation = memo(function HeaderNavigation() {
  const pathName = usePathname();

  return (
    <nav className="flex items-center gap-4 text-sm font-semibold md:text-base">
      {NAVIGATION_ITEMS.map((item) => (
        <Link
          href={item.href}
          passHref
          key={item.label}
          className={cn(
            `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg`,
            pathName === item.href && "text-black dark:text-white",
          )}
        >
          {item.label}
        </Link>
      ))}
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
  const { state } = useSidebar();
  return (
    <div className="ml-2">
      <SidebarButton>
        {state === "expanded" ? (
          <PanelLeftClose size={20} />
        ) : (
          <PanelLeftOpen size={20} />
        )}
      </SidebarButton>
    </div>
  );
});

const VerticalScrollbar = memo(function VerticalScrollbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#f00", "#0f0", "#00f"],
  );

  return (
    <motion.div
      className="h-2 origin-left"
      style={{
        scaleX,
        backgroundColor,
      }}
    />
  );
});

const useShowFloatingHeader = () => {
  const [showFloatingHeader, setShowFloatingHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤 방향이 위쪽일 때 (이전 스크롤 위치보다 현재가 작을 때)
      if (currentScrollY < lastScrollY) setShowFloatingHeader(true);
      else setShowFloatingHeader(false);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return { showFloatingHeader };
};
