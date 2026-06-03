"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ResumeSectionHeading } from "./resume-section-heading";

export default function ProjectsSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations("resume.projects");
  return (
    <section className={cn("py-4 print:py-2", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      {children}
    </section>
  );
}
