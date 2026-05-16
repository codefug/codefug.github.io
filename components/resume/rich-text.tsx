import { Fragment } from "react";

const BOLD_RE = /\[B\](.+?)\[\/B\]/g;

export function RichText({ children }: { children: string }) {
  const parts: (string | { bold: string })[] = [];
  let lastIndex = 0;
  for (const match of children.matchAll(BOLD_RE)) {
    if (match.index! > lastIndex)
      parts.push(children.slice(lastIndex, match.index));
    parts.push({ bold: match[1] });
    lastIndex = match.index! + match[0].length;
  }
  if (lastIndex < children.length) parts.push(children.slice(lastIndex));

  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <strong key={i} className="font-bold">
            {p.bold}
          </strong>
        ),
      )}
    </>
  );
}
