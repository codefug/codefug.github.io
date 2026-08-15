"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ResumeSectionHeading } from "./resume-section-heading";

type Post = { title: string; url: string };

export default function KnowledgeSharing({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("resume.knowledgeSharing");
  const posts = t.raw("posts") as Post[];

  return (
    <section className={className}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <h4 className="mt-4 font-semibold text-[13px] text-gray-700 dark:text-gray-300">
        {t("subtitle")}
      </h4>
      <ul className="mt-2.5 space-y-1 text-[13px]">
        {posts.map((p) => (
          <li key={p.title}>
            <Link
              href={p.url}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <span className="whitespace-nowrap">{p.title}</span>
              <ExternalLink size={12} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
