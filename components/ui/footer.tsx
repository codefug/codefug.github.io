"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Email from "../../public/icons/email.svg";
import Github from "../../public/icons/github.svg";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="mt-6 border-t bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-4">
            {/* 소셜 링크 */}
            <div className="flex space-x-4">
              <Link
                href="mailto:robot9917@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Email
                  width={32}
                  height={32}
                  fill={theme === "dark" ? "#fff" : "#000"}
                  className="transition-transform hover:scale-110"
                />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/codefug"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github
                  width={32}
                  height={32}
                  fill={theme === "dark" ? "#fff" : "#000"}
                  className="transition-transform hover:scale-110"
                />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* 저작권 정보 */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CodeFug Blog
          </p>
        </div>
      </div>
    </footer>
  );
}
