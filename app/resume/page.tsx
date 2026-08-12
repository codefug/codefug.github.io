import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SidebarOff } from "@/components/portfolio/sidebar-off";
import ResumeCertification from "@/components/resume/certification";
import ResumeEducation from "@/components/resume/education";
import KnowledgeSharing from "@/components/resume/knowledge-sharing";
import OpenSource from "@/components/resume/open-source";
import ResumeHeader from "@/components/resume/resume-header";
import ResumeProjectCard from "@/components/resume/resume-project-card";
import SideProjects from "@/components/resume/side-projects";
import WorkExperienceSection, {
  CompanySection,
  TeamSection,
} from "@/components/resume/work-experience";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createProfilePageStructuredData,
} from "@/components/seo/utils";
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
      <div className="mx-auto max-w-4xl space-y-10 break-keep px-4 py-8 print:max-w-none print:space-y-6 print:p-0">
        <ResumeHeader />

        <WorkExperienceSection>
          <div>
            <CompanySection companyKey="allra" />
            <TeamSection companyKey="allra">
              <ResumeProjectCard projectKey="allra" />
              <ResumeProjectCard
                projectKey="allraAdmin"
                className="print:break-before-page"
              />
            </TeamSection>
          </div>

          <div>
            <CompanySection companyKey="pwc" />
            <TeamSection companyKey="pwc">
              <ResumeProjectCard projectKey="digitalFinance" />
              <ResumeProjectCard projectKey="documentAi" />
              <ResumeProjectCard projectKey="samilDevKit" />
            </TeamSection>
          </div>
        </WorkExperienceSection>

        <SideProjects className="print:break-before-page" />

        <OpenSource />

        <KnowledgeSharing />

        <ResumeEducation />

        <ResumeCertification />
      </div>
    </>
  );
}
