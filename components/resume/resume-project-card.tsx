import {
  type Category,
  type DetailItem,
  RESUME,
  type ResumeProject,
  type ResumeProjectKey,
} from "@/content/resume";
import { cn } from "@/lib/utils";
import { RichText, UNDERLINE_STRONG } from "./rich-text";

function ProjectCategoryDetail({ detail }: { detail: DetailItem }) {
  return (
    <li className="ml-3.5 list-disc">
      <RichText>{detail.text}</RichText>
      {detail.subItems && (
        <ul className="mt-1 space-y-1 pl-3.5">
          {detail.subItems.map((s, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static content
            <li key={j} className="ml-3.5 list-disc">
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
    <ul
      className={cn(
        "mt-1 space-y-1 text-[11px] text-gray-700 leading-[1.45] dark:text-gray-300",
        UNDERLINE_STRONG,
      )}
    >
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
      {/* 카테고리가 하나뿐이면 소제목이 헛계층이라 생략하되, 왼쪽 보더는 유지한다. */}
      {category.title && (
        <h4 className="font-semibold text-[12px] text-gray-800 dark:text-gray-200">
          <RichText>{category.title}</RichText>
        </h4>
      )}
      <DetailList details={category.details} />
    </section>
  );
}

export default function ResumeProjectCard({
  projectKey,
}: {
  projectKey: ResumeProjectKey;
}) {
  const project: ResumeProject = RESUME.projects[projectKey];
  const { stack } = project;
  const tasks = project.tasks ?? [];
  const categories = project.categories ?? [];

  return (
    <article className="py-2">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-2 font-bold text-[15px] text-gray-900 dark:text-white">
            <span
              aria-hidden
              className="h-4 w-0.5 shrink-0 bg-gray-900 dark:bg-white"
            />
            {project.title}
          </h3>
        </div>
      </header>

      <p
        className={cn(
          "mt-1.5 text-[11px] text-gray-700 leading-[1.45] dark:text-gray-300",
          UNDERLINE_STRONG,
        )}
      >
        <RichText>{project.description}</RichText>
      </p>

      {tasks.length > 0 && (
        <div className="mt-1.5">
          <p className="font-semibold text-[10px] text-gray-500 dark:text-gray-400">
            주요 업무
          </p>
          <ul className="mt-0.5 space-y-0 text-[10.5px] text-gray-600 leading-[1.45] dark:text-gray-400">
            {tasks.map((task) => (
              <li key={task} className="ml-3.5 list-disc">
                <RichText>{task}</RichText>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-1 mb-1.5 text-[11px] text-gray-400 dark:text-gray-500">
        {stack.join(", ")}
      </p>

      {categories.length > 0 && (
        // 카테고리가 여러 개면 간격이 쌓여 페이지를 넘기므로 과하게 벌리지 않는다.
        <div className="mt-2 space-y-2.5">
          {categories.map((cat, i) => (
            <ProjectCategory key={cat.title ?? i} category={cat} />
          ))}
        </div>
      )}
    </article>
  );
}
