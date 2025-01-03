"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { SidebarTrigger, useSidebar } from "./sidebar";
import Switch from "./switch";

export default function Header() {
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathName = usePathname();
  const { setTheme, theme } = useTheme();
  const { isMobile } = useSidebar();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    if (inputRef.current) {
      const search = inputRef.current.value;
      router.push(`/search?q=${search}`);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") setIsChecked(true);
    else setIsChecked(false);
  }, [theme]);

  return (
    <header className="fixed left-0 right-0 top-0 bg-background shadow-lg dark:shadow-white">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 p-4">
        <section className="flex items-center gap-4">
          {isMobile && <SidebarTrigger />}
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
            <div className="hidden whitespace-nowrap text-lg font-bold text-black dark:text-white lg:block">
              Codefug Blog
            </div>
          </Link>
        </section>
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            placeholder="Search Post"
            className="w-full truncate rounded-full bg-[#e5ebee] p-2 px-4 dark:bg-gray-700"
            ref={inputRef}
          />
        </form>
        {!isMobile && (
          <section className="flex items-center gap-4 text-sm font-semibold md:text-base">
            <Link
              href={NAVIGATION_ITEMS.portfolio.href}
              passHref
              className={cn(
                `hidden text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white md:block`,
                pathName === NAVIGATION_ITEMS.portfolio.href && "text-black",
              )}
            >
              {NAVIGATION_ITEMS.portfolio.label}
            </Link>
            <Link
              href={NAVIGATION_ITEMS.categories.href}
              passHref
              className={cn(
                `hidden text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white md:block`,
                pathName === NAVIGATION_ITEMS.categories.href && "text-black",
              )}
            >
              {NAVIGATION_ITEMS.categories.label}
            </Link>
            <Link
              href={NAVIGATION_ITEMS.about.href}
              passHref
              className={cn(
                `hidden text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white md:block`,
                pathName === NAVIGATION_ITEMS.about.href && "text-black",
              )}
            >
              {NAVIGATION_ITEMS.about.label}
            </Link>
          </section>
        )}
        <section className="flex items-center gap-4 text-sm font-semibold md:text-base">
          <Switch
            checked={isChecked}
            onCheckedChange={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
          />
        </section>
      </div>
    </header>
  );
}
