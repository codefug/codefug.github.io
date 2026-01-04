"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { SKILLS } from "@/constants/about";
import { HeadComponent } from "./HeadComponent";

const Shield = ({ alt, src }: { alt: string; src: string }) => (
  <Image
    src={src}
    alt={alt}
    width={140}
    height={32}
    className="mt-0 mb-0 h-8 w-auto"
    style={{ height: "auto" }}
  />
);

function SkillItem({
  title,
  itemList,
}: {
  title: string;
  itemList: {
    subtitle: string;
    list: ReactNode[];
  }[];
}) {
  return (
    <div className="flex gap-6 overflow-hidden rounded-lg border-2 py-2 pr-4">
      <header className="min-w-40 shrink-0 px-4 pt-6 font-bold text-gray-900 text-lg dark:text-white">
        {title}
      </header>
      <div className="text-gray-700 dark:text-gray-300">
        <ul className="my-0 grid grid-cols-1 gap-4 pl-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {itemList.map((item) => (
            <li key={item.subtitle} className="mb-4 flex flex-col gap-2 pl-0">
              <h4 className="mt-0 font-bold text-lg text-primary dark:text-white">
                {item.subtitle}
              </h4>
              <ul className="flex flex-wrap gap-2 px-0">{item.list}</ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("portfolio.skills");

  return (
    <div className="prose dark:prose-invert mx-auto mt-4 mb-2">
      <HeadComponent>{t("title")}</HeadComponent>
      <div className="mt-4 flex w-full flex-col gap-8">
        <SkillItem
          title={t("strong")}
          itemList={SKILLS.strong.map(({ subtitle, list: skillList }) => ({
            subtitle,
            list: skillList.map((skill) => (
              <Shield key={skill.alt} alt={skill.alt} src={skill.src} />
            )),
          }))}
        />
        <SkillItem
          title={t("knowledgeable")}
          itemList={SKILLS.knowledgeable.map(
            ({ subtitle, list: skillList }) => ({
              subtitle,
              list: skillList.map((skill) => (
                <Shield key={skill.alt} alt={skill.alt} src={skill.src} />
              )),
            }),
          )}
        />
      </div>
    </div>
  );
}
