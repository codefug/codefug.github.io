import { FrontMatter } from "@/constants/mdx";

export default function PostHeader({
  title,
  categories,
  excerpt,
  header,
  last_modified_at,
}: FrontMatter) {
  return (
    <header>
      <h1>{title}</h1>
      <p>{excerpt}</p>
      <p>{categories}</p>
      <p>{last_modified_at.toISOString()}</p>
      <img src={header.teaser} alt={title} />
    </header>
  );
}
