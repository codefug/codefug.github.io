import { ArrowUpRight } from "lucide-react";
import { AUTHOR_NAME_EN, GITHUB_URL } from "@/constants/site";
import { RESUME } from "@/content/resume";

export function HeroSection() {
  return (
    <section className="pt-14 pb-16 md:pt-20 md:pb-20">
      <h1 className="font-bold text-4xl tracking-tight md:text-5xl">
        {AUTHOR_NAME_EN}
      </h1>
      <p className="mt-2 text-muted-foreground">{RESUME.role}</p>
      <p className="mt-6 max-w-xl break-keep text-foreground/80 text-lg leading-relaxed">
        문제가 생기면 원인을 끝까지 따라가고, 알게 된 것은 글로 남겨 함께 일하는
        사람들과 나눕니다. 여기에는 그렇게 남긴 기술 기록과 개발 밖에서 생각하고
        겪은 것을 함께 적습니다.
      </p>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex items-center gap-0.5 font-medium text-muted-foreground text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        GitHub
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
