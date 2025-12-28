import ProjectCard from "@/components/projectCard";
import { PROJECTS, SIDE_PROJECTS } from "@/constants/about";
import { HeadComponent } from "./HeadComponent";

export default function Projects() {
  return (
    <div className="mt-0 w-full">
      <HeadComponent>Projects</HeadComponent>
      <div className="mt-3 flex flex-col gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            image={project.image}
            role={project.role}
            description={project.description}
            stack={project.stack}
            features={project.features}
          />
        ))}
      </div>
    </div>
  );
}

export function SideProjects() {
  return (
    <div className="mt-0 w-full">
      <HeadComponent>Side Projects</HeadComponent>
      <div className="mt-3 flex flex-col gap-8">
        {SIDE_PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            image={project.image}
            duration={project.duration}
            role={project.role}
            description={project.description}
            stack={project.stack}
            features={project.features}
          />
        ))}
      </div>
    </div>
  );
}
