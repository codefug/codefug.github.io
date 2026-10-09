import { RichText } from "@/components/resume/rich-text";
import { cn } from "@/lib/utils";

export type PaarItem = {
  title: string;
  meta?: string;
  problem: string;
  choice: string;
  actions: string[];
  results: string[];
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="pt-[2px] font-semibold text-[9.5px] text-primary/70 tracking-wider">
      {children}
    </p>
  );
}

export function Bullets({
  items,
  strong,
  className,
}: {
  items: string[];
  strong?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-[3px]", className)}>
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

function Paragraph({ children }: { children: string }) {
  return (
    <p className="text-[11px] text-gray-700 leading-[1.6]">
      <RichText>{children}</RichText>
    </p>
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
        {item.meta && (
          <p className="mt-[3px] text-[10px] text-gray-500">{item.meta}</p>
        )}
      </header>

      <div className="mt-1.5 grid grid-cols-[42px_1fr] gap-x-2 gap-y-1.5">
        <SectionLabel>문제</SectionLabel>
        <Paragraph>{item.problem}</Paragraph>

        <SectionLabel>선택</SectionLabel>
        <Paragraph>{item.choice}</Paragraph>

        <SectionLabel>실행</SectionLabel>
        <Bullets items={item.actions} />

        <SectionLabel>결과</SectionLabel>
        <Bullets items={item.results} strong />
      </div>
    </article>
  );
}
