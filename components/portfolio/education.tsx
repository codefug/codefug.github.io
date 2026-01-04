"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { EDUCATION } from "@/constants/about";
import { HeadComponent } from "./HeadComponent";

function DescriptionWithDuration({
  titleKey,
  duration,
  image,
  descriptionKey,
}: {
  image: string;
  titleKey: string;
  duration: string;
  descriptionKey: string;
}) {
  const t = useTranslations("portfolio.data.education");
  const title = t(`${titleKey}.title`);
  const description = t(`${descriptionKey}.description`);

  return (
    <div className="mt-0 mb-0 flex">
      <Image
        src={image}
        alt={`${title} Logo`}
        width={128}
        height={128}
        className="mr-2 inline-block h-32 w-32 rounded-lg object-contain"
      />
      <section>
        <div className="text-gray-700 dark:text-gray-300">{duration}</div>
        <div className="font-bold text-gray-700 dark:text-gray-300">
          {title}
        </div>
        <div className="whitespace-pre-line text-gray-500 dark:text-gray-400">
          {description}
        </div>
      </section>
    </div>
  );
}

export default function Education() {
  const t = useTranslations("portfolio.education");

  return (
    <div className="prose dark:prose-invert mx-auto mt-4">
      <HeadComponent className="mb-4">{t("title")}</HeadComponent>
      {EDUCATION.map((edu) => (
        <DescriptionWithDuration
          key={edu.titleKey}
          titleKey={edu.titleKey}
          duration={edu.duration}
          descriptionKey={edu.descriptionKey}
          image={edu.image}
        />
      ))}
    </div>
  );
}
