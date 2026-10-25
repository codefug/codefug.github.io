import type { Metadata } from "next";
import KnowledgeSharing from "@/components/resume/knowledge-sharing";
import OpenSource from "@/components/resume/open-source";
import ResumeHeader from "@/components/resume/resume-header";
import { KeepTogether, ResumePage } from "@/components/resume/resume-page";
import ResumeProjectCard from "@/components/resume/resume-project-card";
import SideProjects from "@/components/resume/side-projects";
import TitledList from "@/components/resume/titled-list";
import WorkExperienceSection, {
  CompanySection,
  TeamSection,
} from "@/components/resume/work-experience";
import { StructuredData } from "@/components/seo/structured-data";
import {
  createAlternateLinks,
  createProfilePageStructuredData,
  defaultOpenGraph,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { SITE_URL } from "@/constants/site";
import { RESUME } from "@/content/resume";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = RESUME;
  return {
    title: meta.title,
    description: meta.description,
    // 경력기술서와 함께 링크로 전달하는 문서라 검색 인덱싱을 막는다. sitemap 제외와 짝이다.
    robots: { index: false, follow: false },
    alternates: createAlternateLinks(PATH.RESUME),
    openGraph: {
      ...defaultOpenGraph,
      type: "profile",
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${PATH.RESUME}`,
    },
  };
}

const RESUME_SCALE = 0.86;

export default function Page() {
  return (
    <>
      <StructuredData jsonLd={createProfilePageStructuredData(PATH.RESUME)} />
      {/* ResumePage 하나가 인쇄 A4 한 장이다. 좁은 화면에서는 축소하지 않고 가로 스크롤로 넘긴다. */}
      <div className="flex w-fit min-w-full flex-col items-center gap-8 break-keep px-4 py-8 print:w-auto print:min-w-0 print:gap-0 print:p-0">
        <ResumePage pageNumber={1} pageCount={2} scale={RESUME_SCALE}>
          <ResumeHeader className="mb-2" />

          <WorkExperienceSection>
            <div>
              <CompanySection companyKey="allra" />
              <TeamSection companyKey="allra">
                <KeepTogether className="mt-3">
                  <ResumeProjectCard projectKey="allra" />
                </KeepTogether>
                <KeepTogether>
                  <ResumeProjectCard projectKey="allraAdmin" />
                </KeepTogether>
                <KeepTogether>
                  <ResumeProjectCard projectKey="allraAiAnalysis" />
                </KeepTogether>
              </TeamSection>
            </div>
          </WorkExperienceSection>
        </ResumePage>

        <ResumePage pageNumber={2} pageCount={2} scale={RESUME_SCALE}>
          <WorkExperienceSection hideHeading>
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
          <KeepTogether className="mt-1">
            <SideProjects />
          </KeepTogether>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3">
            <KeepTogether>
              <OpenSource />
            </KeepTogether>
            <KeepTogether>
              <KnowledgeSharing />
            </KeepTogether>
            <KeepTogether>
              <TitledList {...RESUME.education} />
            </KeepTogether>
            <KeepTogether>
              <TitledList {...RESUME.certification} />
            </KeepTogether>
          </div>
        </ResumePage>
      </div>
    </>
  );
}
