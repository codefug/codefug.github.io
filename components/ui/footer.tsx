"use client";

import Link from "next/link";
import Email from "@/assets/icons/EmailIcon";
import Github from "@/assets/icons/GithubIcon";

export default function Footer() {
  return (
    <footer className="mt-6 border-t bg-background print:hidden">
      <div className="mx-auto flex flex-col items-center gap-3 px-4 py-5">
        <div className="flex items-center gap-3">
          <Link
            href="mailto:robot9917@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Email width={18} height={18} fill="currentColor" />
          </Link>
          <Link
            href="https://github.com/codefug"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Github width={18} height={18} fill="currentColor" />
          </Link>
        </div>
        <p className="text-muted-foreground/60 text-xs">
          © {new Date().getFullYear()} CodeFug Blog
        </p>
      </div>
    </footer>
  );
}
