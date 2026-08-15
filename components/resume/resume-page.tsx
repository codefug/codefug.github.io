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
        // 크기를 A4로 고정한다. 내용이 적어도 한 장은 한 장이므로,
        // 화면에서도 항상 종이 한 장 크기로 보여 인쇄 결과를 그대로 가늠할 수 있다.
        // 화면이 좁아지면 줄어드는 대신 가로 스크롤이 생긴다.
        //
        // h가 아니라 min-h인 이유: 내용이 넘칠 때 잘라내지 않고 다음 장으로 흘려보낸다.
        // 조용히 잘리는 것보다 페이지가 하나 늘어나는 편이 알아채기 쉽다.
        "relative mx-auto min-h-[297mm] w-[210mm] shrink-0 bg-white text-black",
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
        컨테이너 자체가 A4 한 장 크기이므로 아래 테두리가 곧 페이지 경계다.
        내용이 이 테두리를 넘어가면 인쇄 시 다음 장으로 밀린다는 뜻이다.
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
