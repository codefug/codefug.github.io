import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SidebarOff } from "@/components/portfolio/sidebar-off";
import AboutMe from "@/components/resume/about-me";
import Activities from "@/components/resume/activities";
import ResumeEducation from "@/components/resume/education";
import KnowledgeSharing from "@/components/resume/knowledge-sharing";
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
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resume.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.RESUME),
  };
}

function Divider({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        "my-1 border-gray-200 dark:border-gray-700 print:my-2",
        className,
      )}
    />
  );
}

export default function Page() {
  return (
    <>
      <SidebarOff />
      <StructuredData
        jsonLd={createProfilePageStructuredData(defaultLocale, PATH.RESUME)}
      />
      <div className="mx-auto max-w-4xl break-keep px-4 py-8 print:max-w-none print:px-8 print:pt-10 print:pb-6">
        <ResumeHeader />
        <Divider />

        <AboutMe />
        <Divider />

        <WorkExperienceSection>
          <CompanySection companyKey="allra">
            <FadeIn>
              <ResumeProjectCard projectKey="allra" />
            </FadeIn>
            <FadeIn className="print:break-before-page print:pt-4">
              <ResumeProjectCard projectKey="allraAdmin" />
            </FadeIn>
          </CompanySection>

          <CompanySection companyKey="pwc" className="mt-8">
            <FadeIn>
              <ResumeProjectCard projectKey="digitalFinance" />
            </FadeIn>
            <FadeIn>
              <ResumeProjectCard projectKey="documentAi" />
            </FadeIn>
            <FadeIn>
              <ResumeProjectCard projectKey="samilDevKit" />
            </FadeIn>
          </CompanySection>
        </WorkExperienceSection>

        <Divider className="print:hidden" />

        <FadeIn className="print:break-before-page print:pt-4">
          <SideProjects />
        </FadeIn>

        <Divider />

        <FadeIn>
          <Activities />
        </FadeIn>

        <Divider />

        <FadeIn className="grid grid-cols-1 gap-6 md:grid-cols-2 print:grid-cols-2">
          <KnowledgeSharing />
          <ResumeEducation />
        </FadeIn>
      </div>
    </>
  );
}
