import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// 빌드마다 같은 색이 나와야 하므로 난수 대신 글 id 해시로 색조를 고른다.
function hueOf(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h % 360;
}

export function ThumbnailFrame({
  seed,
  compact = false,
  className,
  children,
}: {
  seed: string;
  compact?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const hue = hueOf(seed);
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden bg-muted/40",
        className,
      )}
      style={{ "--thumb-hue": hue } as CSSProperties}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -left-1/4 h-[130%] w-3/4 rounded-full bg-[hsl(var(--thumb-hue)_90%_60%/0.35)] blur-3xl transition-transform duration-700 group-hover:scale-125"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1/4 -bottom-1/3 h-[120%] w-2/3 rounded-full bg-[hsl(calc(var(--thumb-hue)+70)_90%_60%/0.3)] blur-3xl transition-transform duration-700 group-hover:scale-125"
      />
      {!compact && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:22px_22px] opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
          />
          {/* 클래스 정렬이 url 안의 공백을 쪼개므로 inline style로 둔다. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{ backgroundImage: GRAIN }}
          />
        </>
      )}
      {children}
    </div>
  );
}
