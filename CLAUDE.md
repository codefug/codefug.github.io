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

frontmatter 필드:

```yaml
title: "제목"
excerpt: "목록에 보이는 요약"
date: "2026-05-27"
categories:
  - react
header:
  teaser: /images/logos/Nextjs.png # OG 태그용. 커버 그림이 없을 때만 썸네일의 작은 로고로도 쓴다
hidden: true # 선택. 발행하지 않는다 (페이지 자체를 만들지 않음)
cover: /images/<id>/photo.webp # 선택. 본문 사진을 썸네일로 쓸 때만
```

### 썸네일 그림

글마다 `public/images/<id>/cover.svg`를 하나 그려 두면 목록 썸네일에 자동으로 쓰인다
(frontmatter `cover`가 있으면 그쪽이 우선이고, 둘 다 없으면 타이포그래피 썸네일로 대신한다).
카테고리 라벨과 시리즈 순번은 컨테이너가 얹으므로 그림에 넣지 않는다.

- 기준 그림: `public/images/2026-09-27/cover.svg`. 이 스타일(플랫, 흰 면 + 잉크 외곽선)을 따른다.
- `viewBox="0 0 400 260"`, 배경 없음(투명). 좌상단 `x<120,y<44`, 우상단 `x>320,y<40`은 비운다.
- 색은 primary 인디고 계열과 무채색만: `#1e1b4b #4f46e5 #6366f1 #818cf8 #a5b4fc #c7d2fe #e0e7ff #eef2ff #fff #e5e7eb #d1d5db`.
  바닥 그림자는 `fill="#4f46e5" fill-opacity="0.12"` (불투명한 연색은 다크 모드에서 떠 보인다).
- 글의 핵심 장면을 구체적으로. 글자는 짧은 토큰만, 기술명과 회사명은 쓰지 않는다.
- `rsvg-convert -w 600 -b '#eef2ff' cover.svg -o out.png`로 렌더링해 겹침을 확인한다.

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
- `header.teaser`는 OG 태그에 쓰고, 커버 그림이 없는 글의 타이포그래피 썸네일에는 작은 로고로도 쓴다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
