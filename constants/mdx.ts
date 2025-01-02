export type FrontMatter = {
  title: string;
  excerpt: string;
  toc: boolean;
  toc_sticky: boolean;
  categories: string[];
  last_modified_at: Date;
  header: {
    teaser: string;
  };
};
