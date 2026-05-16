"use client";

import { Globe, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import GithubIcon from "@/assets/icons/GithubIcon";

type IconProps = { className?: string; size?: number };
type ContactItem = {
  Icon: React.ComponentType<IconProps>;
  label: string;
  value: string;
  href?: string;
};

const GithubIconAdapted = ({ className }: IconProps) => (
  <GithubIcon className={className} />
);

export default function ResumeHeader() {
  const t = useTranslations("resume");
  const contacts: ContactItem[] = [
    { Icon: Mail, label: t("contact.email"), value: t("contact.emailValue") },
    { Icon: Phone, label: t("contact.phone"), value: t("contact.phoneValue") },
    {
      Icon: GithubIconAdapted,
      label: t("contact.github"),
      value: t("contact.githubValue"),
      href: t("contact.githubValue"),
    },
    {
      Icon: Globe,
      label: t("contact.blog"),
      value: t("contact.blogValue"),
      href: t("contact.blogValue"),
    },
  ];

  return (
    <header className="flex items-start justify-between gap-6 pb-6">
      <div>
        <h1 className="flex flex-wrap items-baseline gap-3 font-bold text-4xl text-gray-900 dark:text-white">
          <span>{t("name")}</span>
          <span className="font-medium text-primary text-xl">{t("role")}</span>
        </h1>
        <ul className="mt-4 grid grid-cols-1 gap-1 text-sm">
          {contacts.map(({ Icon, label, value, href }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon size={16} className="h-4 w-4 shrink-0 text-primary" />
              <span className="w-14 shrink-0 font-semibold">{label}</span>
              {href ? (
                <Link
                  href={href}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {value}
                </Link>
              ) : (
                <span>{value}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded">
        <Image
          src="/images/profile/image.png"
          alt="이승현 프로필"
          fill
          className="object-cover"
        />
      </div>
    </header>
  );
}
