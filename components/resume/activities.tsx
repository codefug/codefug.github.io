import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";

type StudyGroups = { label: string; note: string };
type HackathonItem = {
  event: string;
  project: string;
  description: string;
  github: string;
};

export default async function Activities({
  className,
}: {
  className?: string;
}) {
  const t = await getTranslations("resume.activities");
  const studyGroups = t.raw("studyGroups") as StudyGroups;
  const hackathons = t.raw("hackathons.items") as HackathonItem[];

  return (
    <section className={cn("py-4 print:py-3", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>

      <ul className="mt-3 space-y-3 text-sm">
        <li className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {studyGroups.label}
            </span>
          </div>
          <p className="text-gray-600 text-xs dark:text-gray-400 print:text-[11px]">
            {studyGroups.note}
          </p>
        </li>

        {hackathons.map((h) => (
          <li key={h.project} className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-2">
              <a
                href={h.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                {h.project}
              </a>
              <span className="text-gray-500 text-xs dark:text-gray-400">
                {h.event}
              </span>
            </div>
            <p className="text-gray-600 text-xs dark:text-gray-400 print:text-[11px]">
              {h.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
