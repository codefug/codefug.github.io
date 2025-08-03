import { CONTACTS } from "@/constants/about";
import Link from "next/link";
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
    <div className="mb-0 mt-0">
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
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <HeadComponent>Contact</HeadComponent>
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
