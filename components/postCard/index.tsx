import { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export default function PostCard({
  categories,
  date,
  excerpt,
  header,
  title,
  id,
}: FrontMatter) {
  const linkHref = useMemo(() => `${PATH.POSTS}/${id}`, [id]);

  return (
    // SSG로 렌더링된 포스트 링크는 CSR로 이동시킬 수 없다. ( HTML을 받아야 한다. )
    <a href={linkHref} aria-label={`${title} 포스트 읽기`} rel="bookmark">
      <Card className="group cursor-pointer overflow-hidden bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-xl dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="relative h-52 w-full overflow-hidden rounded-t-md">
          <Image
            priority={false}
            src={header.teaser}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            className={cn(
              "h-52 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105",
            )}
          />
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              {categories.map((category) => (
                <Badge key={category + id} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <h2 className="mb-2 line-clamp-1 text-lg font-bold">{title}</h2>
          <p className="line-clamp-3 min-h-[60px] text-sm text-gray-600 dark:text-gray-400">
            {excerpt}
          </p>
        </div>
        <div className="flex justify-end px-5 pb-5">
          <time className="text-sm text-gray-500">{date}</time>
        </div>
      </Card>
    </a>
  );
}
