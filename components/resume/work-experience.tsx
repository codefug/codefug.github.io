"use client";

import { useTranslations } from "@/lib/messages";
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
        <h3 className="font-extrabold text-[17px] text-gray-900 dark:text-white">
          {t(`items.${companyKey}.company`)}
        </h3>
        <span className="text-[9.5px] text-gray-500 dark:text-gray-400">
          {t(`items.${companyKey}.duration`)}
        </span>
      </header>
      <p className="mt-1.5 text-[9.5px] text-gray-800 leading-relaxed dark:text-gray-200">
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
    <section className="mt-6">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="font-bold text-[13px] text-gray-900 dark:text-white">
          {t("name")}
        </h4>
        <span className="text-[9.5px] text-gray-500 dark:text-gray-400">
          {t("duration")}
        </span>
      </header>
      <p className="mt-1.5 text-[9.5px] text-gray-800 leading-relaxed dark:text-gray-200">
        <RichText>{t("summary")}</RichText>
      </p>
      <div className="mt-1">{children}</div>
    </section>
  );
}

export default function WorkExperienceSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="space-y-9">{children}</div>
    </section>
  );
}
