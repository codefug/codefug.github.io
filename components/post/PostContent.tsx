import type { MDXModule } from "mdx/types";

type Props = {
  postId: string;
};

/**
 * 번들러가 템플릿 리터럴의 정적인 앞뒤 부분으로 후보 모듈을 미리 찾아두므로
 * (context module) 매핑 파일 없이도 정적 익스포트에서 동작한다.
 */
export async function PostContent({ postId }: Props) {
  let mdxModule: MDXModule;
  try {
    mdxModule = await import(`@/markdown/${postId}/ko/content.mdx`);
  } catch {
    return null;
  }

  const Content = mdxModule.default;
  return <Content />;
}
