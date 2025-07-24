import AboutHeading from "@/components/about/banner";
import Contact from "@/components/about/contact";
import Description from "@/components/about/description";
import Education from "@/components/about/education";
import GrowthJourney from "@/components/about/growth-journey";
import Projects from "@/components/about/projects";
import Skills from "@/components/about/skills";
import StudyGroup from "@/components/about/study-group";
import Title from "@/components/about/title";
import WorkExperience from "@/components/about/work-experience";

export default function Page() {
  return (
    <>
      <AboutHeading />
      <Title />
      <Description />
      <WorkExperience />
      <Projects />
      <Skills />
      <GrowthJourney />
      <Education />
      <StudyGroup />
      <Contact />
    </>
  );
}
