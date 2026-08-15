import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 이력서 A4 한 장.
 *
 * 인쇄 시 이 컴포넌트 하나가 정확히 A4 한 페이지가 된다.
 * 페이지를 나누려면 `<ResumePage>` 를 하나 더 추가하기만 하면 되고,
 * 내용을 옮기려면 두 ResumePage 사이에서 섹션을 잘라 옮기면 된다.
 *
 * 화면에서는 종이처럼 보이도록 흰 배경과 그림자를 주고,
 * 인쇄할 때는 그 장식을 걷어낸다.
 */
export function ResumePage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        // A4 = 210mm × 297mm. 화면에서는 폭만 맞추고 높이는 내용에 맡긴다.
        "mx-auto w-full max-w-[210mm] bg-white text-black",
        // 화면에서는 실제 종이처럼 테두리와 그림자를 준다.
        "rounded-lg border border-gray-300 px-[14mm] py-[12mm] shadow-md",
        // 인쇄: 종이 위에 종이를 그릴 이유가 없으므로 장식을 전부 걷어낸다.
        // 여백은 @page가 담당하므로 자체 패딩도 없앤다.
        //
        // 높이를 297mm(A4 전체)로 잡으면 @page 여백만큼 넘쳐서 다음 장으로 밀린다.
        // 실제로 쓸 수 있는 영역은 297mm에서 상하 여백(12mm × 2)을 뺀 273mm다.
        //
        // 내용이 넘치면 잘라내지 않고 다음 장으로 흘려보낸다.
        // 조용히 잘리는 것보다 페이지가 하나 늘어나는 편이 알아채기 쉽다.
        "print:m-0 print:h-[273mm] print:max-w-none",
        "print:rounded-none print:border-0 print:p-0 print:shadow-none",
        // 페이지 경계: 이 블록이 끝나면 다음 장으로 넘긴다.
        "print:break-after-page print:last:break-after-auto",
        className,
      )}
    >
      {/*
        화면에서만 보이는 A4 경계선.
        인쇄했을 때 이 선 아래는 다음 장으로 넘어가므로,
        수정하면서 넘치는지 바로 확인할 수 있다.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 mx-[-14mm] border-red-400/30 border-t border-dashed print:hidden"
        style={{ top: "273mm" }}
        aria-hidden="true"
      />
      {children}
    </section>
  );
}

/**
 * 페이지 중간에서 잘리면 안 되는 덩어리.
 * 프로젝트 카드처럼 제목과 내용이 떨어지면 읽기 어려운 것을 감싼다.
 */
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
