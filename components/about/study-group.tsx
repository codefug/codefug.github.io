import { STUDY_GROUPS } from "@/constants/about";
import Link from "next/link";
import { ReactNode } from "react";
import { HeadComponent } from "./HeadComponent";

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
