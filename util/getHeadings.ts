export default function getHeadings(
  source: string,
): { text: string; level: number; id: string }[] {
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^##*\s/);
  });

  return headingLines.map((raw, index) => {
    let text = raw.replace(/^##*\s/, "");
    if (text[0] === "<") {
      // style이 추가되어 있는 mark 태그 벗기기
      const start = text.indexOf(">");
      const end = text.lastIndexOf("<");
      const textWithoutStyle = text.slice(start + 1, end);
      text = textWithoutStyle;
    }
    const id = index + text;
    let level = 0;
    for (let i = 0; i < 6; i += 1)
      if (raw[i] === "#") level += 1;
      else break;

    return { text, level, id };
  });
}
