import { describe, expect, it } from "vitest";
import { getReadingTime } from "@/util/reading-time";

describe("getReadingTime", () => {
  it("짧은 글도 최소 1분으로 센다", () => {
    expect(getReadingTime("짧다")).toBe(1);
  });

  it("같은 분량이면 코드블록 쪽이 더 짧게 나온다", () => {
    const prose = "가".repeat(3000);
    const code = `\`\`\`ts\n${"a".repeat(3000)}\n\`\`\``;
    expect(getReadingTime(code)).toBeLessThan(getReadingTime(prose));
  });

  it("이미지와 마크업 기호는 읽는 시간에 포함하지 않는다", () => {
    const plain = "가".repeat(1000);
    // 기호와 이미지 경로가 아무리 길어도 본문 분량과 같게 나와야 한다.
    const marked = `## ${"가".repeat(1000)}\n\n![설명](/images/2024-11-10/very-long-file-name.png)`;
    expect(getReadingTime(marked)).toBe(getReadingTime(plain));
  });

  it("링크는 표시 텍스트만 센다", () => {
    const withLink = `[문서](https://example.com/very/long/path/that/is/never/read)`;
    expect(getReadingTime(withLink)).toBe(1);
  });
});
