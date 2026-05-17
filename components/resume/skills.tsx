import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";
import { RichText } from "./rich-text";

export default async function ResumeSkills({
  className,
}: {
  className?: string;
}) {
  const t = await getTranslations("resume.skills");
  const items = t.raw("items") as string[];

  return (
    <section className={cn("py-4 print:py-1", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      <ul className="mt-3 space-y-2 text-gray-800 text-sm leading-relaxed dark:text-gray-200 print:mt-1.5 print:space-y-1.5 print:text-xs print:leading-snug">
        {items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static content
          <li key={i} className="ml-4 list-disc">
            <RichText>{item}</RichText>
          </li>
        ))}
      </ul>
    </section>
  );
}
