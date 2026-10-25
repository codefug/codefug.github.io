import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 인쇄 시 A4 한 장. 화면과 인쇄가 같아 보이도록 종이 장식만 인쇄에서 뺀다. */
export function ResumePage({
  children,
  pageNumber,
  pageCount,
  scale,
}: {
  children: ReactNode;
  /** 본문 패딩 바깥(아래 여백)에 찍어 내용 영역을 먹지 않는다. */
  pageNumber: number;
  pageCount: number;
  /** 본문 배율(zoom). 인쇄 CSS가 transform을 막아 zoom을 쓴다. */
  scale: number;
}) {
  return (
    <section
      className={cn(
        // min-h가 아니라 h: 높이를 고정해야 한 장을 넘친 내용이 화면에서 보인다.
        "relative mx-auto h-[297mm] w-[210mm] shrink-0 bg-white text-black",
        "rounded-lg border border-gray-300 px-[11mm] py-[10mm] shadow-md",
        // 인쇄에서도 패딩은 남긴다. 없애면 본문 폭이 달라져 줄바꿈이 화면과 어긋난다.
        "print:m-0 print:rounded-none print:border-0 print:shadow-none",
        "print:break-after-page print:last:break-after-auto",
      )}
    >
      <div style={{ zoom: scale }}>{children}</div>
      <span
        aria-hidden
        className="absolute right-[11mm] bottom-[4mm] text-[8.5px] text-gray-400"
      >
        {pageNumber} / {pageCount}
      </span>
    </section>
  );
}

export function KeepTogether({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("print:break-inside-avoid", className)}>{children}</div>
  );
}
