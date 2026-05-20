"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";

type Edu = { title: string; duration: string; detail: string };

export default function ResumeEducation({ className }: { className?: string }) {
  const t = useTranslations("resume.education");
  const items = t.raw("items") as Edu[];

  return (
    <section className={cn("py-4 print:py-2", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-3 space-y-2 text-sm print:mt-2 print:space-y-2">
        {items.map((e) => (
          <li key={e.title}>
            <div className="font-semibold text-gray-900 dark:text-white print:text-xs">
              {e.title}
            </div>
            <div className="text-gray-500 dark:text-gray-400 print:text-xs">
              {e.duration}
            </div>
            {e.detail && (
              <div className="text-gray-700 dark:text-gray-300 print:text-xs">
                {e.detail}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
