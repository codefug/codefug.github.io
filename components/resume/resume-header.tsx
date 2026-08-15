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
    <li className="flex items-center justify-end gap-1.5">
      {/*
        라벨 칸을 고정 폭(w-24)으로 잡으면 짧은 라벨 뒤에 빈 공간이 남아
        블록 전체가 오른쪽 끝에 붙지 못한다. 내용 폭만 차지하게 둔다.
      */}
      <div className="flex shrink-0 items-center gap-1">
        <Icon className="h-3 w-3 shrink-0 text-primary" />
        <span className="font-semibold text-gray-500 dark:text-gray-400">
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
      <div className="flex items-start gap-6">
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

        {/* 이름 아래에 소개가 붙고, 연락처는 오른쪽에 둔다. */}
        <div className="flex min-w-0 flex-1 items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="flex flex-wrap items-baseline gap-2 font-bold text-2xl text-gray-900 dark:text-white">
              <span>{t("name")}</span>
              <span className="font-medium text-primary text-sm">
                {t("role")}
              </span>
            </h1>
            <div className="mt-2 space-y-2 text-[11.5px] text-gray-700 leading-relaxed dark:text-gray-300">
              {paragraphs.map((p, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content
                <p key={i} className="whitespace-pre-line">
                  <RichText>{p}</RichText>
                </p>
              ))}
            </div>
          </div>

          <ul className="flex shrink-0 flex-col gap-y-1 text-[11.5px]">
            {contacts.map((contact) => (
              <ContactListItem key={contact.label} {...contact} />
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
