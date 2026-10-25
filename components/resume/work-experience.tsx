import type { ReactNode } from "react";
import { type CompanyKey, RESUME } from "@/content/resume";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText, UNDERLINE_STRONG } from "./rich-text";

export function CompanySection({ companyKey }: { companyKey: CompanyKey }) {
  const company = RESUME.workExperience.items[companyKey];

  return (
    <article>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-extrabold text-[18px] text-gray-900 dark:text-white">
          {company.company}
        </h3>
        <span className="text-[11.5px] text-gray-500 dark:text-gray-400">
          {company.duration}
        </span>
      </header>
      <p
        className={cn(
          "mt-1.5 text-[11.5px] text-gray-800 leading-relaxed dark:text-gray-200",
          UNDERLINE_STRONG,
        )}
      >
        <RichText>{company.summary}</RichText>
      </p>
    </article>
  );
}

export function TeamSection({
  companyKey,
  children,
}: {
  companyKey: CompanyKey;
  children: ReactNode;
}) {
  const team = RESUME.workExperience.items[companyKey].team;

  return (
    <section className="mt-3">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="font-bold text-[15px] text-gray-900 dark:text-white">
          {team.name}
        </h4>
        <span className="text-[11.5px] text-gray-500 dark:text-gray-400">
          {team.duration}
        </span>
      </header>
      <p className="mt-1.5 text-[11.5px] text-gray-800 leading-relaxed dark:text-gray-200">
        <RichText>{team.summary}</RichText>
      </p>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export default function WorkExperienceSection({
  children,
  hideHeading = false,
}: {
  children: ReactNode;
  hideHeading?: boolean;
}) {
  return (
    <section>
      {!hideHeading && (
        <ResumeSectionHeading className="mb-3">
          {RESUME.workExperience.title}
        </ResumeSectionHeading>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
