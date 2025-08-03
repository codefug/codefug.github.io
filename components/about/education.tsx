import { EDUCATION } from "@/constants/about";
import Image from "next/image";
import { ReactNode } from "react";
import { HeadComponent } from "./HeadComponent";

function DescriptionWithDuration({
  title,
  duration,
  image,
  description,
}: {
  image: string;
  title: ReactNode;
  duration: string;
  description?: ReactNode;
}) {
  return (
    <div className="mb-0 mt-0 flex">
      <Image
        src={image}
        alt={`${title} Logo`}
        width={128}
        height={128}
        className="mr-2 inline-block h-32 w-32 rounded-lg object-contain"
      />
      <section>
        <div className="text-gray-700 dark:text-gray-300">{duration}</div>
        <div className="text-gray-700 dark:text-gray-300">{title}</div>
        <div className="whitespace-pre-line text-gray-500 dark:text-gray-400">
          {description}
        </div>
      </section>
    </div>
  );
}

export default function Education() {
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <HeadComponent>Education</HeadComponent>
      {EDUCATION.map((edu) => (
        <DescriptionWithDuration
          key={edu.title}
          title={edu.title}
          duration={edu.duration}
          description={edu.description}
          image={edu.image}
        />
      ))}
    </div>
  );
}
