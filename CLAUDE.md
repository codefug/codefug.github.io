# codefug.blog

Next.js(App Router) 정적 익스포트 기반 개인 기술 블로그. MDX로 글을 쓰고 GitHub Pages로 배포한다.

## 패키지 매니저

**pnpm만 사용한다. `npm install`을 쓰지 말 것.**
저장소에 `pnpm-lock.yaml`과 `pnpm-workspace.yaml`이 있어서, npm으로 설치하면 lockfile이 이중화되고 의존성 트리가 어긋난다.

```bash
pnpm add <pkg>       # 의존성 추가
pnpm remove <pkg>    # 의존성 제거
pnpm dev             # 개발 서버
pnpm build           # 정적 빌드 (out/)
pnpm lint            # biome check --write
```

## 글 추가

`markdown/<날짜-id>/ko/` 아래에 `frontmatter.mdx`와 `content.mdx`를 둔다.
사이트는 한국어 단일 언어다 (과거의 ko/en 이중 구조는 제거됨).
폴더를 추가하면 `pnpm dev`/`pnpm build`의 pre 스크립트가 `lib/mdxMap.ts`를 다시 만든다.

frontmatter 필드:

```yaml
title: "제목"
excerpt: "목록에 보이는 요약"
date: "2026-05-27"
categories:
  - react
header:
  teaser: /images/logos/Nextjs.png # OG 태그용 (목록 카드에는 쓰지 않는다)
hidden: true # 선택. 발행하지 않는다 (페이지 자체를 만들지 않음)
```

`hidden: true`인 글은 **페이지가 생성되지 않는다.** 목록·검색·RSS·사이트맵에서 빠지는 것은 물론이고
`/posts/<id>`로 직접 접근해도 404다. 내리기로 한 글이 주소를 아는 사람에게만 열려 있으면
사실상 발행 상태로 남기 때문이다.

그래서 숨긴 글로 향하는 링크는 404가 된다. 글을 숨길 때는
`grep -rn "/posts/<id>)" markdown/ messages/`로 걸린 링크를 함께 정리해야 한다.

## 카테고리

`constants/categories.ts`가 단일 원천이다. 태그를 그룹(`CATEGORY_GROUPS`)에 넣으면
홈 섹션·사이드바·내비게이션이 모두 따라온다. 어느 그룹에도 없는 태그는 `etc`로 모인다.

그룹을 추가하면 `messages/ko.json`의 `categories.<id>`에 `label`과 `description`을 반드시 넣어야 한다.

## 스타일

- 다크 모드를 지원한다. 새 컴포넌트에서는 `dark:`를 개별 지정하지 말고
  `bg-card`, `text-muted-foreground`, `border-border` 같은 시맨틱 토큰을 쓴다.
  그러면 다크 모드가 자동으로 따라온다.
- `header.teaser`는 OG 태그와 목록 카드의 작은 아이콘에 함께 쓴다.
  카드에서는 꽉 채우지 않고 여백을 둔 정사각 자리에 원본 비율로 넣는다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
