import ProjectCard from "@/components/projectCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GROWTH_JOURNEY, PROJECTS, SKILLS } from "@/constants/about";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function Page() {
  return (
    <>
      <Banner />
      <Title />
      <Description />
      <WorkExperience />
      <Projects />
      <Skills />
      <GrowthJourney />
      <Education />
      <StudyGroup />
      <Contact />
    </>
  );
}

function Banner() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg">
      <Image
        loading="eager"
        priority
        src="/images/about/banner.jpg"
        alt="발표하는 멋진 나의 모습"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h1 className="absolute bottom-0 left-0 right-0 mb-0 flex justify-center text-center text-3xl font-bold text-gray-900 dark:text-white">
        <div className="mb-0 w-fit rounded-t-lg bg-white px-6 pt-2 dark:bg-black">
          About Me
        </div>
      </h1>
    </div>
  );
}

function Title() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
        안녕하세요! 저는 <strong>프론트엔드 개발자 이승현</strong> 입니다.
      </p>
    </div>
  );
}

function Description() {
  return (
    <div className="prose mx-auto mt-4 flex dark:prose-invert">
      <h2 className="mr-5 flex-shrink-0 text-2xl font-bold text-gray-900 dark:text-white">
        저는
      </h2>
      <div>
        <p>
          <strong>일과 생활을 철저히 분리하지 않습니다.</strong> 해결하지 못한
          문제가 있다면, 머릿속에서 끊임없이 비동기적으로 해결 방안을
          모색합니다.
        </p>
        <p>
          <strong>문서화는 저의 성장을 위한 핵심 도구라고 생각합니다.</strong>{" "}
          항상 학습한 내용을 개인 노트에 기록하고, 필요에 따라 블로그 포스트로
          공유합니다. 이러한 문서는 저뿐만 아니라, 비슷한 상황에 처한 동료
          개발자들에게도 유용한 이정표가 될 것이라고 확신합니다.
          <br />{" "}
          <i className="text-gray-400">
            (프론트엔드 개발을 시작한 2023년부터 블로그 활동과 개인 노트 작성을
            시작하여 현재까지 꾸준하게 진행 중)
          </i>{" "}
        </p>
        <p>
          <strong>항상 배우려고 노력하는 개발자</strong>입니다. 수많은
          스터디들을 진행하였고 주로 스터디를 이끌고 진행하는 역할을 해왔습니다.
          <br />{" "}
          <i className="text-gray-400">
            (모던 리액트 딥다이브, 코어 자바스크립트, 코딩테스트, CS 스터디,
            리액트 디자인 패턴, 테스팅 스터디 등)
          </i>
        </p>
      </div>
    </div>
  );
}

function WorkExperience() {
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Work Experience
      </h2>
      <DescriptionWithDuration
        title="삼일 PWC AC/Intern - Frontend Developer"
        duration="2025.01 ~ (현재)"
      />
    </div>
  );
}

function Skills() {
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Skills
      </h2>
      <Accordion
        type="multiple"
        defaultValue={["strong", "knowledgeable"]}
        className="w-full"
      >
        <SkillItem
          title="Strong"
          value="strong"
          itemList={SKILLS.strong.map(({ subtitle, list: skillList }) => ({
            subtitle,
            list: skillList.map((skill) => (
              <Shield key={skill.alt} alt={skill.alt} src={skill.src} />
            )),
          }))}
        />
        <SkillItem
          title="Knowledgeable"
          value="knowledgeable"
          itemList={SKILLS.knowledgeable.map(
            ({ subtitle, list: skillList }) => ({
              subtitle,
              list: skillList.map((skill) => (
                <Shield key={skill.alt} alt={skill.alt} src={skill.src} />
              )),
            }),
          )}
        />
      </Accordion>
    </div>
  );
}

const Shield = ({ alt, src }: { alt: string; src: string }) => (
  <Image
    src={src}
    alt={alt}
    width={140}
    height={32}
    className="mb-0 mt-0 h-8 w-auto"
    style={{ height: "auto" }}
  />
);

