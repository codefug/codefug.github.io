"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

function CompanyEntry({
  company,
  duration,
  logoSrc,
  logoAlt,
  children,
}: {
  company: string;
  duration: string;
  logoSrc: string;
  logoAlt: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mt-4 border-primary/30 border-l-2 pl-4 print:mt-3 print:pl-3">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded">
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              className="object-contain"
              sizes="36px"
            />
          </div>
          <h3 className="font-bold text-gray-900 text-lg dark:text-white print:text-base">
            {company}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-500 text-xs dark:bg-gray-800 dark:text-gray-400 print:bg-transparent print:px-0 print:text-gray-500">
          {duration}
        </span>
      </header>
      <div className="mt-2 text-gray-800 text-sm leading-relaxed dark:text-gray-200 print:text-xs">
        {children}
      </div>
    </article>
  );
}

export default function ResumeWorkExperience() {
  const t = useTranslations("resume.workExperience");

  return (
    <section className="py-4 print:py-2">
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>

      <CompanyEntry
        company={t("items.allra.company")}
        duration={t("items.allra.duration")}
        logoSrc="/images/logos/allra-logo.webp"
        logoAlt="Allra Fintech"
      >
        <p>
          <RichText>{t("items.allra.summary")}</RichText>
        </p>
      </CompanyEntry>

      <CompanyEntry
        company={t("items.pwc.company")}
        duration={t("items.pwc.duration")}
        logoSrc="/images/logos/pwc-logo.svg"
        logoAlt="Samil PwC AC"
      >
        <p>
          <RichText>{t("items.pwc.summary")}</RichText>
        </p>
      </CompanyEntry>
    </section>
  );
}
