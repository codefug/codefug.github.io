import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import GrowthJourney from "@/components/growth-journey";
import AboutHeading from "@/components/portfolio/about-heading";
import { FadeInSection } from "@/components/portfolio/fadeInSection";
import { FloatingShapesBackground } from "@/components/portfolio/floating-shapes-background";
import { SidebarOff } from "@/components/portfolio/sidebar-off";
import WorkExperience from "@/components/portfolio/work-experience";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createProfilePageStructuredData,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { defaultLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("portfolio.meta");

  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.PORTFOLIO),
  };
}

const Projects = dynamic(() => import("@/components/portfolio/projects"));

const SideProjects = dynamic(() =>
  import("@/components/portfolio/projects").then((mod) => mod.SideProjects),
);

const Education = dynamic(() => import("@/components/portfolio/education"));

const Skills = dynamic(() => import("@/components/portfolio/skills"));

const StudyGroup = dynamic(() => import("@/components/portfolio/study-group"));

const Contact = dynamic(() => import("@/components/portfolio/contact"));

export default function Page() {
  return (
    <>
      <SidebarOff />
      <StructuredData jsonLd={createProfilePageStructuredData(defaultLocale)} />
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
          <SideProjects />
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
