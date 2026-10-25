import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { absoluteUrl } from "@/constants/site";
import { RESUME } from "@/content/resume";
import { ResumeSectionHeading } from "./resume-section-heading";

export default function KnowledgeSharing() {
  const { title, posts } = RESUME.knowledgeSharing;

  return (
    <section>
      <ResumeSectionHeading>{title}</ResumeSectionHeading>
      <ul className="mt-1 space-y-0.5 text-[11.5px]">
        {posts.map((p) => (
          <li key={p.title}>
            <Link
              href={absoluteUrl(p.url)}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <span className="whitespace-nowrap">{p.title}</span>
              <ExternalLink size={12} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
