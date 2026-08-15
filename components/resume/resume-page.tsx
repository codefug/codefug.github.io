import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A4 한 장의 높이. 좌우·상하 여백은 컨테이너 패딩이 담당한다. */
const PRINTABLE_HEIGHT = "297mm";

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
        // 폭을 A4로 고정한다. 화면이 좁아지면 줄어드는 대신 가로 스크롤이 생겨서,
        // 어떤 화면에서 보든 인쇄물과 같은 줄바꿈을 보게 된다.
        "relative mx-auto w-[210mm] shrink-0 bg-white text-black",
        // 화면: 실제 종이처럼 테두리와 그림자를 준다.
        "rounded-lg border border-gray-300 px-[14mm] py-[12mm] shadow-md",
        // 인쇄: 종이 장식만 걷어내고 패딩은 그대로 둔다.
        // 패딩을 없애면 본문 폭이 달라져 줄바꿈이 화면과 어긋난다.
        "print:m-0 print:rounded-none print:border-0 print:shadow-none",
        // @page 여백을 0으로 두고 이 패딩이 여백 역할을 하므로, 높이는 A4 전체를 쓴다.
        // max-w는 인쇄에서도 210mm를 유지해야 본문 폭이 화면과 같아진다.
        //
        // h가 아니라 min-h인 이유: 내용이 넘칠 때 잘라내지 않고 다음 장으로 흘려보낸다.
        // 조용히 잘리는 것보다 페이지가 하나 늘어나는 편이 알아채기 쉽다.
        "print:min-h-[297mm]",
        // 이 블록이 끝나면 다음 장으로 넘긴다. 마지막 장 뒤에는 빈 장을 만들지 않는다.
        "print:break-after-page print:last:break-after-auto",
        className,
      )}
    >
      {/*
        화면에서만 보이는 A4 경계선.
        이 선 아래는 인쇄 시 다음 장으로 넘어가므로,
        내용을 수정하면서 넘치는지 바로 확인할 수 있다.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 border-red-400/40 border-t border-dashed print:hidden"
        style={{ top: PRINTABLE_HEIGHT }}
        aria-hidden="true"
      />
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
