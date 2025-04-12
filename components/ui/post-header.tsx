import { FrontMatter } from "@/constants/mdx";

export default function PostHeader({
  title,
  categories,
  excerpt,
  header,
  date,
}: FrontMatter) {
  return (
    <header>
      <h1>{title}</h1>
      <p>{excerpt}</p>
      <p>{categories}</p>
      <p>{date.toLocaleDateString()}</p>
      <img src={header.teaser} alt={title} />
    </header>
  );
}
