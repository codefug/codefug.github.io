"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { EDUCATION } from "@/constants/about";
import { HeadComponent } from "./HeadComponent";

function DescriptionWithDuration({
  title,
  duration,
  image,
  description,
}: {
  image: string;
  title: ReactNode;
  duration: string;
  description?: ReactNode;
}) {
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
      <HeadComponent>{t("title")}</HeadComponent>
      {EDUCATION.map((edu) => (
        <DescriptionWithDuration
          key={edu.title}
          title={edu.title}
          duration={edu.duration}
          description={edu.description}
          image={edu.image}
        />
      ))}
    </div>
  );
}
