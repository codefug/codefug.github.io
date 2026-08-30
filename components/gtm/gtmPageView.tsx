"use client";

import { useEffect } from "react";
import { gtmPageView } from "@/lib/gtm";

export function GtmPageView({ slug }: { slug: string }) {
  useEffect(() => {
    if (slug) {
      const props = {
        page_title: slug,
      };
      gtmPageView(props);
    }
  }, [slug]);

  return null;
}
