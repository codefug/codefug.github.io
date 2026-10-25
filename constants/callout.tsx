import { mapKeys } from "es-toolkit";
import {
  Angry,
  BookCheck,
  Bug,
  CircleX,
  Flame,
  Info,
  Lightbulb,
  List,
  ListTodo,
  Medal,
  MessageCircleQuestion,
  NotepadText,
  Pencil,
  Quote,
  ServerCrash,
  Star,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";

const COLOR = {
  note: "blue",
  abstract: "gray",
  summary: "gray",
  tldr: "gray",
  info: "yellow",
  todo: "green",
  tip: "yellow",
  hint: "red",
  important: "yellow",
  success: "green",
  check: "green",
  done: "green",
  question: "sky-blue",
  help: "sky-blue",
  faq: "sky-blue",
  warning: "orange",
  caution: "orange",
  attention: "orange",
  failure: "red",
  fail: "red",
  missing: "red",
  danger: "red",
  error: "red",
  bug: "red",
  example: "purple",
  quote: "gray",
  cite: "gray",
} as const satisfies Record<string, ColorType>;

const ICON = {
  note: <Pencil />,
  abstract: <NotepadText />,
  summary: <NotepadText />,
  tldr: <NotepadText />,
  info: <Info />,
  todo: <ListTodo />,
  tip: <Lightbulb />,
  hint: <Flame />,
  important: <Star />,
  success: <Medal />,
  check: <BookCheck />,
  done: <BookCheck />,
  question: <MessageCircleQuestion />,
  help: <MessageCircleQuestion />,
  faq: <MessageCircleQuestion />,
  warning: <TriangleAlert />,
  caution: <TriangleAlert />,
  attention: <TriangleAlert />,
  failure: <CircleX />,
  fail: <CircleX />,
  missing: <CircleX />,
  danger: <Angry />,
  error: <ServerCrash />,
  bug: <Bug />,
  example: <List />,
  quote: <Quote />,
  cite: <Quote />,
} satisfies Record<keyof typeof COLOR, ReactNode>;

type LowerCalloutType = keyof typeof COLOR;

export type CalloutType = LowerCalloutType | Uppercase<LowerCalloutType>;

export type ColorType =
  | "blue"
  | "green"
  | "sky-blue"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "gray";

/** 소문자 표 하나에서 대문자 키를 만든다. `Note` 같은 혼합 표기는 해석하지 않는다. */
function withUppercaseKeys<V>(
  table: Record<LowerCalloutType, V>,
): Record<CalloutType, V> {
  const uppercase = mapKeys(table, (_, key) => key.toUpperCase());
  return { ...table, ...uppercase } as Record<CalloutType, V>;
}

export const CALL_OUT_TYPE_COLOR: Record<CalloutType, ColorType> =
  withUppercaseKeys(COLOR);

export const CALL_OUT_TYPE_ICON: Record<CalloutType, ReactNode> =
  withUppercaseKeys(ICON);
