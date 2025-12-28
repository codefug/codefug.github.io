import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-color": [
        "bg-quote-blue",
        "bg-quote-green",
        "bg-quote-yellow",
        "bg-quote-orange",
        "bg-quote-red",
        "bg-quote-purple",
        "bg-quote-gray",
        "bg-quote-sky-blue",
      ],
    },
  },
});

// eslint-disable-next-line
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
