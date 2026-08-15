"use client";

import { Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import GithubIcon from "@/assets/icons/GithubIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
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
    <li className="flex items-center gap-2">
      <div className="flex w-24 shrink-0 items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span className="font-semibold text-gray-600 dark:text-gray-400">
          {label}
        </span>
      </div>
      <Link
        href={href}
        className="min-w-0 text-gray-800 hover:text-primary hover:underline dark:text-gray-300 print:no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
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
      value: t("contact.emailValue"),
      href: `mailto:${t("contact.emailValue")}`,
    },
    {
      Icon: GithubIconAdapted,
      label: t("contact.github"),
      value: t("contact.githubValue"),
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
      value: t("contact.blogValue"),
      href: t("contact.blogValue"),
    },
  ];

  return (
    <header className={cn("flex flex-col gap-4", className)}>
      {/* 위: 사진 · 이름 · 연락처 */}
      <div className="flex flex-row flex-col items-start items-center gap-4 gap-6">
        <div className="relative size-30 size-40 shrink-0">
          <Image
            src="/images/profile/image.jpg"
            alt="이승현 프로필"
            fill
            loading="eager"
            fetchPriority="high"
            className="overflow-hidden rounded-full object-cover object-top"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-row flex-col items-start justify-between gap-3">
          <h1 className="flex flex-row flex-col flex-wrap items-baseline justify-start justify-center gap-2 font-bold text-3xl text-gray-900 dark:text-white">
            <span>{t("name")}</span>
            <span className="font-medium text-lg text-primary">
              {t("role")}
            </span>
          </h1>
          <ul className="flex shrink-0 flex-col gap-y-0.5 text-sm">
            {contacts.map((contact) => (
              <ContactListItem key={contact.label} {...contact} />
            ))}
          </ul>
        </div>
      </div>

      {/*
        아래: 소개.
        연락처 옆에 두면 데스크탑에서 폭이 좁아져 세로로 길어지므로,
        연락처 아래 전체 폭을 쓰게 한다.
      */}
      <div className="space-y-3 text-gray-800 text-sm leading-relaxed dark:text-gray-200">
        {paragraphs.map((p, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static content
          <p key={i} className="whitespace-pre-line">
            <RichText>{p}</RichText>
          </p>
        ))}
      </div>
    </header>
  );
}
