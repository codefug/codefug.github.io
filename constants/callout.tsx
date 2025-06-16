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
  | "NOTE"
  | "abstract"
  | "ABSTRACT"
  | "summary"
  | "SUMMARY"
  | "tldr"
  | "TLDR"
  | "info"
  | "INFO"
  | "todo"
  | "TODO"
  | "tip"
  | "TIP"
  | "hint"
  | "HINT"
  | "important"
  | "IMPORTANT"
  | "success"
  | "SUCCESS"
  | "check"
  | "CHECK"
  | "done"
  | "DONE"
  | "question"
  | "QUESTION"
  | "help"
  | "HELP"
  | "faq"
  | "FAQ"
  | "warning"
  | "WARNING"
  | "caution"
  | "CAUTION"
  | "attention"
  | "ATTENTION"
  | "failure"
  | "FAILURE"
  | "fail"
  | "FAIL"
  | "missing"
  | "MISSING"
  | "danger"
  | "DANGER"
  | "error"
  | "ERROR"
  | "bug"
  | "BUG"
  | "example"
  | "EXAMPLE"
  | "quote"
  | "QUOTE"
  | "cite"
  | "CITE";

export type ColorType =
  | "blue"
  | "green"
  | "sky-blue"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "gray";

export const CALL_OUT_TYPE_COLOR: { [key in CalloutType]: ColorType } = {
  note: "blue",
  NOTE: "blue",
  abstract: "gray",
  ABSTRACT: "gray",
  summary: "gray",
  SUMMARY: "gray",
  tldr: "gray",
  TLDR: "gray",
  info: "yellow",
  INFO: "yellow",
  todo: "green",
  TODO: "green",
  tip: "yellow",
  TIP: "yellow",
  hint: "red",
  HINT: "red",
  important: "yellow",
  IMPORTANT: "yellow",
  success: "green",
  SUCCESS: "green",
  check: "green",
  CHECK: "green",
  done: "green",
  DONE: "green",
  question: "sky-blue",
  QUESTION: "sky-blue",
  help: "sky-blue",
  HELP: "sky-blue",
  faq: "sky-blue",
  FAQ: "sky-blue",
  warning: "orange",
  WARNING: "orange",
  caution: "orange",
  CAUTION: "orange",
  attention: "orange",
  ATTENTION: "orange",
  failure: "red",
  FAILURE: "red",
  fail: "red",
  FAIL: "red",
  missing: "red",
  MISSING: "red",
  danger: "red",
  DANGER: "red",
  error: "red",
  ERROR: "red",
  bug: "red",
  BUG: "red",
  example: "purple",
  EXAMPLE: "purple",
  quote: "gray",
  QUOTE: "gray",
  cite: "gray",
  CITE: "gray",
};

export const CALL_OUT_TYPE_ICON: { [key in CalloutType]: ReactNode } = {
  note: <Pencil />,
  NOTE: <Pencil />,
  abstract: <NotepadText />,
  ABSTRACT: <NotepadText />,
  summary: <NotepadText />,
  SUMMARY: <NotepadText />,
  tldr: <NotepadText />,
  TLDR: <NotepadText />,
  info: <Info />,
  INFO: <Info />,
  todo: <ListTodo />,
  TODO: <ListTodo />,
  tip: <Lightbulb />,
  TIP: <Lightbulb />,
  hint: <Flame />,
  HINT: <Flame />,
  important: <Star />,
  IMPORTANT: <Star />,
  success: <Medal />,
  SUCCESS: <Medal />,
  check: <BookCheck />,
  CHECK: <BookCheck />,
  done: <BookCheck />,
  DONE: <BookCheck />,
  question: <MessageCircleQuestion />,
  QUESTION: <MessageCircleQuestion />,
  help: <MessageCircleQuestion />,
  HELP: <MessageCircleQuestion />,
  faq: <MessageCircleQuestion />,
  FAQ: <MessageCircleQuestion />,
  warning: <TriangleAlert />,
  WARNING: <TriangleAlert />,
  caution: <TriangleAlert />,
  CAUTION: <TriangleAlert />,
  attention: <TriangleAlert />,
  ATTENTION: <TriangleAlert />,
  failure: <CircleX />,
  FAILURE: <CircleX />,
  fail: <CircleX />,
  FAIL: <CircleX />,
  missing: <CircleX />,
  MISSING: <CircleX />,
  danger: <Angry />,
  DANGER: <Angry />,
  error: <ServerCrash />,
  ERROR: <ServerCrash />,
  bug: <Bug />,
  BUG: <Bug />,
  example: <List />,
  EXAMPLE: <List />,
  quote: <Quote />,
  QUOTE: <Quote />,
  cite: <Quote />,
  CITE: <Quote />,
};
