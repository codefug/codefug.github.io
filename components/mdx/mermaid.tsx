"use client";

import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import OverlayModal from "./overlay-modal";

export default function Mermaid({ children }: { children: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const id = `mermaid-${Math.random().toString(36).substring(7)}`;
    const code = children.trim();
    let cancelled = false;

    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === "dark" ? "dark" : "default",
      // 라벨의 <br/> 줄바꿈에 loose가 필요하다. 입력이 저장소 안의 MDX뿐이라 감수한다.
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (cancelled) return;
        element.innerHTML = svg;
        setSvgContent(svg);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Mermaid rendering error:", error);
        element.innerHTML = `<pre class="text-destructive">Mermaid 렌더링 오류: ${error.message}</pre>`;
      });

    return () => {
      cancelled = true;
    };
  }, [children, resolvedTheme]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="my-6 flex w-full cursor-pointer justify-center overflow-x-auto rounded-lg bg-muted/40 p-4 transition-colors hover:bg-muted"
        aria-label="Click to view larger diagram"
      />
      {isModalOpen && (
        <OverlayModal
          onClose={() => setIsModalOpen(false)}
          className="bg-background p-6"
        >
          <div
            className="flex h-[80vh] justify-center"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid가 생성한 SVG
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </OverlayModal>
      )}
    </>
  );
}
