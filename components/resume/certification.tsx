"use client";

import { useTranslations } from "@/lib/messages";
import { ResumeSectionHeading } from "./resume-section-heading";

type Certificate = { title: string; duration: string; detail: string };

export default function ResumeCertification({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("resume.certification");
  const items = t.raw("items") as Certificate[];

  return (
    <section className={className}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-2 space-y-1.5 text-[9.5px]">
        {items.map((c) => (
          <li key={c.title}>
            <div className="font-semibold text-gray-900 dark:text-white">
              {c.title}
            </div>
            <div className="text-gray-500 dark:text-gray-400">{c.duration}</div>
            {c.detail && (
              <div className="text-gray-700 dark:text-gray-300">{c.detail}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
