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
import { ReactNode } from "react";

export type CalloutType =
  | "note"
  | "abstract"
  | "summary"
  | "tldr"
  | "info"
  | "todo"
  | "tip"
  | "hint"
  | "important"
  | "success"
  | "check"
  | "done"
  | "question"
  | "help"
  | "faq"
  | "warning"
  | "caution"
  | "attention"
  | "failure"
  | "fail"
  | "missing"
  | "danger"
  | "error"
  | "bug"
  | "example"
  | "quote"
  | "cite";

export type ColorType =
  | "blue"
  | "green"
  | "sky-blue"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "gray";

export const CALL_OUT_TYPE_COLOR: { [key: string]: ColorType } = {
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
};

export const CALL_OUT_TYPE_ICON: { [key: string]: ReactNode } = {
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
};
