import type { TitledItem } from "@/content/resume";
import { ResumeSectionHeading } from "./resume-section-heading";

export default function TitledList({
  title,
  items,
}: {
  title: string;
  items: TitledItem[];
}) {
  return (
    <section>
      <ResumeSectionHeading>{title}</ResumeSectionHeading>
      <ul className="mt-2 space-y-1.5 text-[11.5px]">
        {items.map((c) => (
          <li key={c.title}>
            <div className="font-semibold text-gray-900 dark:text-white">
              {c.title}
            </div>
            <div className="text-gray-500 dark:text-gray-400">{c.duration}</div>
            {c.detail && (
              <div className="text-gray-700 dark:text-gray-300">{c.detail}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
