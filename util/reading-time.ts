const KO_CHARS_PER_MIN = 500;

export function getReadingTime(content: string): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(chars / KO_CHARS_PER_MIN));
}
