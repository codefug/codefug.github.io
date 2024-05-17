---
title: "기초 프로젝트 회고"
excerpt: "infinite scroll, fetch api, modal, compound pattern"
toc: true
toc_sticky: true
categories:
  - project
last_modified_at: 2024-05-18T23:09:00
header:
  teaser: /assets/images/Codeit.png
---

## React

1. 네트워크 처리를 할 때 관련 state를 사용하는 함수에 setter를 함수 안에 안 넣고 같은 스코프에 넣을 경우에 setter가 돌아가면서 state를 바꾸고 다시 렌더링 되는 식으로 무한 루프가 발생할 수 있다.

```jsx
	const [status, setStatus] = useState({
		isLoading: true,
		errorMessage: null,
	});
	const wrappedFunction = async (...args) => {
		try {
			setStatus((prevStatus) => ({
				...prevStatus,
				isLoading: true,
				errorMessage: null,
			}));
			return await funcAsync(...args);
		} catch (error) {
			setStatus((prevStatus) => ({
				...prevStatus,
				errorMessage: error,
			}));
		} finally {
			setStatus((prevStatus) => ({
				...prevStatus,
				isLoading: false,
			}));
		}
	};
```

이것 뿐만 아니라 그냥 일단 state가 돌아가고 있는 곳에 fetch처리를 하면 계속 fetch를 하게 되서 오류가 발생한다. 

useEffect를 이용해서 deps에 따라서만 fetch를 호출하도록 해준다.
```jsx
useEffect(() => {
		const fetchData = async () => {
			const data = await wrappedFunction({ gender });
			console.log(data);
		};
		fetchData();
	}, [gender]);
```

2. useEffect

useEffect는 렌더링마다 cleanup > setup > cleanup 로직을 갖는데 development환경에서는 2번을 더하게 된다.

이번에 inView deps인 useEffect에 fetch를 넣고 다른 곳에서도  넣었더니 기본 4번 fetch에 첫 화면에 inView가 true가 되게 로직을 짜서 fetch를 8번 보내는 대참사가 벌여지며 컴퓨터가 꺼졌었다 하하.. useEffect에 들어간 fetch는 되도록이면 같은 로직이면 하나만 넣는게 좋을 것 같다.

3. infinite scroll 시 inView로직

기존 items를 더해나가는 과정에서 inView가 발생할 때 스크롤이 처음으로 돌아가는 문제가 있었다. 로딩화면을 하나 만들어서 fetch 대기중에 items component를 대체해서 쓰게 구현했었는데 이것 때문에 로딩이 끝나면 다시 component를 만들게 되서 벌여진 문제였다. 

기존의 component는 그대로 두고 맨 밑에 isLoading시에 존재하는 refresh icon을 배치하여 isLoading 시에도 기존의 item component는 두고 데이터만 추가되게 해야한다.

4. interception observer

확대 하면 inView가 처리가 안된다. 확대 풀었더니 그냥 된다 시간을 많이 날렸다.

5. inView

inView를 useEffect로 처리하면 if (inView)를 해줘야 한다. 그렇지 않으면 호출이 두번 됨 > inView true로 인한 호출 1번 false로 바뀌어서 호출 1번

6. svg Component

svg자체를 컴포넌트로 바꿀 수 있다.

svgr사이트에서 svg를 간편하게 바꿀 수 있다.

이를 통해 width, height, color 등 자유롭게 이미지를 변경시킬 수 있다.

7. 인피니티 스크롤, 스켈레톤

스켈레톤은 ui 향상, 인피니티 스크롤은 ui 향상 + 속도 증가

8. setState의 비동기처리

setState는 비동기로 처리하기 때문에 fetch에 state를 담아서 전달할 때 이전 state가 들어가는 경우가 발생할 수 있다. 이때 필요한 게 useEffect이다. 예제를 보자.

```jsx	
	const [id, setId] = useState(false);

	const handleClick = (e) => {
		if (!idolId) return;
		setCredit(credit - 1000);
		wrappedFunction(idolId);
	};

	useEffect(() => {
		if (id !== false) {
			idolId = id;
		}
	}, [id]);
```

리액트에서는 가상돔에서의 변경사항들을 한번에 보내는 batching이라는 방법을 사용하는데 이것 때문에 setter가 비동기적으로 설정되어 로직 에러가 났었다. 위를 통해 useEffect로 sideEffect처리를 해주면 이를 해결하고 실시간으로 반영할 수 있다. 

9. fetch

fetch에서 POST를 보낼 때 header에 존재하는 Content-Type은 실제 보내는 데이터의 Type과 일치해야 한다. 아니면 오류남.

wrappedFunction에 fetch가 들어가 있다. fetch에 state인 id를 그대로 전달하게 되면 setId가 바뀐지 아닌지 모르는 상태에서 id가 전달되기 때문에 로직이 꼬일 수 있다.

이때 id가 바뀌면 변수 하나가 바뀐다고 해놓고 handler에는 해당 변수를 넣는 식으로 비동기 함수가 처리완료 된 state를 얻을 수 있다.

```js
export async function postVotes(Id) {
	const URL = `${BASE_URL}/votes`;
	const response = await fetch(URL, {
		method: "POST",
		mode: "cors",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ idolId: +Id }),
	});
	return response.json();
}
```

