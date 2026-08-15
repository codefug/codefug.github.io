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

`markdown/<날짜-id>/{ko,en}/` 아래에 `frontmatter.mdx`와 `content.mdx`를 둔다.
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
hidden: true # 선택. 목록·검색·RSS·사이트맵에서 제외하고 noindex 처리
```

`hidden: true`인 글도 직접 URL로는 열린다(기존 링크 보존). 목록에 노출하지 않을 뿐이다.

## 카테고리

`constants/categories.ts`가 단일 원천이다. 태그를 그룹(`CATEGORY_GROUPS`)에 넣으면
홈 섹션·사이드바·내비게이션이 모두 따라온다. 어느 그룹에도 없는 태그는 `etc`로 모인다.

그룹을 추가하면 `messages/{ko,en}.json`의 `categories.<id>`에 `label`과 `description`을 반드시 넣어야 한다.

## 스타일

- 다크 모드를 지원한다. 새 컴포넌트에서는 `dark:`를 개별 지정하지 말고
  `bg-card`, `text-muted-foreground`, `border-border` 같은 시맨틱 토큰을 쓴다.
  그러면 다크 모드가 자동으로 따라온다.
- 목록 카드에는 썸네일 이미지를 넣지 않는다. `header.teaser`는 OG 태그 전용이다.
