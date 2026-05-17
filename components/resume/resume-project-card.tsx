"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { RichText } from "./rich-text";

type DetailItem = { text: string; subItems?: string[] };
type Category = { title: string; details: DetailItem[] };

interface Props {
  projectKey:
    | "allra"
    | "digitalFinance"
    | "documentAi"
    | "samilDevKit"
    | "allraAdmin";
  className?: string;
}

export default function ResumeProjectCard({ projectKey, className }: Props) {
  const t = useTranslations(`resume.projects.${projectKey}`);
  const stack = t.raw("stack") as string[];
  const categories = t.raw("categories") as Category[];
  return (
    <article className={cn("py-4 print:py-2", className)}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="font-bold text-gray-900 text-xl dark:text-white print:text-xl">
              {t("title")}
            </h3>
          </div>
          <div className="mt-0.5 text-gray-500 text-sm dark:text-gray-400 print:text-xs">
            {t("subtitle")}
          </div>
        </div>
      </header>

      <p className="mt-2 text-gray-700 text-sm leading-relaxed dark:text-gray-300 print:text-xs">
        {t("description")}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-primary/30 bg-primary/5 px-2 py-0.5 font-medium text-primary text-xs dark:border-primary/40 dark:bg-primary/10 print:border-gray-400 print:bg-transparent print:text-gray-600"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-3 space-y-5 print:mt-2 print:space-y-5">
        {categories.map((cat) => (
          <section
            key={cat.title}
            className="border-primary/30 border-l-2 pl-3 print:pl-2 print:leading-snug"
          >
            <h4 className="font-semibold text-gray-800 text-sm dark:text-gray-200 print:text-[13px]">
              <RichText>{cat.title}</RichText>
            </h4>
            <ul className="mt-0.5 space-y-0.5 text-gray-700 text-sm dark:text-gray-300 print:text-xs print:leading-snug">
              {cat.details.map((d, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content
                <li key={i} className="ml-4 list-disc">
                  <RichText>{d.text}</RichText>
                  {d.subItems && (
                    <ul className="mt-0.5 space-y-0.5 pl-4">
                      {d.subItems.map((s, j) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: static content
                        <li key={j} className="list-[circle]">
                          <RichText>{s}</RichText>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
