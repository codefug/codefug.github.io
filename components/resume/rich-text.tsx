import { Fragment } from "react";

type Token =
  | { type: "text"; content: string; start: number }
  | { type: "bold"; content: string; start: number }
  | { type: "link"; url: string; content: string; start: number };

const COMBINED_RE = /\[B\](.+?)\[\/B\]|\[L:([^\]]+)\](.+?)\[\/L\]/g;

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(COMBINED_RE)) {
    const matchStart = match.index ?? 0;
    if (matchStart > lastIndex)
      tokens.push({
        type: "text",
        content: text.slice(lastIndex, matchStart),
        start: lastIndex,
      });
    if (match[1] !== undefined) {
      tokens.push({ type: "bold", content: match[1], start: matchStart });
    } else {
      tokens.push({
        type: "link",
        url: match[2],
        content: match[3],
        start: matchStart,
      });
    }
    lastIndex = matchStart + match[0].length;
  }
  if (lastIndex < text.length)
    tokens.push({
      type: "text",
      content: text.slice(lastIndex),
      start: lastIndex,
    });
  return tokens;
}

function RichTokens({ line }: { line: string }) {
  return (
    <>
      {tokenize(line).map((token) => {
        if (token.type === "bold")
          return (
            <strong
              key={token.start}
              className="font-bold text-gray-900 dark:text-white"
            >
              {token.content}
            </strong>
          );
        if (token.type === "link")
          return (
            <a
              key={token.start}
              href={token.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-dotted hover:decoration-solid print:no-underline"
            >
              {token.content}
              <span aria-hidden className="hidden print:inline">
                {" "}
                ({token.url})
              </span>
            </a>
          );
        return <Fragment key={token.start}>{token.content}</Fragment>;
      })}
    </>
  );
}

export function RichText({ children }: { children: string }) {
  const lines = children.split("\n");
  // 줄 내용이 겹칠 수 있으니 원문 내 시작 오프셋을 안정 키로 쓴다.
  let offset = 0;
  return (
    <>
      {lines.map((line, lineIndex) => {
        const lineStart = offset;
        offset += line.length + 1;
        const isIndented = line.startsWith("\t");
        const content = isIndented ? line.slice(1) : line;
        if (isIndented)
          return (
            <ul key={lineStart} className="mt-1 pl-4">
              <li className="ml-4 list-disc">
                <RichTokens line={content} />
              </li>
            </ul>
          );
        return (
          <Fragment key={lineStart}>
            {lineIndex > 0 && <br />}
            <RichTokens line={content} />
          </Fragment>
        );
      })}
    </>
  );
}
