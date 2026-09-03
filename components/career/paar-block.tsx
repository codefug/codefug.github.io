import { RichText } from "@/components/resume/rich-text";
import { cn } from "@/lib/utils";

/**
 * 경력기술서의 한 꼭지.
 *
 * 문제 → 판단 → 실행 → 결과 순서로 쓰고, 필요하면 회고를 뒤에 붙인다.
 * PAAR 라벨은 붙이지 않는다. 읽는 사람에게 필요한 건 네 가지가 담겼다는
 * 사실이지 형식의 이름이고, 라벨을 달면 서술이 아니라 채워 넣은 양식처럼 읽힌다.
 *
 * 대신 각 단계에 이름을 준다. 판단(Approach)이 이 문서의 승부처라
 * 어디가 판단인지는 보이는 편이 낫다.
 */

export type Alternative = {
  /** A, B, C … 선택지 기호 */
  key: string;
  label: string;
  /** 채택 여부. 채택된 안은 강조한다. */
  chosen?: boolean;
  reason: string;
};

export type PaarItem = {
  title: string;
  /**
   * 이 항목의 결정을 한 줄로 압축한 것. 제목 바로 아래에 둔다.
   *
   * 제목은 이력서와 같게 두어 두 문서를 대조하기 쉽게 하는 대신,
   * 이 한 줄로 "무엇을 골랐는가"를 앞세워 이력서와 다른 문서임을 보인다.
   */
  decision?: string;
  /** 수행한 역할. "단독 설계 및 구현", "제안 및 이관" 형태. 기간은 적지 않는다. */
  meta?: string;
  problem?: string;
  /** 검토한 선택지들. 표로 보여준다. */
  alternatives?: Alternative[];
  /** 무엇이 대안을 갈랐는가. 실제 판단력이 드러나는 자리다. */
  rationale?: string;
  /** 실행 항목. 여러 줄이라 배열로 받는다. */
  actions?: string[];
  /** 결과. 수치가 있는 항목이 먼저 오도록 쓴다. */
  results?: string[];
  /** 구조적 원인과 다음엔 무엇을 다르게 할지. 없으면 생략된다. */
  retrospective?: string;
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mt-1.5 mb-0.5 font-semibold text-[9.5px] text-primary/70 uppercase tracking-wider">
      {children}
    </p>
  );
}

function Bullets({ items, strong }: { items: string[]; strong?: boolean }) {
  return (
    <ul className="space-y-[3px]">
      {items.map((text) => (
        <li key={text} className="flex gap-1.5">
          <span
            aria-hidden
            className={cn(
              "mt-[6px] size-[3px] shrink-0 rounded-full",
              strong ? "bg-primary" : "bg-gray-400",
            )}
          />
          <p
            className={cn(
              "min-w-0 flex-1 text-[11px] leading-[1.6]",
              strong ? "font-medium text-gray-900" : "text-gray-700",
            )}
          >
            <RichText>{text}</RichText>
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * 검토한 선택지 목록.
 *
 * 각 항목이 "선택지 — 판단" 한 쌍의 서술이라 표가 아니라 목록으로 둔다.
 * 표만 있으면 교과서적 비교로 읽히므로 아래에 rationale을 붙여 쓴다.
 * 채택된 안은 배경과 굵기로 구분해, 훑어볼 때 결론이 먼저 보이게 한다.
 */
function AlternativeTable({ items }: { items: Alternative[] }) {
  return (
    <ul className="space-y-[3px]">
      {items.map((alt) => (
        <li
          key={alt.key}
          className={cn(
            "flex gap-2 rounded px-1.5 py-[3px]",
            alt.chosen && "bg-primary/[0.07]",
          )}
        >
          <span
            className={cn(
              "mt-[1px] shrink-0 font-bold text-[10px]",
              alt.chosen ? "text-primary" : "text-gray-400",
            )}
          >
            {alt.key}
            {/* 채택 여부를 색과 굵기로만 두면 읽는 도구에는 전해지지 않는다. */}
            {alt.chosen && <span className="sr-only"> (채택)</span>}
          </span>
          <p className="min-w-0 flex-1 text-[11px] leading-[1.6]">
            <span
              className={cn(
                "font-semibold",
                alt.chosen ? "text-gray-900" : "text-gray-600",
              )}
            >
              {alt.label}
            </span>
            <span className="text-gray-400"> — </span>
            <span className="text-gray-700">
              <RichText>{alt.reason}</RichText>
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function PaarBlock({
  item,
  className,
}: {
  item: PaarItem;
  className?: string;
}) {
  return (
    <article className={cn("break-inside-avoid", className)}>
      <header>
        <h4 className="font-semibold text-[12.5px] text-gray-900 leading-snug">
          <RichText>{item.title}</RichText>
        </h4>
        {item.decision && (
          <p className="mt-[3px] font-medium text-[11px] text-primary leading-[1.5]">
            <RichText>{item.decision}</RichText>
          </p>
        )}
        {item.meta && (
          <p className="mt-[3px] text-[10px] text-gray-500">{item.meta}</p>
        )}
      </header>

      {item.problem && (
        <>
          <SectionLabel>문제</SectionLabel>
          <p className="text-[11px] text-gray-700 leading-[1.6]">
            <RichText>{item.problem}</RichText>
          </p>
        </>
      )}

      {(item.alternatives || item.rationale) && (
        <>
          <SectionLabel>검토와 판단</SectionLabel>
          {item.alternatives && <AlternativeTable items={item.alternatives} />}
          {item.rationale && (
            <p
              className={cn(
                "text-[11px] text-gray-700 leading-[1.6]",
                item.alternatives && "mt-1.5",
              )}
            >
              <RichText>{item.rationale}</RichText>
            </p>
          )}
        </>
      )}

      {item.actions && (
        <>
          <SectionLabel>실행</SectionLabel>
          <Bullets items={item.actions} />
        </>
      )}

      {item.results && (
        <>
          <SectionLabel>결과</SectionLabel>
          <Bullets items={item.results} strong />
        </>
      )}

      {item.retrospective && (
        <p className="mt-2 border-gray-300 border-l-2 pl-2 text-[10.5px] text-gray-600 leading-[1.6]">
          <span className="font-semibold">회고 </span>
          <RichText>{item.retrospective}</RichText>
        </p>
      )}
    </article>
  );
}
