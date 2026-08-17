import { PenLine, Sparkles } from "lucide-react";

/**
 * 아직 글이 없는 자리를 비워두면 "만들다 만 페이지"처럼 보인다.
 * 무엇을 준비하고 있는지 알려주는 카드로 그 자리를 채운다.
 */
export function UpcomingCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 border-dashed bg-muted/30 px-6 py-12 text-center">
      {/* 배경 장식 — 시선을 끌지 않을 만큼만 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative flex flex-col items-center">
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PenLine className="h-5 w-5" aria-hidden />
        </span>
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1 font-medium text-muted-foreground text-xs">
          <Sparkles className="h-3 w-3 text-primary" aria-hidden />
          {badge}
        </span>
        <h2 className="mb-2 text-balance font-bold text-lg">{title}</h2>
        <p className="mx-auto max-w-md text-balance text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
