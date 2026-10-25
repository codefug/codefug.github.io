import type { ReactNode } from "react";
import { RichText } from "@/components/resume/rich-text";
import {
  CAREER,
  type CareerCompanyKey,
  type CareerProjectData,
  type CareerProjectKey,
  type PaarItem,
} from "@/content/career";
import { cn } from "@/lib/utils";
import { Bullets, PaarBlock } from "./paar-block";

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-1.5 flex flex-wrap gap-1">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded bg-gray-100 px-1.5 py-[1px] font-medium text-[9px] text-gray-600"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

/** "[문제 해결] 본문"처럼 대괄호 태그로 시작하는 역할 줄 */
const ROLE_TAG = /^\[([^\]]+)\]\s*(.*)$/;

function RoleLine({ line }: { line: string }) {
  const [, tag, body = line] = ROLE_TAG.exec(line) ?? [];
  return (
    <span className="min-w-0 flex-1">
      {tag && <span className="mr-1 font-semibold text-gray-900">[{tag}]</span>}
      <RichText>{body}</RichText>
    </span>
  );
}

function RoleList({ roles }: { roles: string[] }) {
  return (
    <ol className="mt-2 space-y-0.5">
      {roles.map((line, i) => (
        <li
          key={line}
          className="flex gap-1.5 text-[10.5px] text-gray-700 leading-[1.55]"
        >
          <span className="shrink-0 text-gray-400 tabular-nums">{i + 1}.</span>
          <RoleLine line={line} />
        </li>
      ))}
    </ol>
  );
}

function Highlights({ lines }: { lines: string[] }) {
  return (
    <div className="mt-2">
      <p className="font-semibold text-[9.5px] text-primary/70 uppercase tracking-wider">
        대표 성과
      </p>
      <Bullets items={lines} strong className="mt-0.5" />
    </div>
  );
}

// 없는 인덱스를 조용히 거르면 항목이 사라진 걸 모르므로, 던져서 빌드에서 바로 걸리게 한다.
function pickItems(
  all: PaarItem[],
  indexes: number[] | undefined,
  projectKey: CareerProjectKey,
): PaarItem[] {
  if (!indexes) return all;
  return indexes.map((i) => {
    const item = all[i];
    if (!item)
      throw new Error(
        `CAREER.projects.${projectKey}.items[${i}]가 없습니다. 항목이 ${all.length}개뿐이니 app/career/page.tsx의 인덱스를 확인하세요.`,
      );
    return item;
  });
}

export function CareerProject({
  projectKey,
  items,
  headless = false,
  className,
}: {
  projectKey: CareerProjectKey;
  /** 생략하면 전부 싣는다. */
  items?: number[];
  /** 여러 장에 걸친 프로젝트의 이어지는 장에서 머리말을 생략한다. */
  headless?: boolean;
  className?: string;
}) {
  const project: CareerProjectData = CAREER.projects[projectKey];
  const all = project.items ?? [];
  const shown = pickItems(all, items, projectKey);

  return (
    <section className={cn(className)}>
      {!headless && (
        <header>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="font-bold text-[14px] text-gray-900">
              {project.title}
            </h3>
            <span className="text-[9.5px] text-gray-500">{project.role}</span>
          </div>
          <p className="mt-1.5 text-[11px] text-gray-700 leading-[1.65]">
            <RichText>{project.summary}</RichText>
          </p>

          {project.roles && <RoleList roles={project.roles} />}
          {project.highlights && <Highlights lines={project.highlights} />}

          <StackList stack={project.stack} />
        </header>
      )}

      {shown.length > 0 && (
        <div className={cn("space-y-5", !headless && "mt-3")}>
          {shown.map((item) => (
            <PaarBlock key={item.title} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function ExtrasBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold text-[10px] text-gray-500">{label}</h3>
      <ul className="mt-1 space-y-[2px]">{children}</ul>
    </div>
  );
}

export function CareerExtras({ className }: { className?: string }) {
  const extras = CAREER.extras;
  return (
    <section className={className}>
      <h2 className="font-bold text-[11px] text-gray-900">{extras.title}</h2>
      <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {(["openSource", "writing"] as const).map((key) => (
          <ExtrasBlock key={key} label={extras[key].label}>
            {extras[key].items.map((item) => (
              <li key={item.url} className="text-[10px] leading-[1.55]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline decoration-dotted hover:decoration-solid"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ExtrasBlock>
        ))}
        {(["education", "certification"] as const).map((key) => (
          <ExtrasBlock key={key} label={extras[key].label}>
            {extras[key].lines.map((line) => (
              <li
                key={line}
                className="text-[10px] text-gray-700 leading-[1.55]"
              >
                {line}
              </li>
            ))}
          </ExtrasBlock>
        ))}
      </div>
    </section>
  );
}

export function CareerCompany({
  companyKey,
  children,
  className,
}: {
  companyKey: CareerCompanyKey;
  children: ReactNode;
  className?: string;
}) {
  const company = CAREER.companies[companyKey];

  return (
    <section className={className}>
      <header className="border-primary/40 border-b pb-1.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 className="font-extrabold text-[16px] text-gray-900">
            {company.company}
          </h2>
          <span className="text-[10px] text-gray-500">
            {company.duration} &nbsp;|&nbsp; {company.position}
          </span>
        </div>
        <p className="mt-1 text-[10.5px] text-gray-600 leading-[1.6]">
          <RichText>{company.summary}</RichText>
        </p>
      </header>
      <div className="mt-2.5 space-y-3.5">{children}</div>
    </section>
  );
}
