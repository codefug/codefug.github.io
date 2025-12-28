"use client";

import { useEffect } from "react";
import { gtmPageView } from "@/lib/gtm";

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
