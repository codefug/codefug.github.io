import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>잘못된 페이지에요!</p>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
}
