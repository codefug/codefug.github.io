"use client";

import dynamic from "next/dynamic";

// mdx-components.tsx는 클라이언트 파일이 아니라 dynamic()을 못 쓰므로 무거운 mermaid를 여기서 지연 로드한다.
const MermaidLazy = dynamic(() => import("./mermaid"), {
  loading: () => (
    <div className="my-6 h-40 animate-pulse rounded-lg bg-muted/40" />
  ),
});

export default MermaidLazy;
