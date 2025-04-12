import { ParsedFrontMatter } from "@/constants/mdx";
import Image from "next/image";

export default function PostHeader({
  title,
  categories,
  excerpt,
  header,
  date,
}: ParsedFrontMatter) {
  return (
    <header>
      <h1>{`제목: ${title}`}</h1>
      <p>{`설명: ${excerpt}`}</p>
      <p>{`카테고리: ${categories}`}</p>
      <p>{`날짜: ${date}`}</p>
      <Image src={header.teaser} alt={title} width={300} height={300} />
    </header>
  );
}
