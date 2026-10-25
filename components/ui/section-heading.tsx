import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 왼쪽에 primary 색 막대를 세운 섹션 제목. 홈의 섹션과 검색 결과 제목이 같이 쓴다. */
export function SectionHeading({
  as: Heading = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className="h-5 w-1 shrink-0 rounded-full bg-primary"
        aria-hidden="true"
      />
      <Heading className="font-bold text-foreground text-lg md:text-xl">
        {children}
      </Heading>
    </div>
  );
}
