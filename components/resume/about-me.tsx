"use client";

import { useTranslations } from "next-intl";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

export default function AboutMe() {
  const t = useTranslations("resume.aboutMe");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="py-4 print:py-1">
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <div className="mt-3 space-y-3 text-gray-800 text-sm leading-relaxed dark:text-gray-200 print:mt-1 print:space-y-1 print:text-xs">
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
