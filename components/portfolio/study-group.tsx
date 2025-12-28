import Link from "next/link";
import type { ReactNode } from "react";
import { STUDY_GROUPS } from "@/constants/about";
import { HeadComponent } from "./HeadComponent";

function DescriptionWithDuration({
  title,
  duration,
}: {
  title: ReactNode;
  duration: string;
}) {
  return (
    <div className="mt-0 mb-0">
      <span className="text-gray-700 dark:text-gray-300">{duration}</span>
      <span className="ml-2 text-gray-700 dark:text-gray-300">{title}</span>
    </div>
  );
}

export default function StudyGroup() {
  return (
    <div className="prose dark:prose-invert mx-auto mt-4">
      <HeadComponent>Study Groups</HeadComponent>
      {STUDY_GROUPS.map((studyGroup) => (
        <DescriptionWithDuration
          key={studyGroup.title}
          title={
            studyGroup.url ? (
              <Link
                className="text-primary"
                href={studyGroup.url}
                target="_blank"
              >
                {studyGroup.title}
              </Link>
            ) : (
              studyGroup.title
            )
          }
          duration={studyGroup.duration}
        />
      ))}
    </div>
  );
}
