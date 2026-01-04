"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("portfolio");
  return (
    <h1
      className={cn(
        "mb-0 flex text-start font-bold text-3xl text-gray-900 dark:text-white",
        className,
      )}
    >
      <div className="mb-0 w-fit whitespace-pre-line break-keep rounded-t-lg pt-2">
        {t("name")}
      </div>
    </h1>
  );
};

const RoleAnimation = ({ className }: { className?: string }) => {
  const t = useTranslations("portfolio");
  return (
    <TypeAnimation
      sequence={[t("role")]}
      wrapper="div"
      speed={80}
      cursor={false}
      className={cn("mb-4 font-bold text-lg text-primary", className)}
    />
  );
};

const IntroAnimation = ({ className }: { className?: string }) => {
  const t = useTranslations("portfolio");
  return (
    <TypeAnimation
      key={t("intro")}
      sequence={[1000, t("intro"), 1000]}
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
