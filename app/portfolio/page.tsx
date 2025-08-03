import AboutHeading from "@/components/about/about-heading";
import { FadeInSection } from "@/components/about/fadeInSection";
import { FloatingShapesBackground } from "@/components/about/floating-shapes-background";
import Skills from "@/components/about/skills";
import WorkExperience from "@/components/about/work-experience";
import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/about/projects"));

const Education = dynamic(() => import("@/components/about/education"));

const StudyGroup = dynamic(() => import("@/components/about/study-group"));

const Contact = dynamic(() => import("@/components/about/contact"));

export default function Page() {
  return (
    <>
      <FloatingShapesBackground />
      <div className="relative z-10">
        <AboutHeading />
        <WorkExperience />
        <Skills />
        <FadeInSection delay={0} className="mb-8">
          <Projects />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-8">
          <Education />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-8">
          <StudyGroup />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-8">
          <Contact />
        </FadeInSection>
      </div>
    </>
  );
}
