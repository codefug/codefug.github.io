"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarToggleButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md hover:bg-accent hover:text-foreground"
      aria-label={"사이드바 열기/닫기"}
      aria-expanded={false}
    >
      <Menu size={20} />
    </button>
  );
}
