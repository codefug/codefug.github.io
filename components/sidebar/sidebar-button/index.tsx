"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export default function SidebarButton({ children }: { children: ReactNode }) {
  const t = useTranslations("common.aria");
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent hover:text-black hover:dark:text-white"
      aria-label={t("sidebarToggle")}
      aria-expanded={false}
    >
      {children}
    </button>
  );
}
