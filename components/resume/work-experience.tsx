"use client";

import { useTranslations } from "next-intl";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

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
        <h3 className="font-extrabold text-2xl text-gray-900 dark:text-white">
          {t(`items.${companyKey}.company`)}
        </h3>
        <span className="text-gray-500 text-sm dark:text-gray-400">
          {t(`items.${companyKey}.duration`)}
        </span>
      </header>
      <p className="mt-2 text-gray-800 text-sm leading-relaxed dark:text-gray-200">
        <RichText>{t(`items.${companyKey}.summary`)}</RichText>
      </p>
    </article>
  );
}

export function TeamSection({
  companyKey,
  children,
  /**
   * 같은 팀의 프로젝트가 여러 A4 페이지에 걸쳐 있을 때,
   * 두 번째 장부터는 팀 이름과 소개를 반복하지 않는다.
   */
  headless = false,
}: {
  companyKey: CompanyKey;
  children: React.ReactNode;
  headless?: boolean;
}) {
  const t = useTranslations(`resume.workExperience.items.${companyKey}.team`);

  if (headless) {
    return <section className="">{children}</section>;
  }

  return (
    <section className="mt-5">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="font-bold text-gray-900 text-lg dark:text-white">
          {t("name")}
        </h4>
        <span className="text-gray-500 text-sm dark:text-gray-400">
          {t("duration")}
        </span>
      </header>
      <p className="mt-1.5 text-gray-800 text-sm leading-relaxed dark:text-gray-200">
        <RichText>{t("summary")}</RichText>
      </p>
      <div className="mt-1">{children}</div>
    </section>
  );
}

export default function WorkExperienceSection({
  children,
  className,
  /** 같은 섹션이 다음 장으로 이어질 때는 제목을 반복하지 않는다. */
  headless = false,
}: {
  children: React.ReactNode;
  className?: string;
  headless?: boolean;
}) {
  const t = useTranslations("resume.workExperience");

  return (
    <section className={className}>
      {!headless && (
        <ResumeSectionHeading className="mb-4">
          {t("title")}
        </ResumeSectionHeading>
      )}
      <div className="space-y-8">{children}</div>
    </section>
  );
}
