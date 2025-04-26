"use client";

import { gtmPageView } from "@/lib/gtm";
import { useEffect } from "react";

export function GtmPageView({ slug }: { slug: string }) {
  useEffect(() => {
    // param이 있다면
    if (slug) {
      // props를 넣어서
      const props = {
        page_title: slug,
      };
      // gtmPageView를 실행해서 GTM에 알린다.
      gtmPageView(props);
    }
  }, [slug]);

  return null;
}
