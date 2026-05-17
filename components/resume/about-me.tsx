"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

export default function AboutMe({ className }: { className?: string }) {
  const t = useTranslations("resume.aboutMe");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className={cn("py-4 print:py-1", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <div className="mt-3 space-y-3 text-gray-800 text-sm leading-relaxed dark:text-gray-200 print:mt-1.5 print:space-y-1.5 print:text-xs print:leading-snug">
        {paragraphs.map((p, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static content
          <p key={i}>
            <RichText>{p}</RichText>
          </p>
        ))}
      </div>
    </section>
  );
}
