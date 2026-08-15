"use client";

import { Code, Globe, Mail, PenLine } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PATH } from "@/constants/path";

const CONTACTS = [
  {
    key: "email",
    icon: Mail,
    href: "mailto:leeseounghyun9917@gmail.com",
    label: "leeseounghyun9917@gmail.com",
  },
  {
    key: "github",
    icon: Code,
    href: "https://github.com/codefug",
    label: "github.com/codefug",
  },
  {
    key: "linkedin",
    icon: Globe,
    href: "https://www.linkedin.com/in/lee-seung-hyun-568565269/",
    label: "linkedin.com/in/lee-seung-hyun",
  },
  {
    key: "blog",
    icon: PenLine,
    href: PATH.HOME,
    label: "codefug.github.io",
  },
] as const;

/**
 * 이름·직무·연락처를 먼저 보여주는 일반적인 포트폴리오 헤더.
 * 슬로건보다 "누구이고 어떻게 연락하는가"가 먼저 와야 한다.
 */
export function PortfolioHero() {
  const t = useTranslations("portfolio.hero");
  const tNow = useTranslations("portfolio.now");

  return (
    <section className="mb-16 border-border border-b pb-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <Avatar className="h-24 w-24 shrink-0 ring-2 ring-border ring-offset-2 ring-offset-background sm:h-28 sm:w-28">
          <AvatarImage asChild src="/images/me.jpg">
            <Image
              src="/images/me.jpg"
              alt={t("name")}
              width={112}
              height={112}
              className="object-cover"
            />
          </AvatarImage>
          <AvatarFallback className="bg-primary/10 font-bold text-primary text-xl">
            {t("name").slice(0, 1)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-bold text-3xl tracking-tight md:text-4xl">
              {t("name")}
            </h1>
            <p className="font-mono text-muted-foreground text-sm md:text-base">
              {t("role")}
            </p>
          </div>

          <p className="mb-4 text-muted-foreground text-sm">
            {tNow("company")} · {tNow("team")} · {tNow("period")}
          </p>

          <p className="mb-5 max-w-2xl leading-relaxed">{t("summary")}</p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {CONTACTS.map(({ key, icon: Icon, href, label }) => (
              <li key={key}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
