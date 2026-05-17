"use client";

import { useTranslations } from "next-intl";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

export default function ResumeSkills() {
  const t = useTranslations("resume.skills");
  const items = t.raw("items") as string[];

  return (
    <section className="py-4 print:py-2">
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-3 space-y-2 text-gray-800 text-sm leading-relaxed dark:text-gray-200 print:mt-2 print:space-y-1.5 print:text-xs">
        {items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static content
          <li key={i} className="ml-4 list-disc">
            <RichText>{item}</RichText>
          </li>
        ))}
      </ul>
    </section>
  );
}
