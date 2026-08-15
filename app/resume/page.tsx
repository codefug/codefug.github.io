import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SidebarOff } from "@/components/portfolio/sidebar-off";
import ResumeCertification from "@/components/resume/certification";
import ResumeEducation from "@/components/resume/education";
import KnowledgeSharing from "@/components/resume/knowledge-sharing";
import OpenSource from "@/components/resume/open-source";
import ResumeHeader from "@/components/resume/resume-header";
import { KeepTogether, ResumePage } from "@/components/resume/resume-page";
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
      {/*
        인쇄 기준으로 A4 한 장이 ResumePage 하나다.
        페이지를 나누거나 합치려면 ResumePage 경계에서 섹션을 옮기면 된다.
      */}
      <div className="flex flex-col gap-8 break-keep py-8 print:gap-0 print:py-0">
        {/* 1장 — 인적사항과 현재 회사 */}
        <ResumePage>
          <ResumeHeader />

          <WorkExperienceSection>
            <div>
              <CompanySection companyKey="allra" />
              <TeamSection companyKey="allra">
                <KeepTogether>
                  <ResumeProjectCard projectKey="allra" />
                </KeepTogether>
              </TeamSection>
            </div>
          </WorkExperienceSection>
        </ResumePage>

        {/* 2장 — 어드민과 이전 회사 */}
        <ResumePage>
          <WorkExperienceSection>
            <div>
              <TeamSection companyKey="allra" headless>
                <KeepTogether>
                  <ResumeProjectCard projectKey="allraAdmin" />
                </KeepTogether>
              </TeamSection>
            </div>

            <div>
              <CompanySection companyKey="pwc" />
              <TeamSection companyKey="pwc">
                <KeepTogether>
                  <ResumeProjectCard projectKey="digitalFinance" />
                </KeepTogether>
                <KeepTogether>
                  <ResumeProjectCard projectKey="documentAi" />
                </KeepTogether>
              </TeamSection>
            </div>
          </WorkExperienceSection>
        </ResumePage>

        {/* 3장 — 나머지 경력과 활동 */}
        <ResumePage>
          <WorkExperienceSection>
            <div>
              <TeamSection companyKey="pwc" headless>
                <KeepTogether>
                  <ResumeProjectCard projectKey="samilDevKit" />
                </KeepTogether>
              </TeamSection>
            </div>
          </WorkExperienceSection>

          <KeepTogether>
            <SideProjects />
          </KeepTogether>

          <KeepTogether>
            <OpenSource />
          </KeepTogether>

          <KeepTogether>
            <KnowledgeSharing />
          </KeepTogether>

          <KeepTogether>
            <ResumeEducation />
          </KeepTogether>

          <KeepTogether>
            <ResumeCertification />
          </KeepTogether>
        </ResumePage>
      </div>
    </>
  );
}
