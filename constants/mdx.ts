export type FrontMatter = {
  title: string;
  excerpt: string;
  toc: boolean;
  toc_sticky: boolean;
  categories: string[];
  date: Date;
  header: {
    teaser: string;
  };
};
