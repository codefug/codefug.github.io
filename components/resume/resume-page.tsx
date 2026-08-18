import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 이력서 A4 한 장.
 *
 * ResumePage 하나가 인쇄 시 정확히 A4 한 페이지가 된다.
 * 페이지를 나누려면 ResumePage를 하나 더 추가하고,
 * 내용을 옮기려면 두 ResumePage 사이에서 섹션을 잘라 옮기면 된다.
 *
 * 화면과 인쇄가 같아 보이는 것이 목표라, 크기·간격은 두 매체에서 동일하게 두고
 * 종이 장식(테두리·그림자)만 인쇄에서 제거한다.
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
        /*
          크기를 A4로 고정한다. 이 컨테이너 한 개가 종이 한 장이므로,
          화면에서도 항상 같은 크기로 보여 인쇄 결과를 그대로 가늠할 수 있다.

          min-h가 아니라 h인 이유: min-h로 두면 내용이 많을 때 컨테이너가 같이
          늘어나서 "한 장에 들어가는지"를 화면에서 알 수 없다. 높이를 붙잡아 둬야
          넘친 내용이 테두리를 넘어가는 것으로 눈에 보인다.
        */
        "relative mx-auto h-[297mm] w-[210mm] shrink-0 bg-white text-black",
        // 화면: 실제 종이처럼 테두리와 그림자를 준다.
        "rounded-lg border border-gray-300 px-[11mm] py-[10mm] shadow-md",
        // 인쇄: 종이 장식만 걷어내고 패딩은 그대로 둔다.
        // 패딩을 없애면 본문 폭이 달라져 줄바꿈이 화면과 어긋난다.
        "print:m-0 print:rounded-none print:border-0 print:shadow-none",
        // 이 블록이 끝나면 다음 장으로 넘긴다. 마지막 장 뒤에는 빈 장을 만들지 않는다.
        "print:break-after-page print:last:break-after-auto",
        className,
      )}
    >
      {/*
        컨테이너 아래 테두리가 곧 페이지 경계다.
        내용이 넘치면 이 영역을 벗어나 아래로 삐져나오므로 화면에서 바로 보인다.
        (인쇄에서는 그 지점부터 다음 장으로 넘어간다)
      */}
      {children}
    </section>
  );
}

/**
 * 페이지 중간에서 잘리면 안 되는 덩어리.
 * 제목과 내용이 떨어지면 읽기 어려운 카드류를 감싼다.
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
