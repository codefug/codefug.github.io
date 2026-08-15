"use client";

import { Ban, Lightbulb, Target, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { ArchitectureCase } from "@/constants/portfolio/architecture";
import { ARCHITECTURE_CASES } from "@/constants/portfolio/architecture";

// 머메이드는 무거우므로 펼쳤을 때 불러온다.
const Mermaid = dynamic(() => import("@/components/mdx/mermaid"), {
  loading: () => (
    <div className="my-6 h-40 animate-pulse rounded-lg bg-muted/40" />
  ),
});

export function ArchitectureCases() {
  const t = useTranslations("portfolio.architecture");

  return (
    <section id="work" className="mb-16 scroll-mt-24">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      {/* 면접관이 제목만 훑고 관심 있는 것만 펼칠 수 있도록 아코디언으로 둔다. */}
      <Accordion
        type="single"
        collapsible
        defaultValue={ARCHITECTURE_CASES[0]?.id}
        className="flex flex-col gap-3"
      >
        {ARCHITECTURE_CASES.map((item) => (
          <CaseItem key={item.id} item={item} />
        ))}
      </Accordion>
    </section>
  );
}

function CaseItem({ item }: { item: ArchitectureCase }) {
  const t = useTranslations("portfolio.architecture");
  const base = item.id;

  return (
    <AccordionItem
      value={item.id}
      className="overflow-hidden rounded-xl border border-border bg-card px-0 data-[state=open]:border-primary/30"
    >
      <AccordionTrigger className="gap-4 px-5 py-4 text-left hover:no-underline">
        <div className="flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="font-mono text-muted-foreground text-xs">
              {item.period}
            </span>
            {item.stack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-[11px]">
                {tech}
              </Badge>
            ))}
          </div>
          <h3 className="font-bold text-base md:text-lg">
            {t(`${base}.title`)}
          </h3>
          <p className="mt-0.5 font-normal text-muted-foreground text-sm">
            {t(`${base}.summary`)}
          </p>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-5 pb-5">
        <div className="flex flex-col gap-5 border-border border-t pt-5">
          <Block
            icon={<Target className="h-4 w-4" />}
            label={t("problemLabel")}
            tone="problem"
          >
            {t(`${base}.problem`)}
          </Block>

          <Block
            icon={<Lightbulb className="h-4 w-4" />}
            label={t("decisionLabel")}
            tone="decision"
          >
            {t(`${base}.decision`)}
          </Block>

          <figure className="m-0">
            <Mermaid>{item.diagram}</Mermaid>
            <figcaption className="text-center text-muted-foreground/60 text-xs">
              {t("diagramHint")}
            </figcaption>
          </figure>

          {/* 무엇을 안 했는지가 설계 판단의 근거다. */}
          <Block
            icon={<Ban className="h-4 w-4" />}
            label={t("rejectedLabel")}
            tone="rejected"
          >
            <ul className="flex flex-col gap-1.5">
              {Array.from({ length: item.alternativeCount }, (_, index) =>
                t(`${base}.rejected.${index}`),
              ).map((text) => (
                <li
                  key={text}
                  className="flex gap-2 before:text-muted-foreground/40 before:content-['—']"
                >
                  {text}
                </li>
              ))}
            </ul>
          </Block>

          <Block
            icon={<TrendingUp className="h-4 w-4" />}
            label={t("resultLabel")}
            tone="result"
          >
            {t(`${base}.result`)}
          </Block>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

const TONE_STYLE = {
  problem: "text-muted-foreground",
  decision: "text-primary",
  rejected: "text-muted-foreground/70",
  result: "text-primary",
} as const;

function Block({
  icon,
  label,
  tone,
  children,
}: {
  icon: ReactNode;
  label: string;
  tone: keyof typeof TONE_STYLE;
  children: ReactNode;
}) {
  return (
    <div>
      <div
        className={`mb-1.5 flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wide ${TONE_STYLE[tone]}`}
      >
        {icon}
        {label}
      </div>
      <div className="text-foreground/90 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-1 rounded-full bg-primary" aria-hidden="true" />
        <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
      </div>
      {subtitle && (
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
