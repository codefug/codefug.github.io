---
title: "자잘한 Next.js 트러블 슈팅들"
excerpt: "react-responsive를 사용하지 못하는 상황, dotenv 사용시 문제 발생"
toc: true
toc_sticky: true
categories:
  - nextjs
last_modified_at: 2024-06-09T02:35:00 (시간)
header:
  teaser: /assets/images/Logo/Nextjs.png
---

# 라이브러리를 뜯어보는 경험

## 사람들이 편하라고 만들었는데 공부 안해도 되지 않나?

어리석게도 마음 한켠에 있던 생각이었다. 물론 직접 구현하는 것이 좋다는 이야기를 듣고 인피니티 스크롤을 interceptor observer API로 직접 구현해보는 등의 작업은 하긴 했지만 마음에 와닿지는 않았었다. 

하지만 nextjs를 학습하면서 정말 필요한 일이 생겨버린다.

## 배경

여느때와 같이 js를 이용해서 반응형으로 데이터를 불러오려고 했던 나.

> npm install react-responsive --save

하던 것 처럼 react-responsive를 활용해서 사용자 지정 훅을 만드는데 여기서는 {isMobile, isTablet, isDesktop} 형식으로 따로 빼서 사용하기 더 쉽게 만들려고 했다.

근데 여기서 발생한 오류

> Error: Hydration failed because the initial UI does not match what was rendered on the server.

nextjs를 사용하면 무조건 만나는 문제인 hydration error를 만나버렸다.

## 해결 과정

### 원인

SSR방식에서는 유저 요청시 서버에서 HTML을 인터랙션 부분을 제외해서 한번 주고 이후에 JS 번들을 넘겨서 인터랙션 부분을 붙인다. 이 붙이는 부분은 물을 뿌린다고 해서 hydration 이라고 한다.

다시 말해 위의 에러는 "처음 서버에서 준 HTML이랑 다음에 받은 UI가 다른다는 것이다." 라는 거다.

이는 react-responsive 내부에서 size를 확인하기 위해 window 관련 API를 사용했고 Node.js 환경에서 돌아가는 서버 부분은 이를 이해하지 못한 채 처음 HTML을 넘기고 이후 JS 번들은 이를 이해해서 다르게 반응했기에 벌여진 일이었다.

역경이 있어도 프로젝트를 해내야 했기에 성능 최적화까지 겸한 responsive를 만들기로 했다.

### 해결

```js
import { useEffect, useState } from "react";
import { debounce } from "./debounce";

export const useScreenDetector = () => {
  const [screen, setScreen] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const handleWindowSizeChange = () => {
    if (window.innerWidth <= 744)
      setScreen((prev) => ({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      }));
    else if (window.innerWidth > 1200)
      setScreen((prev) => ({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      }));
    else
      setScreen((prev) => ({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      }));
  };

  useEffect(() => {
    window.addEventListener("resize",handleWindowSizeChange);
    return () => {
      window.removeEventListener(
        "resize",
        handleWindowSizeChange
      );
    };
  }, []);

  return screen;
};
```

기존의 객체 방식으로 리턴 받는 것은 놓고 싶지 않았기에 객체 자체를 state로 만들어서 innerWidth를 검사하는 식으로 구현하였다.



#### 리팩토링
```js
export function debounce(func: () => void, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, wait);
  };
}
```

디바운스를 적용하여 resize 이벤트의 과부화를 줄였다.

```js
import { useEffect, useState } from "react";
import { debounce } from "./debounce";

export const useScreenDetector = () => {
  const [screen, setScreen] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const handleWindowSizeChange = () => {
    if (window.innerWidth <= 744)
      setScreen((prev) => ({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      }));
    else if (window.innerWidth > 1200)
      setScreen((prev) => ({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      }));
    else
      setScreen((prev) => ({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      }));
  };

  useEffect(() => {
    window.addEventListener("resize", debounce(handleWindowSizeChange, 100));
    return () => {
      window.removeEventListener(
        "resize",
        debounce(handleWindowSizeChange, 100),
      );
    };
  }, []);

  return screen;
};
```

## 느낀점

라이브러리를 맹신하면 안된다는 것을 몸으로 느끼게 되었고 SSR 방식에 대해서 깊게 공부하게 된 좋은 기회가 되었다. 좀 더 다양한 방식으로 확장할 수 있는 개발자가 되어야겠다.

# env 파일의 차이

## javascript 진영에서 dotenv

다른 진영은 잘 모르지만 js 진영에서는 dotenv라는 라이브러리로 환경 변수를 저장하는 경우가 많다. 이는 node.js 환경에서 사용하는 환경 변수인데

여기서 문제는 브라우저에서는 사용하지 못한다는 것이다.

예를 들면

```tsx
export async function getCommentWithId(id: string, cursor: number | null) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/articles/${id}/comments?limit=10${cursor !== null ? `&&cursor=${cursor}` : ""}`,
    );
    const data: Comments = await res.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}
```

이런 코드가 있다고 하면 이는 SSR시에는 돌아가지만 렌더링 이후 브라우저에서 CSR하려고 다시 함수를 사용할 때 문제가 발생할 수 있다. Next에서는 환경변수를 분리해놨다.

https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser

NEXT_PUBLIC_~ 로 env에 넣어놓으면 빌드 타임에 js bundle에 환경 변수를 넣어놓음으로써 브라우저에서 접근할 수 있게 된다.

```tsx
(async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${router.query.id}/comments?limit=10${cursor !== null ? `&&cursor=${cursor}` : ""}`,
      );
      const comments: Comments = await response.json();
      setCommentList(comments.list);
      setCursor(comments.nextCursor);
    })();
```

>
> 개인 학습 중에 겪은 경험들입니다. 부족한 부분이 있다면 댓글 적어주세요.
>
> 감사합니다.
>