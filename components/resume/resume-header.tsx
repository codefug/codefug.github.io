"use client";

import { Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import GithubIcon from "@/assets/icons/GithubIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
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
      <div className="flex w-24 shrink-0 items-center gap-1.5 print:w-20">
        <Icon className="h-3.5 w-3.5 shrink-0 text-primary print:text-gray-600" />
        <span className="font-semibold text-gray-600 dark:text-gray-400 print:text-gray-500">
          {label}
        </span>
      </div>
      <Link
        href={href}
        className="min-w-0 text-gray-800 hover:text-primary hover:underline dark:text-gray-300 print:text-gray-700 print:no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {value}
      </Link>
    </li>
  );
}

export default function ResumeHeader() {
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
    <header className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 print:flex-row print:items-start print:justify-between print:gap-6">
      <div className="relative size-40 lg:size-30 print:size-30">
        <Image
          src="/images/profile/image.jpg"
          alt="이승현 프로필"
          fill
          loading="eager"
          fetchPriority="high"
          className="shrink-0 self-center overflow-hidden rounded-full object-cover object-top"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 lg:flex-row print:flex-row">
        <div className="flex">
          <div className="flex flex-col">
            <h1 className="flex flex-col flex-wrap items-baseline justify-center font-bold text-3xl text-gray-900 sm:flex-row sm:justify-start sm:gap-2 dark:text-white print:text-2xl">
              <span>{t("name")}</span>
              <span className="font-medium text-lg text-primary print:text-lg">
                {t("role")}
              </span>
            </h1>
            <div className="mt-3 space-y-3 text-gray-800 text-sm leading-relaxed dark:text-gray-200 print:mt-2 print:space-y-2 print:text-xs print:leading-snug">
              {paragraphs.map((p, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content
                <p key={i} className="whitespace-pre-line">
                  <RichText>{p}</RichText>
                </p>
              ))}
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-y-0.5 text-sm print:mt-0 print:text-xs">
          {contacts.map((contact) => (
            <ContactListItem key={contact.label} {...contact} />
          ))}
        </ul>
      </div>
    </header>
  );
}
