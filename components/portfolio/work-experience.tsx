"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeadComponent } from "./HeadComponent";

function TeamAndJob({ team, job }: { team: string; job: string }) {
  const t = useTranslations("portfolio.workExperience");
  return (
    <>
      <div>
        {t("team")}: {team}
      </div>
      <div>
        {t("job")}: {job}
      </div>
    </>
  );
}

function DescriptionWithDuration({
  company,
  duration,
  team,
  imageUrl,
  imageAlt,
  job,
}: {
  company: string;
  duration: string;
  team: string;
  imageUrl: string;
  imageAlt: string;
  job: string;
}) {
  return (
    <div className="mb-4 ml-4">
      <figure className="my-0 flex items-center gap-4">
        <section className="relative mb-2 flex h-32 w-32 items-center overflow-hidden rounded-lg bg-white">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </section>
        <section className="text-gray-700 dark:text-gray-300">
          <div>{company}</div>
          <TeamAndJob team={team} job={job} />
          <div>{duration}</div>
        </section>
      </figure>{" "}
    </div>
  );
}

export default function WorkExperience() {
  const t = useTranslations("portfolio.workExperience");
  return (
    <div className="prose dark:prose-invert mx-auto mt-4">
      <HeadComponent>{t("title")}</HeadComponent>
      <DescriptionWithDuration
        company="Allra Fintech"
        imageUrl="/images/logos/allra-logo.webp"
        imageAlt="Allra Fintech Logo"
        duration={`2025.10 ~ (${t("current")})`}
        team="Allra Squad - Frontend Team"
        job="Web Frontend Developer"
      />
      <DescriptionWithDuration
        company="Samil PwC AC"
        imageUrl="/images/logos/pwc-logo.svg"
        imageAlt="PwC Logo"
        duration="2025.01 ~ 2025.10"
        team="Digital"
        job="Web Frontend Developer"
      />
    </div>
  );
}
