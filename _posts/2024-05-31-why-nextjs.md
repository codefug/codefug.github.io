---
title: "Next는 왜 쓸까"
excerpt: "CSR SSG SSR"
toc: true
toc_sticky: true
categories:
  - nextjs
last_modified_at: 2024-05-31T10:00:00
header:
  teaser: /assets/images/Logo/Nextjs.png
---

## React는 library이다.

React 공식 문서에 가면 다음과 같은 문장이 있다.

> The library for web and native user interfaces

즉, React는 web과 ui를 위한 라이브러리이지 프레임워크가 아니라는 것

### Library와 Framework의 차이

Library : 구체적이고 잘 정의된 일련의 작업 수행, 메서드를 호출하면 제어권을 갖게 된다.

Framework : 애플리케이션이 스켈레톤을 채워 작업 내용을 정의, 프레임워크가 우리를 호출한다.

react fiber architecture라는 이용해서 리렌더링을 최적화하는 등 복잡한 내부 로직을 가지고 있지만 결국에는 ui를 돕기 위한 라이브러리라는 것이다.

자유성이 높기 때문에 다양한 package들을 사용해서 라우팅 같은 기능을 붙혀서 사용했지만 복잡해지는 웹 기술에서 어느정도 정형화된 프레임워크의 존재는 필요했다.

이런 니즈에 맞춰 React를 활용한 Framework Next.js가 등장했다.

## Next.js

Next.js의 공식문서에 다음의 문구가 바로 보인다.

> The React Frame Work for the Web

next/head를 이용한 메타 데이터 삽입이나 app router, pages router를 이용한 React router와는 다른 라우팅 방법, Image 컴포넌트를 이용한 lazy loading 등등 Next에서 지원해주는 여러 기능들이 있지만 Next.js의 가장 큰 특징이라고 하면 렌더링하는 방식이 있다.

### SSR
**Server-Side-Rendering**

모든 Request 마다 서버에서 HTML page를 만든다.

<img src="https://codefug.github.io/assets/images/2024-05-31/Pasted%20image%2020240530181448.png
" class="full" alt="ssr image"/>

Next.js 내에서 `getServerSideProps` 함수를 통해서 구현되며 모든 Request마다 해당 함수가 서버단에서 구현된다.

이후 클라이언트에서 나머지 JS를 적용시키는데 이를 hydration이라고 한다.

자주 업데이트되는 데이터 (fetch로 받아오는 외부데이터 등)를 pre-render할 때 사용하면 좋다.

#### 장점

1. **초기 화면 로딩** - 빈 HTML을 먼저 사용하고 JS로 컨텐츠를 채우는 CSR에 비해서 초기 화면 로딩 속도가 빠르다.
2. **SEO** - 첫 렌더링되는 HTML에 컨텐츠가 채워서 나가기 때문에 SEO에 유리하다.
3. **장치에 대한 부담** - pre-rendering된 HTML을 받기 때문에 processing power가 약한 장치이 접속해도 부담이 없다

#### 한계

1. **서버 과부하** - 서버단에 HTML 컨텐츠를 채우게 맡기기 때문에 서버의 과부하가 올 수 있다.
2. **전체 페이지 리로딩** - server-side processing이 필요한 상호작용이 발생하면 전체 페이지 리로딩이 유발된다.

#### 예시

### SSG

**Static Site Generation**

빌드 시간에 서버가 HTML을 만들고 모든 요청마다 이걸 재사용하는 방식

data를 fetching하지 않는 경우 Next.js는 자동으로 SSG 방식을 사용한다.

Next.js 공식문서에는 이를 사용하는 두가지 상황을 제시한다.

#### content가 외부 데이터에 의존하는 경우 (`getStaticProps`)

```jsx
export default function Blog({ posts }) {
  // Render posts...
}
 
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}
```

위의 경우 getStaticProps 안에서 fetch로 데이터를 가져와서 빌드 타임에 posts라는 prop에 내려준다.

#### paths가 외부 데이터에 의존하는 경우 (`getStaticPaths`, `getStaticProps`)

Next.js의 Dynamic Routes를 이용한 경우이다.

```jsx
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
```

`pages/posts/[id].js`의 형태로 Dynamic Routes를 구성했을 경우 fetch로 id에 들어갈 전체 데이터를 미리 가져온 후에 params라는 곳에 key-value 형태로 받아온다.

```jsx
export default function Post({ post }) {
  // Render post...
}
 
export async function getStaticPaths() {
  // ...
}
 
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()
 
  // Pass post data to the page via props
  return { props: { post } }
}
```

이 데이터는 이후에 `getStaticProps`의 인자가 되어 정적 페이지 최적화에 사용될 수 있다.

덤으로 getStaticProps는 서버에서 실행되기 때문에 CORS 문제를 겪지 않을 수 있다.

#### 예시

```tsx
export const getStaticProps = (async (context) => {
  const likeRes = await fetch(`${BASE_URL}/articles?pageSize=3&&orderBy=like`);
  const likeData: ArticleData = await likeRes.json();
  const likeList = likeData.list ?? [];
  return { props: { likeList } };
}) satisfies GetStaticProps<{
  likeList: Article[] | [];
}>;
```

프로젝트 시 사용했던 코드의 일부이다.

best게시물 세개를 화면에 띄우는 작업이었는데 유동적으로 데이터를 바꾸지 않아도 되기에 SSG를 사용하여 렌더링을 최적화할 때 사용했다.

### ISR

**Incremental Static Regeneration**

사이트를 구축한 후에도 정적 페이지를 생성하거나 업데이트하는 방식

전체 사이트를 구축할 필요 없이 페이지 별로 정적 생성을 사용할 수 있다.

`getStaticProps`에 revalidate props를 추가하면 사용가능하다.

## Reference

<a src="https://react.dev/">React 공식문서</a>

<a src="https://www.geeksforgeeks.org/software-framework-vs-library/">geeksforgeeks</a>

<a src="https://nextjs.org/">Next 공식문서</a>

Modern React Deep dive - 김용찬

Next.js 웹사이트 만들기 - 코드잇

<a src="https://www.devlane.com/blog/what-is-server-side-rendering-in-next-js-pros-and-cons">Devlane Blog</a>

<a src="https://dev.to/haszankauna/understanding-server-side-rendering-ssr-vs-client-side-rendering-csr-8gi#:~:text=Cons%20of%20SSR%3A,trigger%20a%20full%20page%20reload.">haszankauna Post</a>

>
> Next.js를 접하면서 알게된 정보들과 직접 구현해본 코드들입니다.
>
> 잘못된 내용이 있다면 말씀 부탁드립니다. 감사합니다.
>