function SkillItem({
  title,
  itemList,
  value,
}: {
  title: string;
  itemList: {
    subtitle: string;
    list: ReactNode[];
  }[];
  value: string;
}) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-gray-700 dark:text-gray-300">
        <div className="flex flex-col">
          {itemList.map((item) => (
            <section key={item.subtitle} className="mb-4 flex flex-col gap-2">
              <h4 className="mt-0 text-lg font-bold text-primary dark:text-white">
                {item.subtitle}
              </h4>
              <ul className="flex flex-wrap gap-2">{item.list}</ul>
            </section>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function GrowthJourney() {
  return (
    <Accordion type="single" collapsible defaultValue="growthJourney">
      <AccordionItem value="growthJourney">
        <AccordionTrigger className="text-2xl font-bold text-gray-900 dark:text-white">
          Growth Journey
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {GROWTH_JOURNEY.map((journey) => (
            <p key={journey}>{journey}</p>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
function Projects() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="project"
      className="w-full"
    >
      <AccordionItem value="project">
        <AccordionTrigger className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              duration={project.duration}
              role={project.role}
              description={project.description}
              stack={project.stack}
              features={project.features}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function Education() {
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Education
      </h2>
      <DescriptionWithDuration
        title="인천대학교 졸업 ( 영어영문학과, 컴퓨터공학과 복수전공 )"
        duration="2017.03 ~ 2024.08"
      />
      <DescriptionWithDuration
        title="코드잇 스프린트 FE 부트캠프 수료"
        duration="2024.03 ~ 2024.09"
      />
    </div>
  );
}

function StudyGroup() {
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Study Group
      </h2>
      <DescriptionWithDuration
        title="리액트 디자인 패턴과 테스팅"
        duration="2025.04 ~ (진행중)"
      />
      <DescriptionWithDuration
        title="코딩테스트"
        duration="2024.09 ~ (진행중)"
      />
      <DescriptionWithDuration
        title={
          <Link
            className="text-blue-500"
            href="https://github.com/FE-tech-talk/TechTalk-CS"
            target="_blank"
          >
            CS 스터디
          </Link>
        }
        duration="2024.07 ~ 2024.08"
      />
      <DescriptionWithDuration
        title={
          <Link
            className="text-blue-500"
            href="https://github.com/FE-tech-talk/TechTalk-React"
            target="_blank"
          >
            모던 리액트 딥다이브
          </Link>
        }
        duration="2024.05 ~ 2024.07"
      />
      <DescriptionWithDuration
        title={
          <Link
            className="text-blue-500"
            href="https://github.com/FE-tech-talk/codeit14_techtalk"
            target="_blank"
          >
            코어 자바스크립트
          </Link>
        }
        duration="2024.04 ~ 2024.05"
      />
    </div>
  );
}

function Contact() {
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Contact
      </h2>
      <ContactItem
        title="인스타"
        url="https://www.instagram.com/happy_fug/"
        description="codefug의 일상 구경하기"
      />
      <ContactItem
        title="GitHub"
        url="https://github.com/codefug"
        description="codefug의 세련된 깃허브 구경하기"
      />
      <ContactItem
        title="블로그"
        url="/"
        description="codefug가 연구중인 자료 탐구하기"
      />
    </div>
  );
}

function ContactItem({
  title,
  url,
  description,
}: {
  title: string;
  url: string;
  description: string;
}) {
  return (
    <div className="mb-0 mt-0">
      <span className="text-gray-700 dark:text-gray-300">{title}:</span>
      <Link
        href={url}
        className="ml-2 text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {description}
      </Link>
    </div>
  );
}

function DescriptionWithDuration({
  title,
  duration,
}: {
  title: ReactNode;
  duration: string;
}) {
  return (
    <div className="mb-0 mt-0">
      <span className="text-gray-700 dark:text-gray-300">{duration}</span>
      <span className="ml-2 text-gray-700 dark:text-gray-300">{title}</span>
    </div>
  );
}
