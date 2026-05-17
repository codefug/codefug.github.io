import { Globe, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
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

function ContactListItem({ Icon, label, value, href }: ContactItem) {
  return (
    <li className="flex items-center gap-1.5">
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
  );
}

export default async function ResumeHeader() {
  const t = await getTranslations("resume");
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
    <header className="mb-1 flex items-start justify-between gap-6 pb-5 print:mb-0 print:pb-2">
      <img
        src="/images/profile/image.jpg"
        alt="이승현 프로필"
        loading="eager"
        fetchPriority="high"
        className="size-32 shrink-0 overflow-hidden rounded object-cover object-top"
      />
      <div className="min-w-0 flex-1">
        <h1 className="flex flex-wrap items-baseline gap-2 font-bold text-3xl text-gray-900 dark:text-white print:text-2xl">
          <span>{t("name")}</span>
          <span className="font-medium text-lg text-primary print:text-base">
            {t("role")}
          </span>
        </h1>
        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-0.5 text-sm sm:grid-cols-2 print:mt-2 print:grid-cols-2 print:text-xs">
          {contacts.map((contact) => (
            <ContactListItem key={contact.label} {...contact} />
          ))}
        </ul>
      </div>
    </header>
  );
}
