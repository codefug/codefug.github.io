"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

type StudyGroups = { label: string; note: string };

export default function Activities({ className }: { className?: string }) {
  const t = useTranslations("resume.activities");
  const studyGroups = t.raw("studyGroups") as StudyGroups;

  return (
    <section className={cn("py-4 print:py-2", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-3 space-y-3 text-sm print:mt-2 print:space-y-3">
        <li className="flex flex-col gap-0.5">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {studyGroups.label}
          </span>
          <p className="text-gray-600 text-xs dark:text-gray-400 print:text-xs">
            <RichText>{studyGroups.note}</RichText>
          </p>
        </li>
      </ul>
    </section>
  );
}
