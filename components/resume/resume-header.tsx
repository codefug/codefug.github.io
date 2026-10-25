import { Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import GithubIcon from "@/assets/icons/GithubIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import {
  CONTACT_EMAIL,
  displayUrl,
  GITHUB_URL,
  SITE_URL,
} from "@/constants/site";
import { RESUME } from "@/content/resume";
import { cn } from "@/lib/utils";
import { RichText } from "./rich-text";

type ContactItem = {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
};

function ContactListItem({ Icon, label, value, href }: ContactItem) {
  return (
    <li className="flex items-center justify-start gap-1.5">
      {/* 라벨을 보이게 두면 연락처 컬럼이 넓어져 소개 문단이 꺾이므로 sr-only로만 둔다. */}
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
  const { contact, aboutMe } = RESUME;
  const paragraphs = aboutMe.paragraphs;
  const contacts: ContactItem[] = [
    {
      Icon: Mail,
      label: contact.email,
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      Icon: GithubIcon,
      label: contact.github,
      value: displayUrl(GITHUB_URL),
      href: GITHUB_URL,
    },
    {
      Icon: LinkedInIcon,
      label: contact.linkedin,
      value: contact.linkedinValue,
      href: contact.linkedinHref,
    },
    {
      Icon: Globe,
      label: contact.blog,
      value: displayUrl(SITE_URL),
      href: SITE_URL,
    },
  ];

  return (
    <header className={cn("flex flex-col gap-4", className)}>
      {/*
        리드 문장(10px, 398px)이 소개 컬럼 한 줄에 들어가야 한다.
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
              <span>{RESUME.name}</span>
              <span className="font-medium text-[11.5px] text-primary">
                {RESUME.role}
              </span>
            </h1>
            <div className="mt-2.5 space-y-1 text-[10px] text-gray-700 leading-[1.6] dark:text-gray-300">
              {paragraphs.map((p, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content
                <p key={i} className="whitespace-pre-line">
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
