import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import type { FrontMatter } from "@/types/post";

type Props = {
  adjacent: { previous: FrontMatter | null; next: FrontMatter | null };
};

export function AdjacentPosts({ adjacent }: Props) {
  const { previous, next } = adjacent;

  if (!previous && !next) return null;

  return (
    <nav
      aria-label={"이전 글과 다음 글"}
      className="not-prose mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {previous ? (
        <AdjacentLink post={previous} direction="previous" label={"이전 글"} />
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
      {next && <AdjacentLink post={next} direction="next" label={"다음 글"} />}
    </nav>
  );
}

function AdjacentLink({
  post,
  direction,
  label,
}: {
  post: FrontMatter;
  direction: "previous" | "next";
  label: string;
}) {
  const isNext = direction === "next";
  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={`${PATH.POSTS}/${post.id}`}
      rel={isNext ? "next" : "prev"}
      className={cn(
        "group flex flex-col gap-1 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5",
        isNext && "sm:items-end sm:text-right",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-muted-foreground text-xs",
          isNext && "sm:flex-row-reverse",
        )}
      >
        <Icon
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isNext
              ? "group-hover:translate-x-0.5"
              : "group-hover:-translate-x-0.5",
          )}
          aria-hidden="true"
        />
        {label}
      </span>
      <span className="line-clamp-2 font-semibold text-sm transition-colors group-hover:text-primary">
        {post.title}
      </span>
    </Link>
  );
}
