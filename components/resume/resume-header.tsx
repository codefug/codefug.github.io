"use client";

import { Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GithubIcon from "@/assets/icons/GithubIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import { CONTACT_EMAIL, SITE_URL } from "@/constants/site";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { RichText } from "./rich-text";

type IconProps = { className?: string; size?: number };
type ContactItem = {
  Icon: React.ComponentType<IconProps>;
  label: string;
  value: string;
  href: string;
};

const GithubIconAdapted = ({ className }: IconProps) => (
  <GithubIcon className={className} />
);
const LinkedInIconAdapted = ({ className }: IconProps) => (
  <LinkedInIcon className={className} />
);

function ContactListItem({ Icon, label, value, href }: ContactItem) {
  return (
    <li className="flex items-center justify-start gap-1.5">
      {/*
        텍스트 라벨을 두면 연락처 컬럼이 넓어져 옆의 소개 문단이 좁게 꺾인다.
        아이콘이 이미 종류를 말하므로 경력기술서 헤더처럼 아이콘+값만 둔다.
        라벨은 읽는 도구를 위해 링크 안에 sr-only로 남긴다.
      */}
      <Icon className="h-3 w-3 shrink-0 text-primary" />
      <Link
        href={href}
        className="min-w-0 text-gray-800 hover:text-primary hover:underline dark:text-gray-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="sr-only">{label} </span>
        {value}
      </Link>
    </li>
  );
}

export default function ResumeHeader({ className }: { className?: string }) {
  const t = useTranslations("resume");
  const paragraphs = t.raw("aboutMe.paragraphs") as string[];
  const contacts: ContactItem[] = [
    {
      Icon: Mail,
      label: t("contact.email"),
      // 이메일도 번역 대상이 아니라 상수를 따른다.
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      Icon: GithubIconAdapted,
      label: t("contact.github"),
      // 프로토콜은 표시 폭만 차지한다. 링크에는 남기고 표시에서만 뗀다.
      value: t("contact.githubValue").replace(/^https?:\/\//, ""),
      href: t("contact.githubValue"),
    },
    {
      Icon: LinkedInIconAdapted,
      label: t("contact.linkedin"),
      value: t("contact.linkedinValue"),
      href: t("contact.linkedinHref"),
    },
    {
      Icon: Globe,
      label: t("contact.blog"),
      // 블로그 주소는 도메인 자체가 값이라 번역 파일이 아니라 상수를 따른다.
      value: SITE_URL.replace(/^https?:\/\//, ""),
      href: SITE_URL,
    },
  ];

  return (
    <header className={cn("flex flex-col gap-4", className)}>
      {/*
        소개는 이름 아래, 연락처는 우측 상단 세로 스택.
        리드 문장(…개발자입니다.)이 소개 컬럼에서 한 줄에 들어가는 것이 기준이다.
        10px 리드가 398px이므로 컬럼이 400px 이상 나오도록 간격과 연락처 폰트를 잡았다.
        사진 크기, gap, 연락처 폰트를 바꿀 때는 이 줄이 꺾이는지부터 확인할 것.
      */}
      <div className="flex items-start gap-4">
        <div className="relative size-24 shrink-0">
          <Image
            src="/images/profile/image.jpg"
            alt="이승현 프로필"
            fill
            loading="eager"
            fetchPriority="high"
            className="overflow-hidden rounded-full object-cover object-top"
          />
        </div>

        <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="flex flex-wrap items-baseline gap-2 font-bold text-[22px] text-gray-900 dark:text-white">
              <span>{t("name")}</span>
              <span className="font-medium text-[11.5px] text-primary">
                {t("role")}
              </span>
            </h1>
            <div className="mt-2 space-y-1 text-[10px] text-gray-700 leading-[1.6] dark:text-gray-300">
              {paragraphs.map((p, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content
                <p key={i}>
                  <RichText>{p}</RichText>
                </p>
              ))}
            </div>
          </div>

          <ul className="flex shrink-0 flex-col gap-y-0.5 text-[10px]">
            {contacts.map((contact) => (
              <ContactListItem key={contact.label} {...contact} />
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
