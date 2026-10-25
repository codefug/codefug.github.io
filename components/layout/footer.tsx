import { Rss } from "lucide-react";
import Email from "@/assets/icons/EmailIcon";
import Github from "@/assets/icons/GithubIcon";
import { AUTHOR_NAME_EN, CONTACT_EMAIL, GITHUB_URL } from "@/constants/site";

const FOOTER_LINKS = [
  {
    href: `mailto:${CONTACT_EMAIL}`,
    label: "Email",
    icon: <Email width={18} height={18} fill="currentColor" />,
  },
  {
    href: GITHUB_URL,
    label: "GitHub",
    icon: <Github width={18} height={18} fill="currentColor" />,
  },
  {
    href: "/rss.xml",
    label: "RSS 피드",
    icon: <Rss width={18} height={18} />,
  },
];

export default function Footer() {
  return (
    <footer className="mt-6 border-t bg-background print:hidden">
      <div className="mx-auto flex flex-col items-center gap-3 px-4 py-5">
        <div className="flex items-center gap-3">
          {FOOTER_LINKS.map(({ href, label, icon }) => (
            // 모두 새 탭으로 여는 링크라 next/link가 필요 없다. /rss.xml은 Link로 두면 RSC prefetch가 404를 낸다.
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {icon}
            </a>
          ))}
        </div>
        <p className="text-muted-foreground/60 text-xs">
          © {new Date().getFullYear()} {AUTHOR_NAME_EN}
        </p>
      </div>
    </footer>
  );
}
