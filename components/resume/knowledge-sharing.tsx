"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { absoluteUrl } from "@/constants/site";
import { useTranslations } from "@/lib/messages";
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
      <ul className="mt-1 space-y-0.5 text-[11.5px]">
        {posts.map((p) => (
          <li key={p.title}>
            <Link
              href={absoluteUrl(p.url)}
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
