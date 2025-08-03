import Image from "next/image";
import { HeadComponent } from "./HeadComponent";

function DescriptionWithDuration({
  company,
  duration,
  team,
  job,
}: {
  company: string;
  duration: string;
  team: string;
  job: string;
}) {
  return (
    <div className="-mt-6 mb-4 ml-4">
      <figure className="my-0 flex items-center gap-4">
        <section className="relative mb-2 flex h-32 w-32 items-center overflow-hidden rounded-lg bg-white">
          <Image
            src="/images/logos/pwc-logo.svg"
            alt="PwC Logo"
            fill
            className="object-contain"
          />
        </section>
        <section className="text-gray-700 dark:text-gray-300">
          <div>{company}</div>
          <div>Team: {team}</div>
          <div>Job: {job}</div>
          <div>{duration}</div>
        </section>
      </figure>{" "}
    </div>
  );
}

export default function WorkExperience() {
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <HeadComponent>Work Experience</HeadComponent>
      <DescriptionWithDuration
        company="Samil PwC AC"
        duration="2025.01 ~ (현재)"
        team="Digital"
        job="Frontend Developer"
      />
    </div>
  );
}
