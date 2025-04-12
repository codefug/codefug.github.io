import Link from "next/link";
import { POST_PATH } from "@/constants/path";
import { useMemo } from "react";
import Image from "next/image";
import { FrontMatter } from "@/constants/mdx";
import { Card } from "../ui/card";

export type PostInfo = { id: string } & FrontMatter;

export default function PostCard({
  categories,
  date,
  excerpt,
  header,
  title,
  id,
}: PostInfo) {
  const linkHref = useMemo(() => POST_PATH + id, [id]);
  return (
    <Link href={linkHref}>
      <Card className="cursor-pointer overflow-hidden bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="relative h-48 overflow-hidden">
          <Image
            priority
            src={header.teaser}
            alt={title}
            fill
            className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-300 text-blue-700 dark:bg-blue-900/30">
              {categories.map((category) => category)}
            </span>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold">{title}</h3>
          <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
            {excerpt}
          </p>
        </div>
      </Card>
    </Link>
  );
}
