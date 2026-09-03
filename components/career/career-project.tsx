"use client";

import { RichText } from "@/components/resume/rich-text";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { PaarBlock, type PaarItem } from "./paar-block";

type ProjectKey = "allra" | "digitalFinance" | "documentAi" | "samilDevKit";

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

export function CareerProject({
  projectKey,
  items,
  headless = false,
  className,
  itemsClassName,
}: {
  projectKey: ProjectKey;
  /** 이 장에 실을 PAAR 항목의 인덱스. 생략하면 전부 싣는다. */
  items?: number[];
  /** 프로젝트가 여러 A4 장에 걸칠 때, 이어지는 장에서는 머리말을 반복하지 않는다. */
  headless?: boolean;
  className?: string;
  /**
   * 항목 사이 간격 재정의. 항목 수가 적어 바닥이 비는 장에서
   * 남는 공간을 항목 사이로 분산할 때 쓴다. (예: "space-y-10")
   */
  itemsClassName?: string;
}) {
  const t = useTranslations(`career.projects.${projectKey}`);
  const all = t.raw("items") as PaarItem[];
  /*
    없는 인덱스를 조용히 걸러내면 항목이 문서에서 사라진 걸 눈치채기 어렵다.
    항목을 지우거나 순서를 바꿨을 때 빌드(SSG)에서 바로 걸리게 던진다.
  */
  const shown =
    items?.map((i) => {
      const item = all[i];
      if (!item)
        throw new Error(
          `career.projects.${projectKey}.items[${i}]가 없습니다. 항목이 ${all.length}개뿐이니 app/career/page.tsx의 인덱스를 확인하세요.`,
        );
      return item;
    }) ?? all;

  return (
    <section className={cn(className)}>
      {!headless && (
        <header>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="font-bold text-[14px] text-gray-900">
              {t("title")}
            </h3>
            <span className="text-[9.5px] text-gray-500">{t("role")}</span>
          </div>
          <p className="mt-1.5 text-[11px] text-gray-700 leading-[1.65]">
            <RichText>{t("summary")}</RichText>
          </p>

          {/*
            프로젝트 소개는 사실만 적고, 이 프로젝트에서의 성과는 여기서 요약한다.
            훑는 사람이 항목을 읽기 전에 수치를 먼저 얻는 자리. 산출 근거는 본문 항목이 담당한다.
          */}
          {t.has("highlights") && (
            <div className="mt-2">
              <p className="font-semibold text-[9.5px] text-primary/70 uppercase tracking-wider">
                대표 성과
              </p>
              <ul className="mt-0.5 space-y-0.75">
                {(t.raw("highlights") as string[]).map((line) => (
                  <li key={line} className="flex gap-1.5">
                    <span
                      aria-hidden
                      className="mt-[6px] size-[3px] shrink-0 rounded-full bg-primary"
                    />
                    <p className="min-w-0 flex-1 font-medium text-[11px] text-gray-900 leading-[1.6]">
                      <RichText>{line}</RichText>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <StackList stack={t.raw("stack") as string[]} />
        </header>
      )}

      {/* 항목 사이는 본문 문단 간격보다 확실히 넓게 두어 항목 경계가 읽히게 한다. */}
      <div className={cn("space-y-5", !headless && "mt-3", itemsClassName)}>
        {shown.map((item) => (
          <PaarBlock key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

type LinkItem = { title: string; url: string };

function ExtrasBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold text-[10px] text-gray-500">{label}</h3>
      <ul className="mt-1 space-y-[2px]">{children}</ul>
    </div>
  );
}

/** 오픈소스, 기술 공유, 학력, 자격. 본문보다 작게 두고 마지막 장에 붙인다. */
export function CareerExtras({ className }: { className?: string }) {
  const t = useTranslations("career.extras");
  const linkBlocks = (["openSource", "writing"] as const).map((key) => ({
    key,
    label: t(`${key}.label`),
    items: t.raw(`${key}.items`) as LinkItem[],
  }));
  const textBlocks = (["education", "certification"] as const).map((key) => ({
    key,
    label: t(`${key}.label`),
    lines: t.raw(`${key}.lines`) as string[],
  }));

  return (
    <section className={cn(className)}>
      <h2 className="font-bold text-[11px] text-gray-900">{t("title")}</h2>
      <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {linkBlocks.map((block) => (
          <ExtrasBlock key={block.key} label={block.label}>
            {block.items.map((item) => (
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
        {textBlocks.map((block) => (
          <ExtrasBlock key={block.key} label={block.label}>
            {block.lines.map((line) => (
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
  companyKey: "allra" | "pwc";
  children: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations(`career.companies.${companyKey}`);

  return (
    <section className={cn(className)}>
      <header className="border-primary/40 border-b pb-1.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 className="font-extrabold text-[16px] text-gray-900">
            {t("company")}
          </h2>
          <span className="text-[10px] text-gray-500">
            {t("duration")} &nbsp;|&nbsp; {t("position")}
          </span>
        </div>
        <p className="mt-1 text-[10.5px] text-gray-600 leading-[1.6]">
          <RichText>{t("summary")}</RichText>
        </p>
      </header>
      <div className="mt-2.5 space-y-3.5">{children}</div>
    </section>
  );
}
