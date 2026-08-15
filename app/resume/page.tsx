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
      {/* 좁은 화면에서는 축소하지 않고 가로 스크롤로 넘긴다. */}
      <div className="flex w-fit min-w-full flex-col items-center gap-8 break-keep px-4 py-8 print:w-auto print:min-w-0 print:gap-0 print:p-0">
        {/* 1장 — 인적사항과 현재 회사 */}
        <ResumePage>
          <ResumeHeader className="mb-8" />

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
                  <ResumeProjectCard projectKey="documentAi" />
                </KeepTogether>
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
        </ResumePage>

        {/* 4장 — 공유·학력·자격 */}
        <ResumePage>
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
