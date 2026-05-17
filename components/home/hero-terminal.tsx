"use client";

import { motion } from "motion/react";

interface HeroTerminalProps {
  postCount: number;
}

type CodeToken = { text: string; color: string };
type CodeLine = { indent?: boolean; tokens: CodeToken[] };

function buildCodeLines(postCount: number): CodeLine[] {
  return [
    {
      tokens: [
        { text: "const", color: "text-violet-500 dark:text-violet-400" },
        { text: " blog", color: "text-foreground" },
        { text: " =", color: "text-blue-500 dark:text-blue-400" },
        { text: " {", color: "text-foreground" },
      ],
    },
    {
      indent: true,
      tokens: [
        { text: "author", color: "text-sky-500 dark:text-sky-400" },
        { text: ": ", color: "text-foreground" },
        { text: '"codefug"', color: "text-emerald-600 dark:text-emerald-400" },
        { text: ",", color: "text-foreground" },
      ],
    },
    {
      indent: true,
      tokens: [
        { text: "values", color: "text-sky-500 dark:text-sky-400" },
        { text: ": [", color: "text-foreground" },
        {
          text: '"team-first"',
          color: "text-emerald-600 dark:text-emerald-400",
        },
        { text: ", ", color: "text-foreground" },
        {
          text: '"detail-oriented"',
          color: "text-emerald-600 dark:text-emerald-400",
        },
        { text: "],", color: "text-foreground" },
      ],
    },
    {
      indent: true,
      tokens: [
        { text: "approach", color: "text-sky-500 dark:text-sky-400" },
        { text: ": ", color: "text-foreground" },
        {
          text: '"root-cause first"',
          color: "text-emerald-600 dark:text-emerald-400",
        },
        { text: ",", color: "text-foreground" },
      ],
    },
    {
      indent: true,
      tokens: [
        { text: "style", color: "text-sky-500 dark:text-sky-400" },
        { text: ": ", color: "text-foreground" },
        {
          text: '"clear communicator"',
          color: "text-emerald-600 dark:text-emerald-400",
        },
        { text: ",", color: "text-foreground" },
      ],
    },
    {
      indent: true,
      tokens: [
        { text: "location", color: "text-sky-500 dark:text-sky-400" },
        { text: ": ", color: "text-foreground" },
        { text: '"Seoul"', color: "text-emerald-600 dark:text-emerald-400" },
        { text: ",", color: "text-foreground" },
      ],
    },
    {
      indent: true,
      tokens: [
        { text: "posts", color: "text-sky-500 dark:text-sky-400" },
        { text: ": ", color: "text-foreground" },
        {
          text: String(postCount),
          color: "text-orange-500 dark:text-orange-400",
        },
        { text: ",", color: "text-foreground" },
      ],
    },
    {
      tokens: [
        { text: "}", color: "text-foreground" },
        { text: " // 🚀", color: "text-muted-foreground/50 text-xs" },
      ],
    },
  ];
}

export function HeroTerminal({ postCount }: HeroTerminalProps) {
  const codeLines = buildCodeLines(postCount);

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.15,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="w-full overflow-hidden rounded-2xl border border-border/50 bg-background/90 backdrop-blur-xl lg:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] lg:dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.35)]"
    >
      <TerminalTitleBar />
      <TerminalCodeView codeLines={codeLines} />
      <TerminalStatusBar postCount={postCount} />
    </motion.div>
  );
}

function TerminalTitleBar() {
  return (
    <div className="flex items-center gap-2 border-border/40 border-b bg-muted/30 px-5 py-3.5">
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <div className="h-3 w-3 rounded-full bg-[#28C840]" />
      </div>
      <span className="ml-2 font-mono text-muted-foreground/70 text-xs tracking-wide">
        codefug — blog.ts
      </span>
    </div>
  );
}

function TerminalCodeView({ codeLines }: { codeLines: CodeLine[] }) {
  const totalLineCount = codeLines.length + 4;

  return (
    <div className="flex font-mono text-sm">
      <TerminalLineNumbers count={totalLineCount} />
      <TerminalCodeArea codeLines={codeLines} />
    </div>
  );
}

function TerminalLineNumbers({ count }: { count: number }) {
  return (
    <div className="select-none border-border/30 border-r bg-muted/20 px-3 py-5 text-right text-muted-foreground/40 text-xs leading-7">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}

function TerminalCodeArea({ codeLines }: { codeLines: CodeLine[] }) {
  return (
    <div className="flex-1 px-5 py-5 leading-7">
      <TerminalComment />
      {codeLines.map((line, i) => (
        <TerminalCodeLine key={i} line={line} animationDelay={0.45 + i * 0.1} />
      ))}
      <div className="h-4" />
      <div className="h-4" />
      <TerminalPrompt />
    </div>
  );
}

function TerminalComment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="text-muted-foreground/50 text-xs"
    >
      {"// codefug.github.io"}
    </motion.div>
  );
}

function TerminalCodeLine({
  line,
  animationDelay,
}: {
  line: CodeLine;
  animationDelay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: animationDelay, duration: 0.4 }}
      className={line.indent ? "pl-6" : ""}
    >
      {line.tokens.map((token, i) => (
        <span key={i} className={token.color}>
          {token.text}
        </span>
      ))}
    </motion.div>
  );
}

function TerminalPrompt() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.4 }}
      className="flex items-center gap-1.5"
    >
      <span className="text-emerald-500 dark:text-emerald-400">❯</span>
      <BlinkingCursor />
    </motion.div>
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      className="inline-block h-[1em] w-[2px] translate-y-[2px] bg-foreground/70"
      animate={{ opacity: [1, 0] }}
      transition={{
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "linear",
      }}
    />
  );
}

function TerminalStatusBar({ postCount }: { postCount: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.4 }}
      className="flex items-center justify-between border-border/30 border-t bg-violet-500/5 px-5 py-2.5"
    >
      <div className="flex items-center gap-3 text-muted-foreground/60 text-xs">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          collaborative
        </span>
        <span>curious</span>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground/60 text-xs">
        <span>{postCount} posts</span>
        <span>Seoul, KR</span>
      </div>
    </motion.div>
  );
}
