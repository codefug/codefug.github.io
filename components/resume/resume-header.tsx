"use client";

import { Globe, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import GithubIcon from "@/assets/icons/GithubIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";

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

export default function ResumeHeader() {
  const t = useTranslations("resume");
  const contacts: ContactItem[] = [
    {
      Icon: Mail,
      label: t("contact.email"),
      value: t("contact.emailValue"),
      href: `mailto:${t("contact.emailValue")}`,
    },
    {
      Icon: Phone,
      label: t("contact.phone"),
      value: t("contact.phoneValue"),
      href: `tel:${t("contact.phoneValue").replace(/-/g, "")}`,
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
    <header className="mb-1 flex items-start justify-between gap-6 pb-5 print:mb-0 print:pb-4">
      <div className="min-w-0 flex-1">
        <h1 className="flex flex-wrap items-baseline gap-2 font-bold text-3xl text-gray-900 dark:text-white print:text-2xl">
          <span>{t("name")}</span>
          <span className="font-medium text-lg text-primary print:text-base">
            {t("role")}
          </span>
        </h1>
        {/* 2열 그리드로 연락처 compact 배치 */}
        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-0.5 text-sm sm:grid-cols-2 print:mt-2 print:grid-cols-2 print:text-xs">
          {contacts.map(({ Icon, label, value, href }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="shrink-0 font-semibold text-gray-600 dark:text-gray-400 print:text-gray-500">
                {label}
              </span>
              <Link
                href={href}
                className="min-w-0 truncate text-gray-800 hover:text-primary hover:underline dark:text-gray-300 print:text-gray-700 print:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {value}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 프로필 사진 */}
      <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded print:h-28 print:w-20">
        <Image
          src="/images/profile/image.png"
          alt="이승현 프로필"
          fill
          sizes="96px"
          quality={95}
          priority
          className="object-cover object-top"
        />
      </div>
    </header>
  );
}
