import { mdxMap } from "@/lib/mdxMap";

type Props = {
  postId: string;
};

export function PostContent({ postId }: Props) {
  const mdxModule = mdxMap[postId];
  if (!mdxModule) {
    return null;
  }

  const Content = mdxModule.default;
  return <Content />;
}
