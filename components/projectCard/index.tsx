"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "../ui/badge";

// components/ProjectCard.tsx
type ProjectCardProps = {
  duration?: string;
  role: string;
  projectKey: string;
  stack: string[];
  image: string;
  links?: {
    website?: string;
    github?: string;
  };
};

export default function ProjectCard({
  duration,
  role,
  projectKey,
  image,
  stack,
  links,
}: ProjectCardProps) {
  const t = useTranslations(`portfolio.data.projects.${projectKey}`);
  const title = t("title");
  const description = t("description");
  const features = t.raw("features") as string[];

  return (
    <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-md">
      <figure className="my-0 flex gap-6">
        <Image
          src={image}
          alt={`${title} thumbnail`}
          width={144}
          height={144}
          className="h-36 w-36 rounded-lg border-2 object-contain"
        />
        <header className="mb-4 flex flex-grow flex-col justify-center">
          <h2 className="mt-0 mb-0 font-bold text-xl">{title}</h2>
          <div className="text-gray-500 text-sm">{duration}</div>
          <div className="font-medium text-gray-600 text-sm">{role}</div>
        </header>
      </figure>
      <p className="text-base text-gray-700">{description}</p>
      <ProjectStack stack={stack} />
      <ProjectFeatures features={features} />
      <ProjectLinks links={links} />
    </div>
  );
}

function ProjectStack({ stack }: { stack: ProjectCardProps["stack"] }) {
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {stack.map((item) => (
        <Badge key={item} className="dark:text-white">
          {item}
        </Badge>
      ))}
    </div>
  );
}

function ProjectFeatures({ features }: { features: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-gray-700 text-sm">
      {features.map((feat: string) => (
        <li key={feat}>{feat}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ links }: { links: ProjectCardProps["links"] }) {
  const t = useTranslations("portfolio.projects");
  return (
    <div className="mt-2 flex gap-4 text-blue-600 text-sm underline">
      {links?.website && (
        <a href={links.website} target="_blank" rel="noreferrer">
          {t("deploymentLink")}
        </a>
      )}
      {links?.github && (
        <a href={links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      )}
    </div>
  );
}
