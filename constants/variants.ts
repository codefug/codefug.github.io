import { cva } from "class-variance-authority";

export const QUOTE_STYLE = cva("", {
  variants: {
    type: {
      blue: "bg-quote-blue border-blue-500",
      green: "bg-quote-green border-green-500",
      yellow: "bg-quote-yellow border-yellow-500",
      orange: "bg-quote-orange  border-orange-500",
      red: "bg-quote-red border-red-500",
      purple: "bg-quote-purple border-purple-500",
      gray: "bg-quote-gray border-gray-500",
      "sky-blue": "bg-quote-sky-blue border-blue-200",
    },
  },
});

export const QUOTE_TITLE_STYLE = cva("", {
  variants: {
    type: {
      blue: "text-blue-500",
      green: "text-green-500",
      yellow: "text-yellow-500",
      orange: "text-orange-500",
      red: "text-red-500",
      purple: "text-purple-500",
      gray: "text-gray-500",
      "sky-blue": "text-blue-500",
    },
  },
});
