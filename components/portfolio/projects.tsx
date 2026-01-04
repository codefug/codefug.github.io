"use client";

import { useTranslations } from "next-intl";
import ProjectCard from "@/components/projectCard";
import { PROJECTS, SIDE_PROJECTS } from "@/constants/about";
import { HeadComponent } from "./HeadComponent";

export default function Projects() {
  const t = useTranslations("portfolio.projects");

  return (
    <div className="mt-0 w-full">
      <HeadComponent>{t("title")}</HeadComponent>
      <div className="mt-3 flex flex-col gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.key}
            image={project.image}
            role={project.role}
            projectKey={project.key}
            stack={project.stack}
          />
        ))}
      </div>
    </div>
  );
}

export function SideProjects() {
  const t = useTranslations("portfolio.sideProjects");

  return (
    <div className="mt-0 w-full">
      <HeadComponent>{t("title")}</HeadComponent>
      <div className="mt-3 flex flex-col gap-8">
        {SIDE_PROJECTS.map((project) => (
          <ProjectCard
            key={project.key}
            image={project.image}
            duration={project.duration}
            role={project.role}
            projectKey={project.key}
            stack={project.stack}
          />
        ))}
      </div>
    </div>
  );
}
