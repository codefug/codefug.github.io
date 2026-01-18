# 블로그 포스트 자동 번역

## 목적
한국어로 작성된 마크다운 블로그 포스트를 영어로 자동 번역하여 다국어 블로그를 운영합니다.

## 작업 흐름

1. **한국어 원본 확인**
   - `markdown/{post-id}/ko/content.mdx` 파일을 읽습니다
   - `markdown/{post-id}/ko/frontmatter.mdx` 파일을 읽습니다

2. **영어 번역 생성**
   - content.mdx의 모든 한국어 텍스트를 자연스러운 영어로 번역
   - frontmatter.mdx의 title, excerpt, category를 영어로 번역
   - 코드 블록, 코드 주석은 그대로 유지
   - 기술 용어는 적절히 처리 (예: "리액트" → "React")
   - `markdown/{post-id}/en/content.mdx`에 저장
   - `markdown/{post-id}/en/frontmatter.mdx`에 저장

## 번역 가이드라인

### 일반 원칙
- **자연스러운 번역**: 직역보다는 영어의 자연스러운 표현 사용
- **기술 용어**: 일관성 있게 처리
  - 영어: 원어 그대로 (React, TypeScript, Next.js)
- **코드 유지**: 코드 블록, 인라인 코드, 파일명은 번역하지 않음
- **마크다운 구조**: 헤딩, 리스트, 링크 등 마크다운 문법은 동일하게 유지

### Frontmatter 필드
```yaml
---
title: "제목 번역"
excerpt: "요약 번역"
category: "카테고리 번역"
date: "2024-XX-XX"  # 변경하지 않음
author: "이승현"  # 변경하지 않음
header:
  teaser: "/images/..."  # 변경하지 않음
---
```

### 예시

**한국어 (ko/content.mdx)**:
```markdown
# 리액트 훅 완벽 가이드

리액트 훅은 함수형 컴포넌트에서 상태 관리를 가능하게 합니다.

## useState 사용법

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`
```

**영어 (en/content.mdx)**:
```markdown
# Complete Guide to React Hooks

React Hooks enable state management in functional components.

## How to Use useState

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`
```

## 사용 방법

이 프롬프트를 실행하면:
1. 지정한 포스트 ID의 한국어 원본을 읽습니다
2. 영어로 번역합니다
3. 영어 폴더에 파일을 생성합니다

## 주의사항
- 번역 전에 원본 파일의 백업을 권장합니다
- 번역 후 반드시 검토하여 기술 용어와 문맥이 올바른지 확인하세요
- 이미지 경로나 링크는 절대 변경하지 마세요
