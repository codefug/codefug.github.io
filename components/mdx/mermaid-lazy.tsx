"use client";

import dynamic from "next/dynamic";

// 머메이드는 무거우므로 다이어그램이 실제로 렌더될 때만 불러온다.
// mdx-components.tsx는 클라이언트 파일이 아니라 dynamic()을 직접 못 쓴다.
const MermaidLazy = dynamic(() => import("./mermaid"), {
  loading: () => (
    <div className="my-6 h-40 animate-pulse rounded-lg bg-muted/40" />
  ),
});

export default MermaidLazy;
