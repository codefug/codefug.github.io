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

function RichTokens({ line }: { line: string }) {
  return (
    <>
      {tokenize(line).map((token, i) => {
        if (token.type === "bold")
          return (
            <strong key={i} className="font-bold text-gray-900 dark:text-white">
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
              className="text-primary underline decoration-dotted hover:decoration-solid print:text-gray-700 print:no-underline"
            >
              {token.content}
              <span
                aria-hidden
                className="hidden print:inline print:text-[10px] print:text-gray-500"
              >
                {" "}
                ({token.url})
              </span>
            </a>
          );
        return <Fragment key={i}>{token.content}</Fragment>;
      })}
    </>
  );
}

export function RichText({ children }: { children: string }) {
  const lines = children.split("\n");
  return (
    <>
      {lines.map((line, lineIndex) => {
        const isIndented = line.startsWith("\t");
        const content = isIndented ? line.slice(1) : line;
        if (isIndented)
          return (
            <ul key={lineIndex} className="mt-0.5 pl-4">
              <li className="ml-4 list-disc">
                <RichTokens line={content} />
              </li>
            </ul>
          );
        return (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            <RichTokens line={content} />
          </Fragment>
        );
      })}
    </>
  );
}
