import GrowthJourney from "@/components/growth-journey";
import AboutHeading from "@/components/portfolio/about-heading";
import { FadeInSection } from "@/components/portfolio/fadeInSection";
import { FloatingShapesBackground } from "@/components/portfolio/floating-shapes-background";
import WorkExperience from "@/components/portfolio/work-experience";
import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/portfolio/projects"));

const Education = dynamic(() => import("@/components/portfolio/education"));

const Skills = dynamic(() => import("@/components/portfolio/skills"));

const StudyGroup = dynamic(() => import("@/components/portfolio/study-group"));

const Contact = dynamic(() => import("@/components/portfolio/contact"));

export default function Page() {
  return (
    <>
      <FloatingShapesBackground />
      <div className="relative z-10">
        <AboutHeading />
        <GrowthJourney />
        <WorkExperience />
        <FadeInSection delay={0} className="mb-8">
          <Skills />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-8">
          <Projects />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-0">
          <Education />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-2">
          <StudyGroup />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-8">
          <Contact />
        </FadeInSection>
      </div>
    </>
  );
}
