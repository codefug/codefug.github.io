"use client";

import { useTranslations } from "@/lib/messages";
import { ResumeSectionHeading } from "./resume-section-heading";

type Edu = { title: string; duration: string; detail: string };

export default function ResumeEducation({ className }: { className?: string }) {
  const t = useTranslations("resume.education");
  const items = t.raw("items") as Edu[];

  return (
    <section className={className}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-2 space-y-1.5 text-[9.5px]">
        {items.map((e) => (
          <li key={e.title}>
            <div className="font-semibold text-gray-900 dark:text-white">
              {e.title}
            </div>
            <div className="text-gray-500 dark:text-gray-400">{e.duration}</div>
            {e.detail && (
              <div className="text-gray-700 dark:text-gray-300">{e.detail}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
