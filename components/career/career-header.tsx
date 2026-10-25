import { Globe, Mail } from "lucide-react";
import Link from "next/link";
import GithubIcon from "@/assets/icons/GithubIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import { RichText } from "@/components/resume/rich-text";
import {
  CONTACT_EMAIL,
  displayUrl,
  GITHUB_URL,
  SITE_URL,
} from "@/constants/site";
import { CAREER } from "@/content/career";

// 이력서 헤더와 같은 연락처 구성을 유지한다. 두 문서를 함께 내는 경우가 많다.
const contacts = [
  {
    key: "email",
    Icon: Mail,
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    key: "github",
    Icon: GithubIcon,
    value: displayUrl(GITHUB_URL),
    href: GITHUB_URL,
  },
  {
    key: "linkedin",
    Icon: LinkedInIcon,
    value: "in/lee-seung-hyun",
    href: "https://www.linkedin.com/in/lee-seung-hyun-568565269/",
  },
  {
    key: "blog",
    Icon: Globe,
    value: displayUrl(SITE_URL),
    href: SITE_URL,
  },
];

// 이력서 헤더와 달리 사진을 두지 않는다. 첫 장의 공간을 요약과 역량에 쓴다.
export default function CareerHeader({ className }: { className?: string }) {
  return (
    <header className={className}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <p className="font-semibold text-[10px] text-primary tracking-wide">
            {CAREER.docTitle}
          </p>
          <h1 className="mt-0.5 flex flex-wrap items-baseline gap-2 font-bold text-[22px] text-gray-900">
            <span>{CAREER.name}</span>
            <span className="font-medium text-[11px] text-gray-500">
              {CAREER.role}
            </span>
          </h1>
        </div>

        <ul className="flex shrink-0 flex-col gap-y-0.5 text-[10px]">
          {contacts.map(({ key, Icon, value, href }) => (
            <li key={key} className="flex items-center gap-1.5">
              <Icon className="size-3 shrink-0 text-primary" />
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary hover:underline"
              >
                {value}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 border-gray-200 border-t pt-2.5 text-[11px] text-gray-700 leading-[1.7]">
        <RichText>{CAREER.summary}</RichText>
      </p>
    </header>
  );
}
