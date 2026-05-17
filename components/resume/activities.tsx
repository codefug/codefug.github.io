"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";

type StudyGroups = { label: string; note: string };
type HackathonItem = {
  event: string;
  project: string;
  description: string;
  github: string;
};

function StudyGroupItem({ item }: { item: StudyGroups }) {
  return (
    <li className="flex flex-col gap-0.5">
      <span className="font-semibold text-gray-800 dark:text-gray-200">
        {item.label}
      </span>
      <p className="text-gray-600 text-xs dark:text-gray-400 print:text-[11px]">
        {item.note}
      </p>
    </li>
  );
}

function HackathonListItem({ item }: { item: HackathonItem }) {
  return (
    <li className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-2">
        <a
          href={item.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          {item.project}
        </a>
        <span className="text-gray-500 text-xs dark:text-gray-400">
          {item.event}
        </span>
      </div>
      <p className="text-gray-600 text-xs dark:text-gray-400 print:text-[11px]">
        {item.description}
      </p>
    </li>
  );
}

export default function Activities({ className }: { className?: string }) {
  const t = useTranslations("resume.activities");
  const studyGroups = t.raw("studyGroups") as StudyGroups;
  const hackathons = t.raw("hackathons.items") as HackathonItem[];

  return (
    <section className={cn("py-4 print:py-3", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-3 space-y-3 text-sm">
        <StudyGroupItem item={studyGroups} />
        {hackathons.map((h) => (
          <HackathonListItem key={h.project} item={h} />
        ))}
      </ul>
    </section>
  );
}
