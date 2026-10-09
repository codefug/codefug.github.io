"use client";

import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText, UNDERLINE_STRONG } from "./rich-text";

type CompanyKey = "allra" | "pwc";

export function CompanySection({
  companyKey,
  className,
}: {
  companyKey: CompanyKey;
  className?: string;
}) {
  const t = useTranslations("resume.workExperience");

  return (
    <article className={className}>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-extrabold text-[18px] text-gray-900 dark:text-white">
          {t(`items.${companyKey}.company`)}
        </h3>
        <span className="text-[11.5px] text-gray-500 dark:text-gray-400">
          {t(`items.${companyKey}.duration`)}
        </span>
      </header>
      <p
        className={cn(
          "mt-1.5 text-[11.5px] text-gray-800 leading-relaxed dark:text-gray-200",
          UNDERLINE_STRONG,
        )}
      >
        <RichText>{t(`items.${companyKey}.summary`)}</RichText>
      </p>
    </article>
  );
}

export function TeamSection({
  companyKey,
  children,
}: {
  companyKey: CompanyKey;
  children: React.ReactNode;
}) {
  const t = useTranslations(`resume.workExperience.items.${companyKey}.team`);

  return (
    <section className="mt-3">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="font-bold text-[15px] text-gray-900 dark:text-white">
          {t("name")}
        </h4>
        <span className="text-[11.5px] text-gray-500 dark:text-gray-400">
          {t("duration")}
        </span>
      </header>
      <p className="mt-1.5 text-[11.5px] text-gray-800 leading-relaxed dark:text-gray-200">
        <RichText>{t("summary")}</RichText>
      </p>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export default function WorkExperienceSection({
  children,
  className,
  hideHeading = false,
}: {
  children: React.ReactNode;
  className?: string;
  hideHeading?: boolean;
}) {
  const t = useTranslations("resume.workExperience");

  return (
    <section className={className}>
      {!hideHeading && (
        <ResumeSectionHeading className="mb-3">
          {t("title")}
        </ResumeSectionHeading>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
