"use client";

import { useTranslations } from "next-intl";
import { HighlightBullet } from "./highlight-bullet";
import { RichText } from "./rich-text";

type DetailItem = { text: string; highlight?: boolean; subItems?: string[] };
type Category = { title: string; details: DetailItem[] };

interface Props {
  projectKey: "allra" | "digitalFinance" | "documentAi" | "samilDevKit";
}

export default function ResumeProjectCard({ projectKey }: Props) {
  const t = useTranslations(`resume.projects.${projectKey}`);
  const stack = t.raw("stack") as string[];
  const categories = t.raw("categories") as Category[];
  const duration = t.raw("duration") as string | undefined;

  return (
    <article className="py-4">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
            {t("title")}
          </h3>
          <div className="text-gray-500 text-sm dark:text-gray-400">
            {t("subtitle")}
          </div>
        </div>
        {duration && (
          <div className="text-gray-500 text-sm dark:text-gray-400">
            {duration}
          </div>
        )}
      </header>

      <p className="mt-2 text-gray-800 text-sm dark:text-gray-200">
        {t("description")}
      </p>

      <div className="mt-2 text-sm">
        <span className="font-semibold">Tech Stack: </span>
        <span className="text-gray-700 dark:text-gray-300">
          {stack.join(", ")}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h4 className="font-bold text-base text-gray-900 dark:text-white">
              <RichText>{cat.title}</RichText>
            </h4>
            <ul className="mt-1 space-y-1 pl-5 text-gray-800 text-sm dark:text-gray-200">
              {cat.details.map((d, i) =>
                d.highlight ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static content
                  <HighlightBullet key={i}>
                    <RichText>{d.text}</RichText>
                    {d.subItems && (
                      <ul className="mt-1 space-y-1 pl-5">
                        {d.subItems.map((s, j) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: static content
                          <li key={j} className="list-[circle]">
                            <RichText>{s}</RichText>
                          </li>
                        ))}
                      </ul>
                    )}
                  </HighlightBullet>
                ) : (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static content
                  <li key={i} className="list-disc">
                    <RichText>{d.text}</RichText>
                    {d.subItems && (
                      <ul className="mt-1 space-y-1 pl-5">
                        {d.subItems.map((s, j) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: static content
                          <li key={j} className="list-[circle]">
                            <RichText>{s}</RichText>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ),
              )}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
