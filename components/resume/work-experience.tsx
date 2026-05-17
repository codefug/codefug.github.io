"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

type CompanyKey = "allra" | "pwc";

const COMPANY_LOGOS: Record<CompanyKey, { src: string; alt: string }> = {
  allra: { src: "/images/logos/allra-logo.webp", alt: "Allra Fintech" },
  pwc: { src: "/images/logos/pwc-logo.svg", alt: "Samil PwC AC" },
};

export function CompanySection({
  companyKey,
  className,
  children,
}: {
  companyKey: CompanyKey;
  className?: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("resume.workExperience");
  const logo = COMPANY_LOGOS[companyKey];

  return (
    <article
      className={cn(
        "mt-4 border-primary/30 border-l-2 pl-4 print:mt-5 print:border-l-0 print:pl-0",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
              sizes="36px"
            />
          </div>
          <h3 className="font-bold text-gray-900 text-lg dark:text-white print:text-lg">
            {t(`items.${companyKey}.company`)}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-500 text-xs dark:bg-gray-800 dark:text-gray-400 print:bg-transparent print:px-0 print:text-gray-500">
          {t(`items.${companyKey}.duration`)}
        </span>
      </header>
      <p className="mt-2 text-gray-800 text-sm leading-relaxed dark:text-gray-200 print:mt-1 print:text-xs print:leading-snug">
        <RichText>{t(`items.${companyKey}.summary`)}</RichText>
      </p>
      {children}
    </article>
  );
}

export default function WorkExperienceSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations("resume.workExperience");
  return (
    <section className={cn("py-4 print:py-1", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      {children}
    </section>
  );
}
