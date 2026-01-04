import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GrowthJourney from "@/components/growth-journey";
import AboutHeading from "@/components/portfolio/about-heading";
import { FadeInSection } from "@/components/portfolio/fadeInSection";
import { FloatingShapesBackground } from "@/components/portfolio/floating-shapes-background";
import WorkExperience from "@/components/portfolio/work-experience";
import { StructuredData } from "@/components/seo/StructuredData";
import { createProfilePageStructuredData } from "@/components/seo/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const Projects = dynamic(() => import("@/components/portfolio/projects"));

const SideProjects = dynamic(() =>
  import("@/components/portfolio/projects").then((mod) => mod.SideProjects),
);

const Education = dynamic(() => import("@/components/portfolio/education"));

const Skills = dynamic(() => import("@/components/portfolio/skills"));

const StudyGroup = dynamic(() => import("@/components/portfolio/study-group"));

const Contact = dynamic(() => import("@/components/portfolio/contact"));

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <StructuredData jsonLd={createProfilePageStructuredData()} />
      <FloatingShapesBackground />
      <div className="relative z-10">
        <AboutHeading />
        {/* <QuestionBlock
          questions={[
            {
              type: "text",
              question:
                "내가 남들보다 월등히 뛰어나다고 생각하는 한 가지는 무엇인가요?",
              answer:
                "저는 변화에 빠르게 적응하는 능력이 뛰어납니다. 영어영문학과 전공으로 시작했지만, 전공 지식이 전무한 상태에서 컴퓨터공학을 복수전공하며 처음에는 많은 어려움을 겪었습니다. 그러나 꾸준한 학습과 끈기 있는 노력으로 빠르게 적응했고, 결국 높은 학점을 받을 수 있었습니다. 이 경험은 개발자로서의 커리어에도 큰 밑바탕이 되었습니다. 새로운 기술이나 익숙하지 않은 환경에서도 빠르게 익히고 적용할 수 있는 역량은 지금도 제 업무의 핵심 강점 중 하나입니다.",
            },
            {
              type: "text",
              question:
                "남들은 쉽게 해결하지 못하는 문제를 본인만의 방법으로 쉽게, 빠르게 해결했던 경험이 있나요?",
              answer:
                "이전 프로젝트에서는 팀원 모두가 취업 준비 중인 상태라 자금이 넉넉하지 않았습니다. 당시 GitHub Organization에 올려진 레포지토리를 Vercel에 배포하려 했지만, 무료 플랜에서는 Organization 레포지토리의 배포가 불가능하다는 제한이 있었습니다. 저는 이 문제를 해결하기 위해 다양한 방법을 탐색했고, 그 과정에서 GitHub Actions를 독학으로 익혔습니다. 이후 Vercel CLI를 활용한 배포 방식으로 전환하여 비용 없이도 배포를 성공적으로 마칠 수 있었습니다. 비록 유료 CI/CD 수준의 완성도는 아니었지만, 한정된 리소스 내에서 창의적인 방법으로 문제를 해결해낸 점에 큰 성취감을 느낄 수 있었습니다.",
            },
            {
              type: "text",
              question:
                "원하는 걸 얻기 위해 '이 정도까지 해봤다' 싶은 경험이 있나요?",
              answer:
                "저는 인생에서 일이 차지하는 비중이 크기 때문에, 반드시 하고 싶은 일을 찾아야 한다고 생각했습니다. 안정적인 성향 탓에 영어영문학과를 큰 고민 없이 다니고 있었지만, 어느 순간 진지하게 제 진로에 대해 고민하게 되었고, 결국 큰 결심 끝에 계획 없는 휴학을 단행했습니다. 허투루 시간을 쓰고 싶지 않아 곧바로 VR 테마파크에서 아르바이트를 시작했고, 그곳에서의 경험을 통해 개발이라는 분야에 흥미를 가지게 되었습니다. 이후 개발자가 되기 위해 학업 방향을 전환하고, 다양한 노력을 기울여 결국 지금 이 자리까지 오게 되었습니다. ‘하고 싶은 일’을 찾기 위해 과감하게 익숙한 환경을 벗어났던 그 선택은 제 인생에서 가장 중요한 결정 중 하나였습니다.",
            },
            {
              type: "text",
              question: "가장 친한 친구들은 나의 어떤 점을 가장 좋아하나요?",
              answer:
                "제 친구들은 제게서 편안함을 느낀다고 말합니다. 저는 갈등이나 분란이 생겨도 감정을 겉으로 드러내기보다는 차분하게 넘어가는 편입니다. 때로는 제가 조금 손해를 보는 상황도 있지만, 순간의 감정으로 소중한 관계를 잃고 싶지 않기 때문에 더 신중하게 행동하려고 노력합니다. 친구들이 마음속 속상함을 제게 털어놓고, 함께 고민하고 극복해가는 과정을 반복하면서 저 스스로도 그런 성향을 자랑스럽게 여기게 되었습니다. 덕분에 친구들과 깊이 있는 관계를 오래 유지할 수 있었고, 저 역시 그 속에서 많은 위로와 힘을 얻고 있습니다.",
            },
          ]}
        /> */}
        <GrowthJourney className="mt-4" />
        <WorkExperience />
        <FadeInSection delay={0} className="mb-8">
          <Skills />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-8">
          <Projects />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-0">
          <SideProjects />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-0">
          <Education />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-2">
          <StudyGroup />
        </FadeInSection>
        <FadeInSection delay={0} className="mb-8">
          <Contact />
        </FadeInSection>
      </div>
    </>
  );
}
