import Link from "next/link";
import { ReactNode } from "react";

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

export default function StudyGroup() {
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
