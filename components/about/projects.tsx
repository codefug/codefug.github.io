import ProjectCard from "@/components/projectCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PROJECTS } from "@/constants/about";

export default function Projects() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="project"
      className="w-full"
    >
      <AccordionItem value="project">
        <AccordionTrigger className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              duration={project.duration}
              role={project.role}
              description={project.description}
              stack={project.stack}
              features={project.features}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
