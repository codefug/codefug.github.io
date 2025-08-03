import { PATH } from "@/constants/path";
import Link from "next/link";

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
        className="ml-2 text-blue-500 hover:underline"
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Contact
      </h2>
      <ContactItem
        title="인스타"
        url="https://www.instagram.com/happy_fug/"
        description="codefug의 일상 구경하기"
      />
      <ContactItem
        title="GitHub"
        url="https://github.com/codefug"
        description="codefug의 세련된 깃허브 구경하기"
      />
      <ContactItem
        title="블로그"
        url={PATH.HOME}
        description="codefug가 연구중인 자료 탐구하기"
      />
    </div>
  );
}
