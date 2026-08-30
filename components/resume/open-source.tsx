"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/lib/messages";
import { ResumeSectionHeading } from "./resume-section-heading";

type Contribution = { title: string; url: string; description?: string };

export default function OpenSource({ className }: { className?: string }) {
  const t = useTranslations("resume.openSource");
  const items = t.raw("items") as Contribution[];

  return (
    <section className={className}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-1 space-y-1 text-[11.5px]">
        {items.map((item) => (
          <li key={item.url}>
            <Link
              href={item.url}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              {item.title}
              <ExternalLink size={12} />
            </Link>
            {item.description && (
              <div className="text-gray-700 dark:text-gray-300">
                {item.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
