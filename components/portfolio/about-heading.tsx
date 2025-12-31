"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { cn } from "@/lib/utils";

export default function AboutHeading() {
  return (
    <div className="mb-8">
      <AboutHeadingContent />
      <AboutHeadingContentMobile />
    </div>
  );
}

const ProfileImage = ({
  className,
  fullSize = false,
}: {
  className?: string;
  fullSize?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative shrink-0",
        className,
        fullSize ? "aspect-square w-full" : "h-52 w-52",
      )}
    >
      <Image
        loading="eager"
        src="/images/about/profile.svg"
        alt="About Banner"
        fill
        className="mb-4 rounded-lg object-contain"
      />
    </div>
  );
};

const NameHeading = ({ className }: { className?: string }) => {
  return (
    <h1
      className={cn(
        "mb-0 flex text-start font-bold text-3xl text-gray-900 dark:text-white",
        className,
      )}
    >
      <div className="mb-0 w-fit whitespace-pre-line break-keep rounded-t-lg pt-2">
        이승현 Lee Seoung Hyun
      </div>
    </h1>
  );
};

const RoleAnimation = ({ className }: { className?: string }) => {
  return (
    <TypeAnimation
      sequence={["Efficiency-driven developer"]}
      wrapper="div"
      speed={80}
      cursor={false}
      className={cn("mb-4 font-bold text-lg text-primary", className)}
    />
  );
};

const IntroAnimation = ({ className }: { className?: string }) => {
  return (
    <TypeAnimation
      sequence={[
        1000,
        "저는 효율을 위해 고민하는 개발자입니다. 반복되는 작업은 자동화하고, 복잡한 구조는 단순화합니다. 문제를 해결하지 못한 채 하루를 마무리할 수 없어, 퇴근 후에도 머릿속에서 비동기적으로 해결책을 계산합니다.",
        1000,
      ]}
      wrapper="div"
      speed={90}
      cursor={false}
      className={cn("mt-2 w-full break-keep text-md", className)}
    />
  );
};

const AboutHeadingContent = () => {
  return (
    <figure className="hidden gap-4 sm:flex">
      <ProfileImage />
      <section>
        <NameHeading />
        <RoleAnimation />
        <IntroAnimation />
      </section>
    </figure>
  );
};

const AboutHeadingContentMobile = () => {
  return (
    <figure className="block sm:hidden">
      <section className="px-10">
        <ProfileImage fullSize className="mb-6" />
      </section>
      <NameHeading className="mb-1" />
      <RoleAnimation />
      <IntroAnimation />
    </figure>
  );
};
