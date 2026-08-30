import type { Metadata } from "next";
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
  defaultOpenGraph,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { SITE_URL } from "@/constants/site";
import { getTranslations } from "@/lib/messages";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resume.meta");
  return {
    title: t("title"),
    description: t("description"),
    // 경력기술서와 함께 링크로 전달하는 문서라 검색 인덱싱을 막는다. sitemap 제외와 짝이다.
    robots: { index: false, follow: false },
    alternates: createAlternateLinks(PATH.RESUME),
    openGraph: {
      ...defaultOpenGraph,
      type: "profile",
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}${PATH.RESUME}`,
    },
  };
}

export default function Page() {
  return (
    <>
      <StructuredData jsonLd={createProfilePageStructuredData(PATH.RESUME)} />
      {/*
        인쇄 기준으로 A4 한 장이 ResumePage 하나다.
        페이지를 나누거나 합치려면 ResumePage 경계에서 섹션을 옮기면 된다.
      */}
      {/* 좁은 화면에서는 축소하지 않고 가로 스크롤로 넘긴다. */}
      <div className="flex w-fit min-w-full flex-col items-center gap-8 break-keep px-4 py-8 print:w-auto print:min-w-0 print:gap-0 print:p-0">
        <ResumePage pageNumber={1} pageCount={2}>
          {/*
            1장은 헤더+카드 하나뿐이라 하단이 빈다. 폰트를 더 키우면 같은
            컴포넌트를 쓰는 2장이 넘치므로, 이 장에서만 섹션 간격을 벌려 채운다.
          */}
          <ResumeHeader className="mb-8" />

          <WorkExperienceSection>
            <div>
              <CompanySection companyKey="allra" />
              <TeamSection companyKey="allra">
                <KeepTogether className="mt-4">
                  <ResumeProjectCard projectKey="allra" />
                </KeepTogether>
              </TeamSection>
            </div>
          </WorkExperienceSection>
        </ResumePage>

        <ResumePage pageNumber={2} pageCount={2}>
          <WorkExperienceSection>
            <div>
              <CompanySection companyKey="pwc" />
              <TeamSection companyKey="pwc">
                <KeepTogether>
                  <ResumeProjectCard projectKey="digitalFinance" />
                </KeepTogether>
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
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-4">
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
          </div>
        </ResumePage>
      </div>
    </>
  );
}
