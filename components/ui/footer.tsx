"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
                <Image
                  src="/icons/email.svg"
                  alt="이메일 연락하기"
                  width={24}
                  height={24}
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
                <Image
                  src="/icons/github.svg"
                  alt="GitHub 프로필 방문하기"
                  width={24}
                  height={24}
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
