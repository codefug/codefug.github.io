"use client";

import { motion } from "motion/react";

interface HeroIdentityProps {
  postCount: number;
  sinceYear: number;
}

const TRAIT_TAGS = [
  "root-cause first",
  "find → fix → share",
  "team-first",
  "builds what's missing",
  "data-driven",
];

const BLOG_STATS = (postCount: number, sinceYear: number) => [
  { value: postCount, label: "posts" },
  { value: sinceYear, label: "since" },
  { value: "Seoul", label: "location" },
];

export function HeroIdentity({ postCount, sinceYear }: HeroIdentityProps) {
  return (
    <div className="flex flex-col">
      <DevBlogLabel />
      <BlogTitle />
      <EtymologyNote />
      <BlogStats postCount={postCount} sinceYear={sinceYear} />
      <TraitTagList />
    </div>
  );
}

function DevBlogLabel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 flex items-center gap-2"
    >
      <span className="h-px w-8 bg-indigo-400/60" />
      <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
        dev blog
      </span>
    </motion.div>
  );
}

function BlogTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="mb-5 font-black text-5xl tracking-tight lg:text-6xl xl:text-7xl"
    >
      code
      <span className="bg-linear-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
        fug
      </span>
    </motion.h1>
  );
}

function EtymologyNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="mb-8 max-w-md border-indigo-400/40 border-l-2 pl-4 font-mono text-sm"
    >
      <p className="text-muted-foreground">
        <span className="font-semibold text-foreground">fug</span>{" "}
        <span className="text-muted-foreground/70">/fʌɡ/</span>{" "}
        <span className="text-muted-foreground/70 italic">n.</span> 사람이 오래
        머문 방의 후텁지근한 공기
      </p>
      <p className="mt-1.5 text-muted-foreground">
        <span className="bg-linear-to-r from-indigo-500 to-blue-500 bg-clip-text font-semibold text-transparent">
          code·fug
        </span>{" "}
        <span className="text-muted-foreground/70 italic">n.</span> 코드에
        파묻혀 나오지 않는 방
      </p>
    </motion.div>
  );
}

function BlogStats({
  postCount,
  sinceYear,
}: {
  postCount: number;
  sinceYear: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.38, duration: 0.5 }}
      className="mb-8 flex items-center gap-6"
    >
      {BLOG_STATS(postCount, sinceYear).map(({ value, label }) => (
        <div key={label} className="flex flex-col">
          <span className="font-bold text-foreground text-xl">{value}</span>
          <span className="text-muted-foreground text-xs">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}

function TraitTagList() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="flex flex-wrap gap-2"
    >
      {TRAIT_TAGS.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.35 }}
          className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 font-mono text-muted-foreground text-xs"
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
}
