export const TAG_LIST = {
  DATA_STRUCTURE: "data-structure",
  JAVASCRIPT: "javascript",
  TYPESCRIPT: "typescript",
  KKOM_KKOM: "kkom-kkom",
  GHEUPPAY: "gheuppay",
  REACTDEEPDIVE: "reactdeepdive",
  REACT: "react",
  WEB: "web",
  NEXTJS: "nextjs",
  FANDOMK: "fandomk",
} as const;

export const TAG_GROUP_TO_ARRAY_MAP: {
  [key in string]: (typeof TAG_LIST)[keyof typeof TAG_LIST][];
} = {
  "Computer Science": [TAG_LIST.DATA_STRUCTURE],
  Project: [TAG_LIST.FANDOMK, TAG_LIST.KKOM_KKOM, TAG_LIST.GHEUPPAY],
  Web: [TAG_LIST.WEB],
  language: [TAG_LIST.TYPESCRIPT, TAG_LIST.JAVASCRIPT],
  FE: [TAG_LIST.NEXTJS, TAG_LIST.REACT],
  Book: [TAG_LIST.REACTDEEPDIVE],
};

export const TAG_VALUE_TO_GROUP_MAP: {
  [key in (typeof TAG_LIST)[keyof typeof TAG_LIST]]: string;
} = Object.entries(TAG_GROUP_TO_ARRAY_MAP).reduce(
  (acc, [key, array]) => {
    array.forEach((value) => {
      acc[value] = key;
    });
    return acc;
  },
  {} as {
    [key in (typeof TAG_LIST)[keyof typeof TAG_LIST]]: string;
  },
);
