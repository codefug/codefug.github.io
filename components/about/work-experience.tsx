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

export default function WorkExperience() {
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
