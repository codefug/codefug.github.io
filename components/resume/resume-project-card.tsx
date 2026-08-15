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

function ProjectCategoryDetail({ detail }: { detail: DetailItem }) {
  return (
    // biome-ignore lint/suspicious/noArrayIndexKey: static content
    <li className="ml-4 list-disc">
      <RichText>{detail.text}</RichText>
      {detail.subItems && (
        <ul className="mt-0.5 space-y-0.5 pl-4">
          {detail.subItems.map((s, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static content
            <li key={j} className="ml-4 list-disc">
              <RichText>{s}</RichText>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function DetailList({ details }: { details: DetailItem[] }) {
  return (
    <ul className="mt-0.5 space-y-0.5 text-gray-700 text-sm dark:text-gray-300">
      {details.map((d, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static content
        <ProjectCategoryDetail key={i} detail={d} />
      ))}
    </ul>
  );
}

function ProjectCategory({ category }: { category: Category }) {
  return (
    <section className="border-primary/30 border-l-2 pl-3">
      <h4 className="font-semibold text-gray-800 text-sm dark:text-gray-200">
        <RichText>{category.title}</RichText>
      </h4>
      <DetailList details={category.details} />
    </section>
  );
}

export default function ResumeProjectCard({ projectKey, className }: Props) {
  const t = useTranslations(`resume.projects.${projectKey}`);
  const stack = t.raw("stack") as string[];
  const categories = t.has("categories")
    ? (t.raw("categories") as Category[])
    : [];

  return (
    <article className={cn("py-4", className)}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-2 font-bold text-base text-gray-900 dark:text-white">
            <span
              aria-hidden
              className="h-4 w-0.5 shrink-0 bg-gray-900 dark:bg-white"
            />
            {t("title")}
          </h3>
        </div>
      </header>

      <p className="mt-2 text-gray-700 text-sm leading-relaxed dark:text-gray-300">
        <RichText>{t("description")}</RichText>
      </p>

      <p className="mt-1.5 mb-4 text-gray-400 text-xs dark:text-gray-500">
        {stack.join(", ")}
      </p>

      {categories.length > 0 && (
        <div className="mt-3 space-y-5">
          {categories.map((cat) => (
            <ProjectCategory key={cat.title} category={cat} />
          ))}
        </div>
      )}
    </article>
  );
}
