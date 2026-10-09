import type { Metadata } from "next";
import CareerHeader from "@/components/career/career-header";
import {
  CareerCompany,
  CareerExtras,
  CareerProject,
} from "@/components/career/career-project";
import { ResumePage } from "@/components/resume/resume-page";
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
  const t = await getTranslations("career.meta");
  return {
    title: t("title"),
    description: t("description"),
    // 재직 회사의 인증 구조 서술이 담긴 문서라 검색 인덱싱을 막는다.
    // 링크를 전달받은 사람만 보는 것이 의도다. sitemap 제외와 짝이다.
    robots: { index: false, follow: false },
    alternates: createAlternateLinks(PATH.CAREER),
    openGraph: {
      ...defaultOpenGraph,
      type: "profile",
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}${PATH.CAREER}`,
    },
  };
}

const CAREER_SCALE = 0.87;

export default function Page() {
  return (
    <>
      <StructuredData jsonLd={createProfilePageStructuredData(PATH.CAREER)} />
      {/*
        경력기술서는 흰 종이 위의 문서라 테마를 따라가지 않는다.
        career-document 클래스에 걸린 규칙이 공용 RichText의 dark: 변형까지
        되돌린다. (globals.css 참고)
      */}
      <div className="career-document flex w-fit min-w-full flex-col items-center gap-8 break-keep px-4 py-8 print:w-auto print:min-w-0 print:gap-0 print:p-0">
        {/*
          장별로 실을 항목을 인덱스로 지정해 페이지 경계를 직접 잡는다.
          항목 순서는 이력서(app/resume)의 카테고리 순서와 같게 둔다.
          두 문서를 나란히 놓고 대조하는 사람이 있기 때문이다.
        */}
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
