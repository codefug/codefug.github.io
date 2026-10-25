import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** 404나 오류처럼 본문 대신 상태를 알리는 화면. 홈 히어로와 같은 글자 위계를 쓴다. */
export function StatusMessage({
  illustration,
  code,
  title,
  description,
  children,
}: {
  /** public/images/status 아래의 장면 그림. 장식이라 스크린리더에서는 뺀다. */
  illustration: string;
  code: string;
  title: string;
  description: ReactNode;
  /** 다음에 할 수 있는 행동(링크, 버튼) */
  children: ReactNode;
}) {
  return (
    // 글 상세 레이아웃의 prose 스타일이 제목과 링크에 번지지 않게 끊는다.
    <section className="not-prose mx-auto grid w-full max-w-350 items-center gap-8 px-4 pt-10 pb-24 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-12 md:pt-20">
      <div>
        <p className="font-mono text-muted-foreground text-sm">{code}</p>
        <h1 className="mt-2 font-bold text-3xl tracking-tight md:text-4xl">
          {title}
        </h1>
        <div className="mt-4 max-w-xl break-keep text-foreground/80 leading-relaxed md:text-lg">
          {description}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {children}
        </div>
      </div>
      {/* 모바일에서는 그림을 먼저 보여 무슨 화면인지부터 알린다. */}
      <Image
        src={illustration}
        alt=""
        aria-hidden
        width={400}
        height={260}
        priority
        className="order-first h-auto w-full max-w-xs md:order-0 md:max-w-none"
      />
    </section>
  );
}

export function StatusLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
    >
      {children}
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
