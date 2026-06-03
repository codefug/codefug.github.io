import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SidebarOff } from "@/components/portfolio/sidebar-off";
import AboutMe from "@/components/resume/about-me";
import Activities from "@/components/resume/activities";
import ResumeEducation from "@/components/resume/education";
import KnowledgeSharing from "@/components/resume/knowledge-sharing";
import OpenSource from "@/components/resume/open-source";
import ResumeHeader from "@/components/resume/resume-header";
import ResumeProjectCard from "@/components/resume/resume-project-card";
import SideProjects from "@/components/resume/side-projects";
import WorkExperienceSection, {
  CompanySection,
} from "@/components/resume/work-experience";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createProfilePageStructuredData,
} from "@/components/seo/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { PATH } from "@/constants/path";
import { defaultLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resume.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.RESUME),
  };
}

export default function Page() {
  return (
    <>
      <SidebarOff />
      <StructuredData
        jsonLd={createProfilePageStructuredData(defaultLocale, PATH.RESUME)}
      />
      <div className="mx-auto max-w-4xl break-keep px-4 py-8 print:max-w-none print:p-0">
        <ResumeHeader />

        <AboutMe />

        <WorkExperienceSection>
          <div>
            <CompanySection companyKey="allra" />
            <div className="mt-2 space-y-2 print:mt-1">
              <FadeIn>
                <ResumeProjectCard projectKey="allra" />
              </FadeIn>
              <FadeIn>
                <ResumeProjectCard projectKey="allraAdmin" />
              </FadeIn>
            </div>
          </div>

          <div>
            <CompanySection companyKey="pwc" />
            <div className="mt-2 space-y-2 print:mt-1">
              <FadeIn>
                <ResumeProjectCard projectKey="digitalFinance" />
              </FadeIn>
              <FadeIn>
                <ResumeProjectCard projectKey="documentAi" />
              </FadeIn>
              <FadeIn>
                <ResumeProjectCard projectKey="samilDevKit" />
              </FadeIn>
            </div>
          </div>
        </WorkExperienceSection>

        <FadeIn>
          <SideProjects />
        </FadeIn>

        <FadeIn>
          <Activities />
        </FadeIn>

        <FadeIn>
          <OpenSource />
        </FadeIn>

        <FadeIn className="grid grid-cols-1 gap-6 md:grid-cols-2 print:grid-cols-2">
          <KnowledgeSharing />
          <ResumeEducation />
        </FadeIn>
      </div>
    </>
  );
}
