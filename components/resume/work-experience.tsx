"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

export default function ResumeWorkExperience() {
  const t = useTranslations("resume.workExperience");
  const pwcItems = t.raw("items.pwc.items") as {
    title: string;
    detail: string;
  }[];

  return (
    <section className="py-4">
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>

      <article className="mt-4">
        <header className="flex items-center justify-between gap-4">
          <h3 className="font-bold text-xl">{t("items.allra.company")}</h3>
          <span className="shrink-0 text-gray-500 text-sm dark:text-gray-400">
            {t("items.allra.duration")}
          </span>
        </header>
        <div className="mt-2 flex gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded">
            <Image
              src="/images/logos/allra-logo.webp"
              alt="Allra Fintech"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-gray-800 text-sm leading-relaxed dark:text-gray-200">
            <RichText>{t("items.allra.summary")}</RichText>
          </p>
        </div>
      </article>

      <article className="mt-6">
        <header className="flex items-center justify-between gap-4">
          <h3 className="font-bold text-xl">{t("items.pwc.company")}</h3>
          <span className="shrink-0 text-gray-500 text-sm dark:text-gray-400">
            {t("items.pwc.duration")}
          </span>
        </header>
        <div className="mt-2 flex gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded">
            <Image
              src="/images/logos/pwc-logo.svg"
              alt="Samil PwC AC"
              fill
              className="object-contain"
            />
          </div>
          <ul className="space-y-2 text-gray-800 text-sm dark:text-gray-200">
            {pwcItems.map((it) => (
              <li key={it.title}>
                <div className="font-semibold">
                  {"• "}
                  <RichText>{it.title}</RichText>
                </div>
                <div className="pl-4">
                  {"◦ "}
                  <RichText>{it.detail}</RichText>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
