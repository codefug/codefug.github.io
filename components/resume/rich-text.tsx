import { Fragment } from "react";

type Token =
  | { type: "text"; content: string }
  | { type: "bold"; content: string }
  | { type: "link"; url: string; content: string };

const COMBINED_RE = /\[B\](.+?)\[\/B\]|\[L:([^\]]+)\](.+?)\[\/L\]/g;

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(COMBINED_RE)) {
    if (match.index! > lastIndex)
      tokens.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    if (match[1] !== undefined) {
      tokens.push({ type: "bold", content: match[1] });
    } else {
      tokens.push({ type: "link", url: match[2], content: match[3] });
    }
    lastIndex = match.index! + match[0].length;
  }
  if (lastIndex < text.length)
    tokens.push({ type: "text", content: text.slice(lastIndex) });
  return tokens;
}

export function RichText({ children }: { children: string }) {
  return (
    <>
      {tokenize(children).map((token, i) => {
        if (token.type === "bold")
          return (
            <strong key={i} className="font-bold text-primary">
              {token.content}
            </strong>
          );
        if (token.type === "link")
          return (
            <a
              key={i}
              href={token.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-dotted hover:decoration-solid"
            >
              {token.content}
            </a>
          );
        return <Fragment key={i}>{token.content}</Fragment>;
      })}
    </>
  );
}
