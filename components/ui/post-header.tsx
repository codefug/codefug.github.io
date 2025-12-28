import { CalendarDays, Tag } from "lucide-react";
import Image from "next/image";
import type { ParsedFrontMatter } from "@/constants/mdx";
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
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 sm:top-6 sm:left-6">
          {Array.isArray(categories) ? (
            categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-white/90 font-medium text-gray-800 text-xs hover:bg-white sm:text-sm"
              >
                <Tag className="mr-1 h-3 w-3" /> {category}
              </Badge>
            ))
          ) : (
            <Badge
              variant="secondary"
              className="bg-white/90 font-medium text-gray-800 text-xs hover:bg-white sm:text-sm"
            >
              <Tag className="mr-1 h-3 w-3" /> {categories}
            </Badge>
          )}
        </div>
      </div>

      {/* 포스트 메타데이터 */}
      <div className="mb-6 space-y-4">
        <h1 className="mb-0 font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl md:text-5xl dark:text-gray-50">
          {title}
        </h1>

        <div className="flex items-center justify-end gap-4 text-gray-600 text-sm dark:text-gray-400">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <time dateTime={date}>{date}</time>
          </div>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed md:text-xl dark:text-gray-300">
          {excerpt}
        </p>
      </div>

      {/* 구분선 */}
      <div className="border-gray-200 border-b dark:border-gray-800" />
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
