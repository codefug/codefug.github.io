"use client";

import { useMemo } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { HeroIdentity } from "./hero-identity";
import { HeroTerminal } from "./hero-terminal";

interface HeroSectionProps {
  postCount: number;
}

function useFullWidthStyle() {
  const { state, isMobile } = useSidebar();
  const sidebarOpen = state === "expanded" && !isMobile;
  return useMemo(
    () =>
      sidebarOpen
        ? {
            width: "calc(100vw - var(--sidebar-width))",
            marginLeft: "calc(50% - 50vw + var(--sidebar-width) / 2)",
          }
        : {
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
          },
    [sidebarOpen],
  );
}

export function HeroSection({ postCount }: HeroSectionProps) {
  const fullWidthStyle = useFullWidthStyle();

  return (
    <section
      className="relative min-h-[85vh] overflow-hidden transition-[width,margin] duration-200 ease-linear"
      style={fullWidthStyle}
    >
      <HeroBackground />
      <div className="relative z-10 flex min-h-[85vh] items-center px-4">
        <div className="mx-auto grid w-full max-w-[1368px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <HeroIdentity postCount={postCount} />
          <HeroTerminal postCount={postCount} />
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, currentColor 10%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-400/15 blur-[100px] dark:bg-violet-500/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-1/4 h-[300px] w-[300px] translate-x-1/3 rounded-full bg-blue-400/10 blur-[80px] dark:bg-blue-500/8"
        aria-hidden="true"
      />
    </>
  );
}
