import { SITE_URL as BASE_URL } from "@/constants/site";
import { getFrontMatterList } from "@/lib/posts";

export const dynamic = "force-static";

export async function GET() {
  const posts = getFrontMatterList();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/posts/${post.id}/</link>
      <guid>${BASE_URL}/posts/${post.id}/</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CodeFug Blog</title>
    <link>${BASE_URL}</link>
    <description>개발자 코드퍼그의 기술 블로그</description>
    <language>ko</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