![](https://velog.velcdn.com/images/codefug/post/54de0775-b79b-4b39-9891-0d7829f36cef/image.png)

10. Modal 구현 방법

보통 state를 이용해서 Modal을 열고 data에 관해서는 hover시 data를 불러오거나 전체 페이지 렌더링 시 데이터를 불러오는 방법이 있다.

11. 페이지 이동시 스크롤 상단 고정

페이지 이동시 router를 사용하게 되는데 이때 router의 기본 동작이 브라우저의 기본 동작을 막기 때문에 스크롤 위치를 따로 처리하기 힘들게 된다.

또한 React는 기본적으로 SPA 특성을 가지고 있어 페이지가 직접 바뀌는 것이 아니라 JS로 페이지의 일부만 변경하기 때문에 단일 페이지가 변화하는 방식이다. 따라서 스크롤 위치가 그대로인 것은 어떻게 보면 당연하다.

```jsx
// ScrollToTop.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return <>{props.children}</>;
}
```

코드로 위와 같이 해결한다.

useLocation 훅으로 현재 위치를 가져온 후에 useEffect로 현재위치가 변경되면 sideEffect로 window.scrollTo로 상단으로 올린다.



## JS

1. Event Bubbling

Event가 요소가 처음 발생한 target을 찍으려면 currentTarget이라는 Event Property를 사용하면 된다. 

2. Intersection Observer

```js
const rootRef = useRef(null);
const { ref, inView, entry } = useInView({
		threshold: 1,
		root: rootRef.current,
	});
```

```jsx
	useEffect(() => {
		if (inView) setMoreItems((prevMoreItems) => prevMoreItems + 5);
	}, [inView]);

  return <ChartList $numbers={numberOfItem} ref={rootRef}>
                  {status.isLoading ? (
                      <div>로딩화면</div>
                  ) : (
                      <>
                          {sortedItems?.map((item, index) => (
                              <IdolChartCard key={item.id} item={item} index={index} />
                          ))}
                          {noMoreItem && (
                              <RefreshSection ref={ref}>
                                  <div>{inView}</div>
                                  <RefreshImg src={refresh} />
                              </RefreshSection>
                          )}
                      </>
                  )}
              </ChartList>
```

ref로 element를 찍어서 root를 표시한 후 threshold로 보여지는 비율을 지정한다. inView가 true, false로 변하면서 판단한다.

3. 데이터 삭제시 비동기 처리

백엔드의 데이터를 전부 삭제하고 삽입해야 하는 일이 생겼다.

이번 데이터를 삭제할때 100개나 되는 데이터를 하나씩 삭제해야 되는데 이걸 for문으로 돌리면 100개의 요청을 보내게 된다. 서버에 부하를 줄이기 위해서 요청당 시간 간격을 주어서 처리하는 로직이 필요했다.

await를 이용해서 이를 해결한다.

```jsx
	const BASE_URL = "https://fandom-k-api.vercel.app/6-11";
	let array = [];
	let cursor = 0;
	const deleteIdols = async (id) => {
		const data = await fetch(`${BASE_URL}/donations/${id}`, {
			method: "DELETE",
			mode: "cors",
		});
		console.log(id + "삭제 완료");
	};

	const getIdols = async (cursor) => {
		const response = await fetch(`${BASE_URL}/donations?cursor=${cursor}`);
		const data = await response.json();
		return data;
	};

	const getAndRemove = async () => {
		while (cursor !== null) {
			console.log(cursor);
			console.log(array);
			const data = await getIdols(cursor);
			array.push(...data.list);
			cursor = data.nextCursor;
			await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for interval
		}
		while (array.length > 0) {
			console.log(array[0]);
			const data = await deleteIdols(array[0].idolId);
			array.shift();
			await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for interval
		}
	};
	getAndRemove();
```

getAndRemove()를 사용하면 array에 cursor처리를 완료한 데이터를 담게 되고 담은 것이 다 끝나면 array[0]의 데이터를 idolId에 따라서 하나씩 지우게 된다. 이는 서버에도 적용되게끔 DELETE 요청을 보내게 된다. 각 단계별로 Promise를 주어서 0.1초의 쉬는 시간을 주었다. await이기 때문에 다음 단계로 넘어가기 전에 무조건 실행된다.

## Styled Component

1. css 상속

css라는 함수를 styled component로부터 받아서 css 변수를 제작한 후 ${}을 이용해서 리터럴 문자열 안에 삽입하는 식으로 작동한다.

2. styled component가 적용되기 위해서는 해당 element에 직접 className이 있어야 한다.

코드로 적어보면

```jsx
export function Heading({ children,className}) {
	return (
        <HeadingContainer className={className}>{children}</HeadingContainer>
	);
}
```

이 상태면 HeadingContainer에 className은 styled componenet가 이미 만들었기 때문에 prop으로 받은 className이 해당 component로 내려가지 않아서 그것에 적용된 스타일링도 적용되지 않게 된다.

```jsx
export function Heading({ children,className}) {
	return (
		<div className={className}>
			<HeadingContainer>{children}</HeadingContainer>
		</div>
	);
}
```
이런식으로 className을 전달 받는 하나의 element가 있어야 스타일링이 그대로 적용되게 된다.

## css

::-webkit-scrollbar 라는 pseudo element는 브라우저에 다 호환되진 않는데 scrollbar customazation할 때 쓰는 듯 싱기

*{
transition: all 250ms;
box-sizing: border-box;
}

저 transition: all 250ms 하면 개발 환경에서도 부드럽게 변화함.

## Terminal

WSL을 vscode에서 사용하는 방식은 remote로 찍는 것이다. 왼쪽 아래에 버튼을 통해서 컨트롤하게 구현되어 있다.

## git

git squash merge를 이용하면 commit의 내용을 한번에 받을 수 있다. 기존의 feature 브랜치는 삭제해야 충돌이 발생하지 않는다.

working directory, staged directory, remote repository 세가지 공간

## Netlify 배포

배포중 npm 자체의 에러가 존재했다.

https://github.com/npm/cli/issues/4828

>
> 프로젝트 진행 중에 겪은 경험들입니다. 추후에 정리합니다.
> 
> 감사합니다.
> 