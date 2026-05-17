"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
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
    <section className={cn("py-4", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <h4 className="mt-3 font-semibold text-gray-700 text-sm dark:text-gray-300">
        {t("subtitle")}
      </h4>
      <ul className="mt-2 space-y-1 text-sm">
        {posts.map((p) => (
          <li key={p.title}>
            <Link
              href={p.url}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              {p.title}
              <ExternalLink size={12} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
