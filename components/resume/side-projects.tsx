"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

type SideProjectItem = {
  title: string;
  url?: string;
  github?: string;
  stack: string[];
  description: string;
  details: string[];
};

function SideProjectCard({ item }: { item: SideProjectItem }) {
  return (
    <article>
      <div className="flex items-center gap-3">
        {item.url ? (
          <Link
            href={item.url}
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            {item.title}
            <ExternalLink size={13} />
          </Link>
        ) : (
          <span className="font-semibold text-gray-900 dark:text-white">
            {item.title}
          </span>
        )}
        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-xs hover:text-primary hover:underline"
          >
            GitHub
          </a>
        )}
      </div>
      <p className="mt-1 text-[11.5px] text-gray-600 dark:text-gray-400">
        <RichText>{item.description}</RichText>
      </p>
      <p className="mt-2.5 text-gray-400 text-xs dark:text-gray-500">
        {item.stack.join(", ")}
      </p>
      <ul className="mt-2.5 space-y-1 text-[11.5px] text-gray-700 dark:text-gray-300">
        {item.details.map((d, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static content
          <li key={i} className="ml-4 list-disc">
            <RichText>{d}</RichText>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function SideProjects({ className }: { className?: string }) {
  const t = useTranslations("resume.sideProjects");
  const items = t.raw("items") as SideProjectItem[];

  // 내세울 것이 없으면 제목만 남은 빈 칸이 되므로 섹션째로 접는다.
  if (items.length === 0) return null;

  return (
    <section className={cn("py-5", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <div className="mt-3 space-y-4">
        {items.map((item) => (
          <SideProjectCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
