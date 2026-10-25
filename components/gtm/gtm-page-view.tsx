"use client";

import { useEffect } from "react";

/** 글 페이지에 들어올 때 GTM에 page_view 이벤트를 보낸다. */
export function GtmPageView({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;
    window.dataLayer?.push({
      event: "page_view",
      url: window.location.href,
      page_title: slug,
    });
  }, [slug]);

  return null;
}
