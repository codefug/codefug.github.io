import koMessages from "@/messages/ko.json";

type Values = Record<string, string | number>;

function resolve(path: string): unknown {
  return path.split(".").reduce<unknown>((node, segment) => {
    if (node && typeof node === "object")
      return (node as Record<string, unknown>)[segment];
    return undefined;
  }, koMessages);
}

function interpolate(template: string, values?: Values): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
}

/**
 * ko.json에서 메시지를 읽는다. next-intl의 useTranslations와 같은 시그니처라
 * 서버/클라이언트 어디서든 쓸 수 있다. 없는 키는 빌드(SSG) 시점에 던져서 잡는다.
 */
export function useTranslations(scope?: string) {
  const prefix = scope ? `${scope}.` : "";
  const t = (key: string, values?: Values): string => {
    const value = resolve(prefix + key);
    if (typeof value !== "string")
      throw new Error(`메시지 키가 문자열이 아닙니다: ${prefix + key}`);
    return interpolate(value, values);
  };
  t.raw = (key: string): unknown => resolve(prefix + key);
  t.has = (key: string): boolean => resolve(prefix + key) !== undefined;
  return t;
}

/** 서버 컴포넌트 호환용 별칭 — `await getTranslations(...)` 형태 그대로 동작한다. */
export const getTranslations = useTranslations;
