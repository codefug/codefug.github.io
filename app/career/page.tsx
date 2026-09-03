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
          항목마다 검토 표와 회고가 붙어 한 항목이 길다.
          장별로 실을 항목을 인덱스로 지정해 페이지 경계를 직접 잡는다.
        */}
        {/*
          본문 영역이 1045px이고 항목 하나가 420~525px다. 머리말이 붙는 장은
          항목 하나, 본문만 있는 장은 항목 둘이 들어간다. 항목이 페이지
          경계에서 잘리지 않도록 이 예산에 맞춰 장을 나눈다.

          항목 순서는 이력서(app/resume)의 카테고리 순서와 같게 둔다.
          두 문서를 나란히 놓고 대조하는 사람이 있기 때문이다.
        */}
        {/*
          장마다 항목 수가 달라 바닥 공백이 들쑥날쑥해진다. 폰트는 본문 11px로
          통일하고, 남는 공백은 장별 간격(헤더 아래 여백, 항목 사이 간격)으로
          분산해 바닥에 몰리지 않게 한다. 항목을 옮기면 간격도 다시 잡을 것.
        */}
        <ResumePage pageNumber={1} pageCount={6}>
          <CareerHeader className="mb-8" />
          <CareerCompany companyKey="allra" className="flex flex-col gap-2">
            <CareerProject
              projectKey="allra"
              items={[0]}
              className="flex flex-col gap-6"
            />
          </CareerCompany>
        </ResumePage>

        <ResumePage pageNumber={2} pageCount={6}>
          <CareerProject
            projectKey="allra"
            items={[1, 2]}
            headless
            itemsClassName="space-y-12"
          />
        </ResumePage>

        <ResumePage pageNumber={3} pageCount={6}>
          <CareerProject
            projectKey="allra"
            items={[3, 4]}
            headless
            itemsClassName="space-y-12"
          />
        </ResumePage>

        <ResumePage pageNumber={4} pageCount={6}>
          <CareerProject
            projectKey="allra"
            items={[5, 6]}
            headless
            itemsClassName="space-y-12"
          />
        </ResumePage>

        <ResumePage pageNumber={5} pageCount={6}>
          <CareerCompany companyKey="pwc">
            <CareerProject projectKey="digitalFinance" />
          </CareerCompany>
          <CareerProject projectKey="documentAi" className="mt-12" />
        </ResumePage>

        <ResumePage pageNumber={6} pageCount={6}>
          <CareerProject projectKey="samilDevKit" />
          <CareerExtras className="mt-12" />
        </ResumePage>
      </div>
    </>
  );
}
