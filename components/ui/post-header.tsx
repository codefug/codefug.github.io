import { ParsedFrontMatter } from "@/constants/mdx";
import Image from "next/image";
import { CalendarDays, Tag } from "lucide-react";
import { Badge } from "./badge";

export default function PostHeader({
  title,
  categories,
  excerpt,
  header,
  date,
}: ParsedFrontMatter) {
  return (
    <header className="mb-8">
      {/* 히어로 이미지 */}
      <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-xl sm:h-[400px] md:h-[450px]">
        <Image
          src={header.teaser}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

        {/* 카테고리 태그 - 이미지 위에 배치 */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
          {Array.isArray(categories) ? (
            categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-white/90 text-xs font-medium text-gray-800 hover:bg-white sm:text-sm"
              >
                <Tag className="mr-1 h-3 w-3" /> {category}
              </Badge>
            ))
          ) : (
            <Badge
              variant="secondary"
              className="bg-white/90 text-xs font-medium text-gray-800 hover:bg-white sm:text-sm"
            >
              <Tag className="mr-1 h-3 w-3" /> {categories}
            </Badge>
          )}
        </div>
      </div>

      {/* 포스트 메타데이터 */}
      <div className="mb-6 space-y-4">
        <h1 className="mb-0 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl">
          {title}
        </h1>

        <div className="flex items-center justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <time dateTime={date}>{date}</time>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
          {excerpt}
        </p>
      </div>

      {/* 구분선 */}
      <div className="border-b border-gray-200 dark:border-gray-800" />
    </header>
  );
}

// 날짜 형식 변환 함수가 없는 경우 아래 함수를 utils.ts 등에 추가해주세요
// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('ko-KR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   }).format(date);
// }
