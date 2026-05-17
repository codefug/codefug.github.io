import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { FadeInSection } from "@/components/portfolio/fadeInSection";
import { SidebarOff } from "@/components/portfolio/sidebar-off";
import AboutMe from "@/components/resume/about-me";
import ResumeHeader from "@/components/resume/resume-header";
import ResumeWorkExperience from "@/components/resume/work-experience";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createProfilePageStructuredData,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { defaultLocale } from "@/i18n/config";

const ResumeProjectCard = dynamic(
  () => import("@/components/resume/resume-project-card"),
);
const KnowledgeSharing = dynamic(
  () => import("@/components/resume/knowledge-sharing"),
);
const ResumeEducation = dynamic(() => import("@/components/resume/education"));

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resume.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.RESUME),
  };
}

function Divider() {
  return (
    <hr className="my-1 border-gray-200 dark:border-gray-700 print:border-gray-300" />
  );
}

export default function Page() {
  return (
    <>
      <SidebarOff />
      <StructuredData
        jsonLd={createProfilePageStructuredData(defaultLocale, PATH.RESUME)}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 print:max-w-none print:px-0 print:pt-4 print:pb-0">
        <ResumeHeader />
        <Divider />

        <AboutMe />
        <Divider />

        <ResumeWorkExperience />
        <Divider />

        {/* 프로젝트 섹션 — 화면: FadeIn 애니, 인쇄: 그대로 표시 */}
        <FadeInSection delay={0}>
          <ResumeProjectCard projectKey="allra" />
        </FadeInSection>
        <FadeInSection delay={0}>
          <ResumeProjectCard projectKey="allraAdmin" />
        </FadeInSection>
        <FadeInSection delay={0}>
          <ResumeProjectCard projectKey="digitalFinance" />
        </FadeInSection>
        <FadeInSection delay={0}>
          <ResumeProjectCard projectKey="documentAi" />
        </FadeInSection>
        <FadeInSection delay={0}>
          <ResumeProjectCard projectKey="samilDevKit" />
        </FadeInSection>

        <Divider />

        <FadeInSection delay={0}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:grid-cols-2">
            <KnowledgeSharing />
            <ResumeEducation />
          </div>
        </FadeInSection>
      </div>
    </>
  );
}
