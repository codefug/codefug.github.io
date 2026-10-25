import type { Metadata } from "next";
import CareerHeader from "@/components/career/career-header";
import {
  CareerCompany,
  CareerExtras,
  CareerProject,
} from "@/components/career/career-project";
import { ResumePage } from "@/components/resume/resume-page";
import { StructuredData } from "@/components/seo/structured-data";
import {
  createAlternateLinks,
  createProfilePageStructuredData,
  defaultOpenGraph,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { SITE_URL } from "@/constants/site";
import { CAREER } from "@/content/career";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = CAREER;
  return {
    title: meta.title,
    description: meta.description,
    // 재직 회사 내부 서술이 담겨 링크로만 전달한다. sitemap 제외와 짝이다.
    robots: { index: false, follow: false },
    alternates: createAlternateLinks(PATH.CAREER),
    openGraph: {
      ...defaultOpenGraph,
      type: "profile",
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${PATH.CAREER}`,
    },
  };
}

const CAREER_SCALE = 0.87;

export default function Page() {
  return (
    <>
      <StructuredData jsonLd={createProfilePageStructuredData(PATH.CAREER)} />
      {/* career-document: 다크 모드에서도 흰 종이 문서로 둔다 (globals.css). */}
      <div className="career-document flex w-fit min-w-full flex-col items-center gap-8 break-keep px-4 py-8 print:w-auto print:min-w-0 print:gap-0 print:p-0">
        {/* 항목 순서는 이력서(app/resume)와 같게 둔다. 두 문서를 대조해 읽는 사람이 있다. */}
        <ResumePage pageNumber={1} pageCount={3} scale={CAREER_SCALE}>
          <CareerHeader className="mb-3" />
          <CareerCompany companyKey="allra" className="flex flex-col gap-2">
            <CareerProject projectKey="allra" items={[0, 1]} />
          </CareerCompany>
        </ResumePage>

        <ResumePage pageNumber={2} pageCount={3} scale={CAREER_SCALE}>
          <CareerProject projectKey="allra" items={[2, 3]} headless />
          <CareerProject projectKey="allraAiAnalysis" className="mt-6" />
        </ResumePage>

        <ResumePage pageNumber={3} pageCount={3} scale={CAREER_SCALE}>
          <CareerProject projectKey="allraAdmin" />
          <CareerCompany companyKey="pwc" className="mt-8 [&>div]:space-y-6">
            <CareerProject projectKey="documentAi" />
            <CareerProject projectKey="digitalFinance" />
          </CareerCompany>
          <CareerExtras className="mt-8" />
        </ResumePage>
      </div>
    </>
  );
}
