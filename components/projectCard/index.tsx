import Image from "next/image";
import { Badge } from "../ui/badge";

// components/ProjectCard.tsx
type ProjectCardProps = {
  title: string;
  duration?: string;
  role: string;
  description: string;
  stack: string[];
  image: string;
  links?: {
    website?: string;
    github?: string;
  };
  features: string[];
};

export default function ProjectCard({
  title,
  duration,
  role,
  description,
  image,
  stack,
  links,
  features,
}: ProjectCardProps) {
  return (
    <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-md">
      <figure className="my-0 flex gap-6">
        <Image
          src={image}
          alt={`${title}썸네일`}
          width={144}
          height={144}
          className="h-36 w-36 rounded-lg border-2 object-contain"
        />
        <header className="mb-4 flex flex-grow flex-col justify-center">
          <h2 className="mb-0 mt-0 text-xl font-bold">{title}</h2>
          <div className="text-sm text-gray-500">{duration}</div>
          <div className="text-sm font-medium text-gray-600">{role}</div>
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

function ProjectFeatures({
  features,
}: {
  features: ProjectCardProps["features"];
}) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
      {features.map((feat) => (
        <li key={feat}>{feat}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ links }: { links: ProjectCardProps["links"] }) {
  return (
    <div className="mt-2 flex gap-4 text-sm text-blue-600 underline">
      {links?.website && (
        <a href={links.website} target="_blank" rel="noreferrer">
          배포 링크
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
