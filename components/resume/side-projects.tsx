"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

type SideProjectItem = {
  title: string;
  url: string;
  github?: string;
  stack: string[];
  description: string;
  details: string[];
};

export default function SideProjects() {
  const t = useTranslations("resume.sideProjects");
  const items = t.raw("items") as SideProjectItem[];

  return (
    <section className="py-4 print:py-3">
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <div className="mt-3 space-y-4 print:mt-2 print:space-y-3">
        {items.map((item) => (
          <article key={item.title}>
            <div className="flex items-center gap-3">
              <Link
                href={item.url}
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                {item.title}
                <ExternalLink size={13} />
              </Link>
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-xs hover:text-primary hover:underline print:text-gray-500"
                >
                  GitHub
                </a>
              )}
            </div>
            <p className="mt-1 text-gray-600 text-sm dark:text-gray-400 print:text-xs">
              {item.description}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-primary/30 bg-primary/5 px-2 py-0.5 font-medium text-primary text-xs dark:border-primary/40 dark:bg-primary/10 print:border-gray-400 print:bg-transparent print:text-gray-600"
                >
                  {tech}
                </span>
              ))}
            </div>
            <ul className="mt-2 space-y-1 text-gray-700 text-sm dark:text-gray-300 print:mt-1 print:text-xs">
              {item.details.map((d, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content
                <li key={i} className="ml-4 list-disc">
                  <RichText>{d}</RichText>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
