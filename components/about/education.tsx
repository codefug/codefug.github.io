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

export default function Education() {
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
