"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
      <button
        type="button"
        onClick={() => onToggle("grid")}
        aria-label="그리드 뷰"
        aria-pressed={viewMode === "grid"}
        className={cn(
          "rounded-md p-1.5 transition-all duration-150 hover:cursor-pointer",
          viewMode === "grid"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <LayoutGrid size={16} />
      </button>
      <button
        type="button"
        onClick={() => onToggle("list")}
        aria-label="리스트 뷰"
        aria-pressed={viewMode === "list"}
        className={cn(
          "rounded-md p-1.5 transition-all duration-150 hover:cursor-pointer",
          viewMode === "list"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <List size={16} />
      </button>
    </div>
  );
}
