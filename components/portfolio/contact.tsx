"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/constants/about";
import { HeadComponent } from "./HeadComponent";

function ContactItem({
  title,
  url,
  description,
}: {
  title: string;
  url: string;
  description: string;
}) {
  return (
    <div className="mt-0 mb-0">
      <span className="text-gray-700 dark:text-gray-300">{title}:</span>
      <Link
        href={url}
        className="ml-2 text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {description}
      </Link>
    </div>
  );
}

export default function Contact() {
  const t = useTranslations("portfolio.contact");

  return (
    <div className="prose dark:prose-invert mx-auto mt-4">
      <HeadComponent>{t("title")}</HeadComponent>
      {CONTACTS.map((contact) => (
        <ContactItem
          key={contact.title}
          title={contact.title}
          url={contact.url}
          description={contact.description}
        />
      ))}
    </div>
  );
}
