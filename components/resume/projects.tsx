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
    <section className={cn("py-5", className)}>
      <ResumeSectionHeading>{t("title")}</ResumeSectionHeading>
      {children}
    </section>
  );
}
