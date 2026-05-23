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

const fadeIn =
  "animate-in fade-in slide-in-from-bottom-12 duration-700 ease-out fill-mode-both print:animate-none";

export default function Page() {
  return (
    <>
      <SidebarOff />
      <StructuredData
        jsonLd={createProfilePageStructuredData(defaultLocale, PATH.RESUME)}
      />
      <div className="mx-auto max-w-4xl break-keep px-4 py-8 print:max-w-none print:px-10 print:pt-12 print:pb-8">
        <ResumeHeader />
        <Divider />

        <AboutMe />
        <Divider />

        <WorkExperienceSection>
          <CompanySection companyKey="allra">
            <ResumeProjectCard projectKey="allra" className={fadeIn} />
            <ResumeProjectCard
              projectKey="allraAdmin"
              className={cn(fadeIn, "print:break-before-page print:pt-6")}
            />
          </CompanySection>

          <CompanySection companyKey="pwc" className="mt-8">
            <ResumeProjectCard projectKey="digitalFinance" className={fadeIn} />
            <ResumeProjectCard projectKey="documentAi" className={fadeIn} />
            <ResumeProjectCard projectKey="samilDevKit" className={fadeIn} />
          </CompanySection>
        </WorkExperienceSection>

        <Divider className="print:hidden" />

        <SideProjects
          className={cn(fadeIn, "print:break-before-page print:pt-6")}
        />

        <Divider />

        <Activities className={fadeIn} />

        <Divider />

        <div
          className={cn(
            fadeIn,
            "grid grid-cols-1 gap-6 md:grid-cols-2 print:grid-cols-2",
          )}
        >
          <KnowledgeSharing />
          <ResumeEducation />
        </div>
      </div>
    </>
  );
}
