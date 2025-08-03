import AboutHeading from "@/components/about/about-heading";
import Contact from "@/components/about/contact";
import Education from "@/components/about/education";
import Projects from "@/components/about/projects";
import Skills from "@/components/about/skills";
import StudyGroup from "@/components/about/study-group";
import WorkExperience from "@/components/about/work-experience";

export default function Page() {
  return (
    <>
      <AboutHeading />
      <WorkExperience />
      <Skills />
      <Projects />
      <Education />
      <StudyGroup />
      <Contact />
    </>
  );
}
