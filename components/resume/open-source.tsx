"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ResumeSectionHeading } from "./resume-section-heading";

type Contribution = { title: string; url: string };

export default function OpenSource({ className }: { className?: string }) {
  const t = useTranslations("resume.openSource");
  const items = t.raw("items") as Contribution[];

  return (
    <section className={className}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-3 space-y-1 text-[9.5px]">
        {items.map((item) => (
          <li key={item.url}>
            <Link
              href={item.url}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              {item.title}
              <ExternalLink size={12} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
