---
title: "Asynchronous JavaScript"
excerpt: "microtask queue, macrotask queue, call stack, web api와 관련된 비동기 동작 방식, 비동기 관련 역사와 비동기 코드의 다양한 활용법들을 알아보자."
toc: true
toc_sticky: true
categories:
  - javascript
last_modified_at: 2024-11-10T23:00:00
header:
  teaser: /assets/images/Logo/JS.svg
---
![](https://velog.velcdn.com/images/codefug/post/1863b8a0-6521-495b-85f2-22b0f35b6380/image.png)
# <mark style="background: #FF5582A6;">이벤트 루프와 비동기 통신의 이해</mark>

JavaScript는 싱글 스레드에서 작동한다. 그래서 한 번에 하나의 task만 동기 방식으로 처리할 수 있다.

**동기(synchronous)** : 직렬 방식으로 작업을 처리하는 것, 요청이 시작하고 응답을 받은 후에야 다음 작업 처리

**비동기(Asynchronous)** : 병렬 방식으로 작업을 처리하는 것, 요청이 시작한 후 응답과 관계 없이 다음 작업 처리

사용자가 검색어를 입력해 검색을 위한 네트워크 요청이 발생한 순간에도 다른 작업을 처리할 수 있다. (비동기)

# <mark style="background: #FF5582A6;">싱글 스레드 자바스크립트</mark>

과거, 프로그램을 실행하는 단위가 오직 Process뿐이었다.

Process : 프로그램을 구동해 프로그램의 상태가 메모리상에서 실행되는 작업 단위

현재, 하나의 프로그램에 여러 가지 작업이 필요해졌고 더 작은 실행 단위인 thread가 탄생했다.

thread: 하나의 process에는 여러 개의 thread를 만들 수 있고, thread 끼리 메모리를 공유할 수 있다. 여러 작업 동시 수행

JavaScript는 기본적으로 Single Thread 이다.

## <mark style="background: #FFB86CA6;">JS가 Multi Thread가 아닌 이유</mark>

1. Multi Thread는 내부적으로 처리가 복잡하며 같은 자원에 대해 여러 번 수정하는 등 동시성 문제가 발생할 수 있기에 이에 대한 처리가 필요하다.
2. 각각 격리된 process와 다르게 하나의 thread가 문제가 생기면 다른 thread도 문제가 발생할 수 있다.
3. JS이 Multi Thread를 지원해서 동시에 여러 thread가 DOM을 조작할 수 있었다면 메모리 공유 때문에 동시에 같은 자원에 접근하게 되고  이 때문에 타이밍 이슈가 발생할 수 있으며 DOM 표시에 큰 문제를 일으킬 수 있다.

# <mark style="background: #FF5582A6;">비동기 작업의 역사와 개념</mark>

## <mark style="background: #FFB86CA6;">콜백</mark>

호스트 환경이 제공하는 함수를 사용하면 비동기 동작을 스케줄링할 수 있다.

`setTimeout`이 대표적인 함수이다.

스크립트나 모듈을 로딩하는 것도 비동기 동작이다.

예를 들면 src에 있는 스크립트를 읽어오는 함수를 예시로 보자.

```js
function loadScript(src) {
  // <script> 태그를 만들고 페이지에 태그를 추가한다.
  // 태그가 페이지에 추가되면 src에 있는 스크립트를 로딩하고 실행한다.
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

// 해당 경로에 있는 스크립트를 불러오고 실행한다.
loadScript('/my/script.js');
// ...
```

이때 스크립트는 비동기적으로 실행된다.

따라서 loadScript 아래 코드들은 loadScript가 끝나는 것을 기다리지 않는다.

```js
loadScript('/my/script.js'); // script.js엔 "function newFunction() {…}"이 있다.

// script.js에 있는 newFunction을 사용하려고 하는데 
// 함수가 존재하지 않는다는 에러가 발생한다!
newFunction();
```

여기에 콜백을 추가해보자.

> **콜백 함수**
> 
> 주로 함수 안에 전달인자로 다른 함수에 전달되는 함수를 의미한다. 일종의 루틴이나 동작을 완료하기 위해 외부 함수 내부에서 호출된다.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  // script가 load 이벤트를 일으키면 (load 되면) callback에 script를 담아서 실행시킨다.
  script.onload = () => callback(script);

  document.head.append(script);
}

loadScript('/my/script.js', function() {
  // 콜백 함수는 스크립트 로드가 끝나면 실행됩니다.
  newFunction(); // 이제 함수 호출이 제대로 동작합니다.
  ...
});
```

위의 방식을 콜백 기반 비동기 프로그래밍이라고 한다.

loadScript에 콜백 함수를 전해줘서 newFunction이 비동기 실행과 나란히 일어날 수 있게 해준다.

### <mark style="background: #FFF3A3A6;">에러 핸들링</mark>

스크립트 로딩이 실패하는 경우 발생하는 에러를 핸들링할 수 있어야 한다.

다음과 같이 개선해보자.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  // 성공 시 null과 script를 인수에 넣고
  script.onload = () => callback(null, script);
  // 실패 시 에러 객체를 인수에 넣는다.
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

  document.head.append(script);
}

loadScript('/my/script.js', function(error, script) {
  if (error) {
    // 에러 처리
  } else {
    // 스크립트 로딩이 성공적으로 끝남
  }
});
```

위 패턴은 **오류 우선 콜백**으로 에러를 처리하기 위해 사용되는 흔한 패턴이다.
1. callback의 첫 번째 인수는 에러를 위해 남겨둔다.
2. 두 번째 혹은 그 이상의 인수들은 에러가 발생하지 않았을 때 콜백 함수에 넘겨줄 인수들이다.

### <mark style="background: #FFF3A3A6;">콜백 속 콜백</mark>

만약 두 개의 스크립트를 차례대로 불러오려 한다면 콜백 안에 콜백을 넣어야 한다.

```js
loadScript('/my/script.js', function(script) {
  loadScript('/my/script2.js', function(script) {
    loadScript('/my/script3.js', function(script) {
      // 세 스크립트 로딩이 끝난 후 실행됨
    });
  })
});
```

#### <mark style="background: #BBFABBA6;">콜백 지옥</mark>

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107193715.png)

위 방식은 멸망의 피라미드, 콜백 지옥이라 부르는 상황을 만든다.
(코드가 오른쪽으로 점점 옮겨지면서 가독성도 해치고 코드 재사용이 어려운 상황)

이를 해결하기 위해서 논리적으로 다음과 같이 짤 수는 있는데

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // 모든 스크립트가 로딩되면 다른 동작을 수행한다.
  }
};
```

이는 모양만 개선되었지 내부 로직은 결국 위아래 옮겨 다니면서 파악해야 하고 재사용이 어려운 문제를 그대로 갖고 있다.

### <mark style="background: #FFF3A3A6;">무조건 콜백을 사용하면 안될까?</mark>

아니다.

특정 동작이 끝나는 것이 보장되고 그다음 코드를 실행해야 할 때 사용하면 여전히 유용하다.

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("안녕하세요!");
});
```

showCircle(cx, cy, radius, callback)은 천천히 커지는 원을 만드는 함수라고 치자.

함수 내부에서 해당 callback을 이용해서 원을 다 만든 후에 요소에 "안녕하세요!"를 그리는 함수를 실행하도록 할 수 있다.

> 콜백을 활용하면 해당 task를 Microtask Queue가 아니라 Macrotask queue로 task를 이동시킨다. ( `setTimeout`의 동작 방식 )
> Microtask Queue와 Macrotask queue의 차이는 이 글의 하단 부분에서 이해할 수 있다.

## <mark style="background: #FFB86CA6;">Promise</mark>

시간이 얼마나 걸리던 상관없이 약속한 결과를 만들어내는 "제작 코드"가 준비되었을 때, 모든 "소비 코드"가 결과를 사용할 수 있도록 해준다.

> 제작 코드
> 
> 원격에서 스크립트를 불러오는 것 같은 시간이 걸리는 일

> 소비 코드
> 
> 제작 코드의 결과를 기다렸다가 이를 소비한다. 소비의 주체(함수)는 여럿이 될 수 있다.

```js
let promise = new Promise(function(resolve, reject) {
  // executor (제작 코드, '가수')
});

// promise.then/catch/finally 등등
```

### <mark style="background: #FFF3A3A6;">executor 함수</mark>

`new Promise`에 전달되는 콜백은 executor라고 해서 `new Promise`가 만들어질 때 자동으로 실행되며 결과를 최종적으로 만들어내는 제작 코드를 포함한다.

executor에서는 resolve, reject를 신경 쓰지 않고 코드를 작성하면 되는데 상황에 따라 resolve, reject 중 하나를 호출해야 한다.
1. resolve(value) - 일이 성공적으로 끝났을 때 그 결과를 나타내는 value와 함께 호출
2. reject(error) - 에러 발생 시 에러 객체를 나타내는 `error`와 함께 호출

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107200211.png)

new Promise 생성자가 반환하는 promise 객체는 PromiseState, PromiseResult라는 내부 프로퍼티를 가진다.

resolve, reject 둘 다 일어나지 않았을 때

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107195926.png)

resolve일 때

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107195831.png)


reject일 때

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107200104.png)

#### <mark style="background: #BBFABBA6;">executor 예시</mark>

1. executor는 `new Promise`에 의해 자동으로 그리고 즉각적으로 호출된다.
2. executor는 인자로 `resolve`와 `reject` 함수를 받는다. 이 함수들은 자바스크립트 엔진이 미리 정의한 함수이므로 개발자가 따로 만들 필요가 없다. 다만, `resolve`나 `reject` 중 하나는 반드시 호출해야 합니다.

```js
let promise = new Promise(function(resolve, reject) {
  // Promise가 만들어지면 executor 함수는 자동으로 실행된다.

  // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result는 '완료'가 된다.
  setTimeout(() => resolve("완료"), 1000);
});
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107200545.png)

```js
let promise = new Promise(function(resolve, reject) {
  // 1초 뒤에 에러와 함께 실행이 종료되었다는 신호를 보냅니다.
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107200740.png)

`resolve`나 `reject`가 완료된 `Promise`를 `settled Promise` 라고 부른다.

### <mark style="background: #FFF3A3A6;">주의사항</mark>

#### <mark style="background: #BBFABBA6;">1. 한번 처리된 Promise는 바뀌지 않는다.</mark>
```js
let promise = new Promise(function(resolve, reject) {
  resolve("완료");

  reject(new Error("…")); // 무시됨
  setTimeout(() => resolve("…")); // 무시됨
});
```

#### <mark style="background: #BBFABBA6;">2. Error 객체와 함께 reject해야 한다.</mark>

#### <mark style="background: #BBFABBA6;">3. 꼭 Promise가 비동기적인 것을 다루지 않아도 된다.</mark>
```js
let promise = new Promise(function(resolve, reject) {
  // 일을 끝마치는 데 시간이 들지 않음
  resolve(123); // 결과(123)를 즉시 resolve에 전달함
});
```
위 방식대로 하면 즉시 이행 상태가 된다.

#### <mark style="background: #BBFABBA6;">4. PromiseState와 PromiseResult는 내부 프로퍼티이기 때문에 직접 접근할 수 있다.</mark>

### <mark style="background: #FFF3A3A6;">소비함수</mark>

소비 함수는 `.then`, `.catch`, `.finally` 메서드를 사용해 등록된다.

#### <mark style="background: #BBFABBA6;">.then</mark>

Promise fulfilled 혹은 rejected가 완료되면 이후에 실행되는 소비함수

```js
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("완료!"), 1000);
});

// resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
promise.then(
  result => alert(result), // 1초 후 "완료!"를 출력
  error => alert(error) // 실행되지 않음
);
```

성공 처리만 하고 싶다면 두번째 인수를 생략하면 된다.

#### <mark style="background: #BBFABBA6;">.catch</mark>

`.then(null, 에러처리함수)` 형태로 에러만을 처리해도 되지만 `.catch`를 활용해서 간결하게 표현할 수 있다.

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// .catch(f)는 promise.then(null, f)과 동일하게 작동합니다
promise.catch(alert); // 1초 뒤 "Error: 에러 발생!" 출력
```

#### <mark style="background: #BBFABBA6;">.finally</mark>

Promise가 처리되면 항상 실행되는 메소드

```js
new Promise((resolve, reject) => {
  /* 시간이 걸리는 어떤 일을 수행하고, 그 후 resolve, reject를 호출함 */
})
  // 성공·실패 여부와 상관없이 Promise가 처리되면 실행됨
  .finally(() => 로딩 인디케이터 중지)
  .then(result => alert(result), error => alert(error));
```

finally는 인수가 없으며 자동으로 다음 핸들러에 결과 혹은 에러를 전달한다.

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("결과"), 2000)
})
  .finally(() => alert("Promise가 준비되었습니다."))
  .then(result => alert(result)); // <-- .then에서 result를 다룰 수 있음

// 2초 후
// "Promise가 준비되었습니다."
// "결과"

new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .finally(() => alert("Promise가 준비되었습니다."))
  .catch(err => alert(err)); // <-- .catch에서 에러 객체를 다룰 수 있음

// "Promise가 준비되었습니다."
// "에러 발생"
```

#### <mark style="background: #BBFABBA6;">실제 사용 예시</mark>

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}
```
위 코드는 콜백 방식이다. onload와 onerror 안에 직접 callback을 박아 넣어서 구현했다.

```js
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

    document.head.append(script);
  });
}
```
Promise를 사용하면 callback 로직을 밖으로 뺄 수 있다. 안으로 넘겨주는 인자만 받을 수 있으며 다음과 같이 사용할 수 있다.

```js
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src}을 불러왔습니다!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('또 다른 핸들러...'));
```

이제 then, catch, finally 메소드를 활용해서 소비 함수만 던져주면 저장된 promise에서 알아서 소비 함수 안에 인자를 넣어서 실행시킨다.

### <mark style="background: #FFF3A3A6;">Promise Chaining</mark>

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107204412.png)

Promise를 연결해서 비동기 작업을 차례대로 처리하는 방법

```js
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)
  
}).then(function(result) { // (**)

  alert(result); // 1
  
  return result * 2;
  
}).then(function(result) { // (***)

  alert(result); // 2
  
  return result * 2;
  
}).then(function(result) {

  alert(result); // 4
  
  return result * 2;
});
```

위의 코드가 가능한 이유는 `.then`이 Promise를 반환하기 때문이다.  `.then`의 리턴값이 해당 Promise의 `result`가 된다.

#### <mark style="background: #BBFABBA6;">또 다른 Promise를 소비 함수 안에서 반환하기</mark>

기본적으로 `.then`이 리턴할 값을 `Promise`로 만들어서 리턴하지만 `.then`에서 `Promise`를 만들어서 리턴시킬 수도 있다.

```js
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

#### <mark style="background: #BBFABBA6;">실제 예시</mark>

```js
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // 불러온 스크립트 안에 정의된 함수를 호출해
    // 실제로 스크립트들이 정상적으로 로드되었는지 확인한다.
    one();
    two();
    three();
  });
```

이제 loadScript를 개선할 수 있다.

Promise의 executor는 즉시 실행되고 다음 메소드로 연결된 소비 함수가 실행되기 때문에 위의 Promise를 리턴하는 함수 loadScript에 바로 메소드를 연결해줘도 된다.

```js
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // 여기서 script1, script2, script3에 정의된 함수를 사용할 수 있다.
      one();
      two();
      three();
    });
  });
});
```

하지만 이는 다른 콜백지옥을 만들게 된다.

이때 가장 내부에 있는 loadScript는 외부 스코프에 전부 접근할 수 있어서 필요에 의해선 위 코드처럼 사용하는 게 좋을 수도 있다.

#### <mark style="background: #BBFABBA6;">참고 사항</mark>

##### <mark style="background: #ABF7F7A6;">thenable</mark>

핸들러(executor, 소비함수 등등)는 Promise가 아닌 `thenable` 객체를 반환하기도 한다.

thenable 객체는 서드파티 라이브러리가 Promise와 호환 가능한 자체 객체를 구현할 수 있다는 점에서 나오게 되었다.

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // 아래 코드에서 alert를 넣었으므로 function() { [native code] }이 바로 일단 나온다.
    // 1초 후 this.num*2와 함께 이행됨
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 1,000밀리 초 후 2를 보여줌
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241110210716.png)

### <mark style="background: #FFF3A3A6;">fetch와 체이닝 함께 응용</mark>

프론트 단에서 네트워크 요청 시 `Promise`를 자주 사용한다.

```js
let promise = fetch(url);
```
위 코드를 실행하면 `url`에 네트워크 요청을 보내고 `Promise`를 반환한다.

fetch는 `resolve`시 `url`로 연결해서 얻은 자원을 핸들러로 넘겨준다.
```js
fetch('/article/promise-chaining/user.json')
  // 원격 서버가 응답하면 .then 아래 코드가 실행됩니다.
  .then(response => {
    // response.text()는 응답 텍스트 전체가 다운로드되면
    // 응답 텍스트를 새로운 이행 Promise를 만들고, 이를 반환합니다.
    return response.text();
  })
  .then(text => {
    // 원격에서 받아온 파일의 내용
    alert(text); // {"name": "Violet-Bora-Lee", "isAdmin": true}
  });
```
1. 원격 서버가 헤더와 함께 응답을 보내면 `Promise`는 `response` 객체와 함께 `fulfilled`된다.
2. `response` 전체가 완전히 다운로드되기 전에 Promise는 `fulfilled`가 된다.
3. `response`가 다 다운로드 되고 전체를 읽기 위해서는 `response.text()`를 호출해야 한다. ( `response.text()`는 서버에서 전송한 텍스트 전체가 다운로드되면 이 텍스트를 `result`값으로 갖는 `fulfilled`된 `Promise`를 반환한다. )

`response.json()`을 사용하면 데이터를 읽고 `JSON`으로 파싱할 수 있다.
```js
// 위 코드와 동일한 기능을 하지만, response.json()은 원격 서버에서 불러온 내용을 JSON으로 변경해줍니다.
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // Violet-Bora-Lee, 이름만 성공적으로 가져옴
```

`fetch`를 순차적으로 보내는 예시를 확인해보자.
```js
// user.json에 요청을 보냅니다.
fetch('/article/promise-chaining/user.json')
  // 응답받은 내용을 json으로 불러옵니다.
  .then(response => response.json())
  // GitHub에 요청을 보냅니다.
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // 응답받은 내용을 json 형태로 불러옵니다.
  .then(response => response.json())
  // 3초간 아바타 이미지(githubUser.avatar_url)를 보여줍니다.
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

만약 마지막 then에서 무언가를 더 하고 싶다면 `Promise`를 리턴해주면 된다.
```js
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (**)
    }, 3000);
  }))
  // 3초 후 동작함
  .then(githubUser => alert(`${githubUser.name}의 이미지를 성공적으로 출력하였습니다.`));
```

위의 코드는 다음과 같이 정리해서 가독성을 높일 수 있다.
```js
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// 함수를 이용하여 다시 동일 작업 수행
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

결론적으로 Promise Chaining은 다음의 구조이다.

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107212119.png)

### <mark style="background: #FFF3A3A6;">Promise와 Error Handling</mark>

```js
// 없는 url일 경우
fetch('https://no-such-server.blabla') // 거부
  .then(response => response.json())
  .catch(err => alert(err)) 
  // TypeError: failed to fetch ( 출력되는 내용은 다를 수 있음 )
```

`Promise`가 거부되면 제어 흐름이 제일 가까운 `rejection` 핸들러로 넘어간다.

```js
// JSON의 형식이 잘못되면
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));
```

체인 끝에 catch를 붙이면 위쪽 Promise 중 하나라도 거부되면 해당 catch가 에러를 잡게 된다.

#### <mark style="background: #BBFABBA6;">암시적 try...catch</mark>

`Promise executor`와 `Promise` 핸들러 코드 주위에는 암시적 `try...catch`가 존재한다. 예외가 발생하면 암시적 `try...catch`에서 예외를 잡고 이를 `reject`처럼 다룬다.

```js
// 아래 두 코드는 같은 기능을 한다.
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
}).catch(alert); // Error: 에러 발생!

new Promise((resolve, reject) => {
  reject(new Error("에러 발생!"));
}).catch(alert); // Error: 에러 발생!
```

`throw`를 사용해서 에러를 던지면 이 자체가 거부된 `Promise`를 의미하게 된다.

```js
new Promise((resolve, reject) => {
  resolve("OK");
}).then((result) => {
  throw new Error("에러 발생!"); // Promise가 거부됨
}).catch((error)=>{ alert(error); return 3}); // Error: 에러 발생!
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241110214430.png)

해당 암시적 `try... catch`는 핸들러 위쪽에서 발생한 비정상 에러 또한 잡는다.

```js
new Promise((resolve, reject) => {
  resolve("OK");
}).then((result) => {
  blabla(); // 존재하지 않는 함수
}).catch(alert); // ReferenceError: blabla is not defined
```

단 동기적 에러가 암시적 `try...catch`에서 처리되는 것이다. 다음과 같이 비동기 코드가 executor 내부에 존재하고 내부에 에러가 발생한다면 해당 에러를 감지할 수 없다.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("에러 발생!");
  }, 1000);
}).catch(alert);
```

#### <mark style="background: #BBFABBA6;">다시 던지기</mark>

`.catch`가 정상적으로 종료되면 `fulfilled`인 `Promise`를 리턴할 것이다. 그래서 다음과 같은 로직이 가능하다.

```js
// 실행 순서: catch -> then
new Promise((resolve, reject) => {

  throw new Error("에러 발생!");

}).catch(function(error) {

  alert("에러가 잘 처리되었습니다. 정상적으로 실행이 이어집니다.");
  // catch 이후 리턴되는 fulfilled상태의 Promise가 .then을 만난다.
}).then(() => alert("다음 핸들러가 실행됩니다."));
```

위를 활용해서 에러 핸들링을 세분화시킬 수 있다.

```js
// 실행 순서: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("에러 발생!");

}).catch(function(error) { // (*)

// URIError만 처리하는 소비 함수
  if (error instanceof URIError) {
    // 에러 처리
  } else {
    alert("처리할 수 없는 에러");

    throw error; // URIError가 아닐 경우 다음 에러 핸들러로 전달
  }

}).then(function() {
  /* 여기는 실행되지 않습니다. */
}).catch(error => { // (**)

  alert(`알 수 없는 에러가 발생함: ${error}`);
  // 반환값이 없음 => 실행이 계속됨

});
```

#### <mark style="background: #BBFABBA6;">처리되지 못한 거부</mark>

```js
new Promise(function() {
  noSuchFunction(); // 존재하지 않는 함수를 호출하기 때문에 에러가 발생함
})
  .then(() => {
    // 성공상태의 Promise를 처리하는 핸들러. 한 개 혹은 여러 개가 있을 수 있음
  }); // 끝에 .catch가 없음!
```

예외를 처리해 줄 핸들러가 없으면 에러가 갇혀 버린다.

`try...catch`에서 일반적인 에러가 발생하고 이를 처리하지 못했을 때 스크립트가 죽고 콘솔 창에 메시지가 출력되는데 
`rejected Promise`가 처리되지 않아도 동일한 일이 발생한다.

JS 엔진은 `Promise reject`를 추적하다가 에러가 갇힌 걸 확인하면 전역 에러를 생성한다.

브라우저에서는 `unhandledrejection` 이벤트로 이런 에러를 처리한다. (HTML 명세서에 정의된 표준 이벤트이다.)

```js
window.addEventListener('unhandledrejection', function(event) {
  // unhandledrejection 이벤트엔 두 개의 특수 프로퍼티가 있습니다.
  alert(event.promise); // [object Promise] - 에러를 생성하는 Promise
  alert(event.reason); // Error: 에러 발생! - 처리하지 못한 에러 객체
});

new Promise(function() {
  throw new Error("에러 발생!");
}); // 에러를 처리할 수 있는 .catch 핸들러가 없음
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241107214313.png)

### <mark style="background: #FFF3A3A6;">Promise API</mark>

#### <mark style="background: #BBFABBA6;">Promise.all</mark>

여러 개의 Promise를 동시에 실행시키고 모든 Promise가 준비될 때까지 기다린다.

```js
// let promise = Promise.all([...promises...]);
// Promise인 배열을 받고 새로운 Promise를 반환한다.

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // Promise 전체가 처리되면 1, 2, 3이 반환됩니다. 각 Promise는 배열을 구성하는 요소가 됩니다.
```

각 Promise 요청이 다 끝나면 배열의 순서에 따라서 결과 값이 또 다른 배열 형태로 소비 함수로 전달된다.

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108150808.png)

`fetch`는 인수에 존재하는 url에 요청을 보내서 `response`를 `Promise` 형태로 리턴하는 함수이다. 이를 활용한 예제를 살펴보면

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/Violet-Bora-Lee',
  'https://api.github.com/users/jeresig'
];

// fetch를 사용해 url을 Promise로 매핑합니다.
let requests = urls.map(url => fetch(url));

// Promise.all은 모든 작업이 이행될 때까지 기다립니다.
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108151347.png)

`Promise.all`을 이용해서 요청 응답을 배열로 받은 후 그 배열을 다시 `Promise.all`을 이용해서 `json()`으로 파싱, 다음 소비 함수에서 해당 파싱된 데이터를 콘솔 창에 띄우는 로직이다.

결론적으로  다음과 같이 중간에 소비 함수의 로직을 늘릴 수도 있다.
```js
let names = ['iliakan', 'Violet-Bora-Lee', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // 모든 응답이 성공적으로 이행되었습니다.
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200입니다.
    }

    return responses;
  })
  // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽습니다.
  .then(responses => Promise.all(responses.map(r => r.json())))
  // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장됩니다.
  .then(users => users.forEach(user => alert(user.name)));
```

##### <mark style="background: #ABF7F7A6;">Promise.all의 에러 핸들링</mark>

내부 배열에서 하나라도 rejected가 일어나면 전체를 에러라고 판단한다.
```js
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: 에러 발생!
```

> **Promise rejected가 일어나도 호출은 계속 일어난다.**
> 
> 별도의 처리 (AbortController) 가 없다면 Promise rejected가 일어나도 다른 Promise 처리가 취소되진 않는다. 단, 결과는 무시된다.
> ![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108152428.png)
> 
> 위 예시는 rejected되는 Promise를 배열에 넣고 Promise.all을 돌린 예시이다. 
> 첫 번째 인수인 Promise가 rejected되어 전역 에러가 일어났다. (catch 메소드가 뒤에 없으므로) 
> 이때 네트워크 요청에서 보면 fetch 자체는 일어난 것을 확인할 수 있다.
> 
> ![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108152443.png)

> **Promise.all의 인수에 있는 배열**
> 
> 해당 배열은 꼭 Promise 객체가 아니어도 된다. 밑의 예시처럼 숫자를 넣을 수도 있는데 이때는 해당 숫자를 그대로 소비 함수로 전달한다.
```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

#### <mark style="background: #BBFABBA6;">Promise.allSettled</mark>

Promise.all은 하나라도 에러가 나면 전부 결과를 못 받는다.

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render 메서드는 fetch 결과 전부가 있어야 제대로 동작합니다.
```
위 예시와 같이 html, css, json이 전부 필요한 render 함수가 소비 함수일 경우 유용하다.

`.allSettled`는 하나가 에러가 나더라도 다른 요청을 받을 수 있게 하려고 태어났다.
1. 응답이 성공하였을 때 – `{status:"fulfilled", value:result}`
2. 에러가 발생하였을 때 – `{status:"rejected", reason:error}`

```js
Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
        // 응답이 성공하면 결과가 value 프로퍼티 안에 들어가게 된다.
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
        // 에러가 발생하면 에러 객체가 reason 프로퍼티 안에 들어가게 된다.
      }
    });
  });
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108154631.png)

#### <mark style="background: #BBFABBA6;">Promise.race</mark>

Promise.all과 유사하게 Promise 배열 전체를 처리하지만 가장 먼저 처리되는 Promise의 결과를 반환한다.
```js
//let promise = Promise.race(iterable);

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

#### <mark style="background: #BBFABBA6;">Promise.resolve와 Promise.reject</mark>

resolve와 reject 메소드는 async/ await의 등장으로 잘 사용되지 않는다. 하지만 추후 나올 폴리 필을 이해하기 위해서라도 필요하기에 한번 알아보도록 하자.
( `async function`은 리턴값을 무조건 Promise로 꺼내고 내부에 throw Error해주면 rejected 상태의 Promise를 리턴한다. )

##### <mark style="background: #ABF7F7A6;">Promise.resolve</mark>

Promise.resolve(value)는 결과값이 value인 fulfilled한 Promise를 생성한다.

```js
// let promise = new Promise(resolve => resolve(value));

let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

`loadCached`는 `fetch`를 할 때 `cache`에 해당 데이터를 저장해두고 다음에 같은 요청을 보냈을 때 `cache`에서 꺼내서 전달한다.
이때 `Promise.resolve`를 이용해서 `loadCached`가 항상 `Promise`를 반환한다는 걸 정해둬서 사용하는 단에서는 `loadCached` 함수에 `.then/catch` 등의 메소드를 통해서 소비 함수를 넣을 수 있게 된다.

###### <mark style="background: #ADCCFFA6;">Promise.resolve를 이용한 Promise allSettled의 폴리필</mark>

allSettled는 나온 지 얼마 안 되어서 구식 브라우저에서는 폴리 필이 필요하다.

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value
    }), reason => ({ // then의 두 번째 인수이다. then의 두 번째 인수는 error 핸들러이다. (catch와 같음.)
      status: 'rejected',
      reason
    }))));
  };
}
```

##### <mark style="background: #ABF7F7A6;">Promise.reject</mark>

`Promise.reject(error)`는 결과값이 `error`인 `rejected Promise`를 반환한다.

```js
let promise = Promise.reject(error);ㄴ
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108160624.png)

### <mark style="background: #FFF3A3A6;">Fetch: Abort</mark>
> 글 흐름을 위해 Promise 파트에 넣어놓긴 했지만 엄밀히 말하면 Promise API는 아니다.

Promise.all 에서도 에러 발생시 Promise 결과는 무시되나 호출은 막을 수 없다고 하였다.
AbortController라는 빌트인 객체를 활용하면 Promise 호출 자체를 막을 수 있다.

#### <mark style="background: #BBFABBA6;">AbortController Object</mark>

```js
let controller = new AbortController();
```

AbortController는 프로퍼티 하나, 메소드 하나를 갖고 있다.

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108161157.png)

1. `signal`은 프로토타입 체인을 가치지 않고 바로 인스턴스에서 찾을 수 있으며 `event listener`를 세팅할 수 있는 프로퍼티이다.
2. `abort`는 프로토타입 체인을 이용해서 `AbortController`에 있는 메소드를 가져오는 것이며 `abort`가 실행되면 다음의 과정이 일어난다.
	1. instance.signal이 "abort" event를 발생시킨다.
	2. instance.signal.aborted가 true가 된다.

따라서 signal에 취소 가능한 작업을 리스너로 달아 놓고
abort() 함수로 취소하는 것이다.

```js
let controller = new AbortController();
let signal = controller.signal;

// 취소가능한 작업을 수행하는 곳에 signal 객체를 주고, controller.abort()가 실행되면 실행될 리스너를 세팅한다.
signal.addEventListener('abort', () => alert("abort!"));

// 아래 코드를 어떤 곳에 넣어서 원할 때 실행할 수 있도록 한다.
controller.abort(); // abort!

// abort event가 트리거되면 aborted가 true로 바뀐다.
alert(signal.aborted); // true
```

다른 event를 구현해서 동일 기능을 만들어서 fetch와 쓸 수도 있지만, 내부적으로 fetch는 `AbortController`를 인식하기 때문에 `AbortController`를 사용하는 것이 좋다.

#### <mark style="background: #BBFABBA6;">fetch와 함께 사용</mark>

`fetch` 옵션에 `signal`이라는 프로퍼티가 존재한다.

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

이제 이전과 같이 `controller.abort()` 함수로 `fetch` 요청을 제어해주면 된다.

> 단, fetch가 abort하는 시기보다 더 빨리 끝나면 이미 나온 결과를 없애진 않는다.

#### <mark style="background: #BBFABBA6;">AbortController는 확장성 있다.</mark>

```js
let urls = [...]; // a list of urls to fetch in parallel

let controller = new AbortController();

// an array of fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// if controller.abort() is called from elsewhere,
// it aborts all fetches
```

위와 같이 `signal`로 하나의 `controller`를 등록해두면 등록된 모든 `fetch`가 하나의 `controller`의 신호를 따르게 된다.

또한 `Promise`와 함께 사용할 수 있으며 `Promise.all`을 통해서 `fetch`와 해당 `Promise`를 결합할 수도 있다.
```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // our task
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from elsewhere,
// it aborts all fetches and ourJob
```

### <mark style="background: #FFF3A3A6;">Promisification</mark>

콜백을 받는 함수를 Promise를 반환하는 함수로 바꾸는 것을 `Promisification` 이라고 한다.

```js
function loadScript(src, callback){
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}

// 사용법:
// loadScript('path/script.js', (err, script) => {...})
```
위 함수는 콜백 함수를 활용한 함수로써 이를 `Promisification` 해보자.

src라는 인수를 받아야 되고 콜백을 받지 않고 사용하는 단에서 제어할 수 있어야 한다.
```js
function loadScriptPromise = (src)=>{
  return new Promise((resolve, reject)=>{
    // 여기서 (err, script)=>{...} 이건 위의 코드에서 보면 기존의 사용법에서 쓰이는 콜백 함수이다.
    // 콜백 함수가 내부로 숨겨진 것일 뿐이다.
    loadScript(src,(err, script)=>{
	  if (err) reject(err);
	  else resolve(script);
    })
  })
}

// 사용법:
// loadScriptPromise('path/script.js').then(...)
```

이러한 `Promisification` 은 하나의 함수에서만 쓸 수 있다. 이를 확장성 있게 하려면 헬퍼 함수를 만들어 보자.

헬퍼 함수는 함수 `f`를 받아서 래퍼 함수를 반환해야 한다.
```js
function promisify(f) {
  return function (...args) { // 래퍼 함수를 반환함
    return new Promise((resolve, reject) => {
      function callback(err, result) { 
      // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 위에서 만든 커스텀 콜백을 함수 f의 인수 끝에 추가합니다.

      // 처음 promisify를 선언할 때 넣었던 함수를 가져와서
      // 호출할 때의 this, 그리고 호출할 때 넣은 args를 가져와서 실행시킨다.
      f.call(this, ...args); // 기존 함수를 호출합니다.
    });
  };
};

// 사용법:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

위 코드에서 여러 인수를 처리하기 위해선 다음과 같은 리팩토링이 필요하다.
```js
// 콜백의 성공 결과를 담은 배열을 얻게 해주는 promisify(f, true)
function promisify(f, manyArgs = false) { // args 다수 여부 확인
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          // args 다수 여부로 판단해서 리턴될 Promise의 result에 하나만 넣을지 여러 개 넣을지 판단
          resolve(manyArgs ? results : results[0]);
        }
      }
      
      args.push(callback);
      
      f.call(this, ...args);
    });
  };
};

// 사용법:
// 여기서 promisify에 들어가는 f는 여러 인수가 필요하고 콜백이 마지막 인수로 들어가는 함수이다.
// f(arg1, arg2, ..., (err, ...results)=>{});
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

> 단, `Promisification` 은 콜백을 완전히 대체하지는 못한다. 콜백은 여러 번 호출할 수 있고 Promise는 하나의 결과만 가질 수 있기 때문이다. (Promisification한 함수의 콜백을 여러 번 호출해도 두 번째부터는 무시된다.)

사실 이를 미리 처리해주는 `promisify` 라이브러리나 `Node.js` 내장 함수가 존재한다.

### <mark style="background: #FFF3A3A6;">Microtask</mark>

`Promise` 핸들러 (`.then/catch/finally`)는 항상 비동기적으로 실행된다.

`Promise`가 즉시 이행돼도 `.then/catch/finally` 아래에 있는 코드들은 이 핸들러가 실행되기 전에 실행된다.
```js
let promise = Promise.resolve();

promise.then(() => alert("Promise 성공!"));

alert("코드 종료");

// 결과
// alert("코드 종료");
// alert("Promise 성공!");
```

#### <mark style="background: #BBFABBA6;">Microtask Queue</mark>

비동기 작업을 처리하려면 적절한 관리가 필요하다.
이를 위해 ECMA에선 `PromiseJobs`라는 내부 큐(`Internal Queue`)를 명시한다. ( `V8`엔진에서 이를 `Microtask Queue` 라고 부르기 때문에 `Microtask Queue`를 더 자주 쓴다. )

`Microtask Queue`는 다음처럼 동작한다.
1. 먼저 들어온 작업을 먼저 실행한다. (`FIFO`)
2. 실행할 것이 아무것도 남아있지 않을 때만 큐에 있는 작업이 실행되기 시작한다.

요약하면 어떤 `Promise` 가 준비되었을 때 이 `Promise`의 `.then/catch/finally` 핸들러는 큐에 들어가게 되며 여전히 실행되지 않는다.

이후 현재 코드에서 자유로운 상태가 되었을 때 자바스크립트 엔진은 큐에서 작업을 꺼내 실행한다.

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108195640.png)

`Promise` 핸들러는 항상 내부 큐(`Promise jobs`이자 `Microtask Queue`)를 통과하게 된다.

여러 개의 `.then/catch/finally`를 사용해 만든 체인의 경우, 각 핸들러는 비동기적으로 실행된다. 큐에 들어간 핸들러 각각은 현재 코드가 완료되고, 큐에 들어있는 이전 핸들러의 실행이 완료되었을 때 실행된다.

```js
Promise.resolve()
  .then(()=> alert("Promise Fulfilled"))
  .then(()=> alert("finish"));
```
위와 같이 하면 비동기 동작을 차례대로 진행할 수 있다.

#### <mark style="background: #BBFABBA6;">처리되지 못한 거부</mark>

`unhandledrejection` 이벤트는 `Promise`를 실행할 때 `.catch` 없이 에러가 전달돼서 전역 에러가 난 것을 의미한다.

```js
let promise = Promise.reject(new Error("Promise 실패!"));

// Promise 실패!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

> **unhandled rejection**
> 
> 자바스크립트 엔진은 처리되지 못한 거부(unhandled rejection)를 찾을 때 `Microtask Queue`를 확인한다. 
> Microtask Queue 끝에 Promise error가 처리되지 못할 때 발생한다.

##### <mark style="background: #ABF7F7A6;">만약 catch를 나중에 처리한다면</mark>

```js
let promise = Promise.reject(new Error("Promise 실패!"));
setTimeout(() => promise.catch(err => console.log('잡았다!')), 1000);

// Error: Promise 실패!
window.addEventListener('unhandledrejection', event => console.log(event.reason));
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108205243.png)

`unhandledrejection`의 핸들러 함수 > rejected Promise 있다고 알림 > catch 소비 함수
순서인 것을 확인할 수 있다.

이는 다음의 과정 때문에 그러하다.
1. 현재 `Macrotask`가 끝나면 (`window.addEventListener`까지 다 끝나고 나면) `Microtask Queue`를 확인한다.
2. `unhandledrejection`은 `Microtask Queue`에 있는 작업이 `rejected`된 상태로 남아있을 때 발동된다. 즉 `rejected Promise` 상태로 남아 있는 것을 발견하고 `unhandledrejection`을 발동시킨다.
3. 등록된 핸들러 `(console.log(event.reason))` 실행
4. `Web API`에서 `1,000ms`가 끝나고 `setTimeout`의 콜백 함수 `( ()=>promise.catch(()=>console.log('잡았다!')) )`가 `Macrotask Queue`로 이동된다.
5. `()=>promise.catch(()=>console.log('잡았다!'))`를 실행해서 `promise.catch(()=>console.log('잡았다!')` 리턴한다. 
6. `rejected Promise`가 담겨있는 변수 `promise`를 `.catch`핸들러로 찍었기에 `()=>console.log('잡았다!')`를 `Microtask Queue`로 이동시킨다. 
7. 이동이 끝나면 `Macrotask` 하나가 끝났으니 `Microtask Queue`를 비워질 때까지 실행한다. 여기서 `()=>console.log('잡았다!')`가 실행된다.

### <mark style="background: #FFF3A3A6;">Event Loop, Macrotask, Microtask</mark>

`Node.js`와 마찬가지로 브라우저 측 자바스크립트 실행 흐름도 `Event Loop`에 기반을 둔다.

`Event Loop`를 잘 알고 있어야 올바른 아키텍처 설계가 가능하다.

#### <mark style="background: #BBFABBA6;">Event Loop</mark>

task가 들어오길 기다렸다가 task가 들어오면 처리하고 처리할 task가 없는 경우엔 잠드는, 끊임없이 돌아가는 자바스크립트 내 Loop이다.

자바스크립트 엔진은 다음의 알고리즘을 갖고 있다.
1. 처리해야 할 task가 있는 경우
	1. 먼저 들어온 task부터 차례대로 처리한다.
2. 처리해야 할 task가 없는 경우
	1. 잠들어 있다가 새로운 task가 추가되면 다시 1로 돌아간다.

자바스크립트 엔진은 대부분 시간을 아무런 일도 하지 않고 쉬다가 스크립트나 핸들러, 이벤트가 활성화될 때만 돌아간다.

자바스크립트 엔진을 활성화하는 task는 다음과 같다.
1. 외부 스크립트 `<script src="...">`가 로드될 때, 이 스크립트를 실행하는 것
2. 사용자가 마우스를 움직일 때 `mousemove` 이벤트와 이벤트 핸들러를 실행하는 것
3. `setTimeout`에서 설정한 시간이 다 된 경우, 콜백 함수를 실행하는 것
4. 기타 등등

task는 하나의 집합을 이룬다. 자바스크립트 엔진은 해당 task를 차례대로 처리하며 새로운 task가 추가될 때까지 기다린다. task를 기다리는 동안 CPU 자원 소비는 0에 가까워지고 엔진은 잠들게 된다.

엔진이 바쁠 때 task가 추가되면 해당 task는 **Macrotask queue**에 추가된다.

> `task queue`는 자료구조의 `queue`가 아닌 `set`이다. 선택된 큐에서 실행 가능한 가장 오래된 task를 가져온다.
> 무조건 먼저 들어온 첫번째 큐를 `dequeue`하는 것이 아니라 실행 가능한 것들 중에 가장 오래된 task를 차례대로 실행시킨다.
>
> https://html.spec.whatwg.org/multipage/webappapis.html#definitions-3

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241108212123.png)

(`script`를 처리하는데 중간에 `mousemove` 핸들러도 실행되고 `setTimeout`에서 설정한 시간이 지나서 콜백이 들어온 경우의 상태를 그림으로 나타냄)

JavaScript 엔진은 이들을 차례대로 처리한다.

이때 알아야 할 두가지는
1. 엔진이 task를 처리하는 동안은 렌더링이 일어나지 않는다. 처리를 완료하면 DOM 변경을 화면에 반영한다.
2. task에 긴 시간이 걸리면 task를 처리하는 동안 발생한 새로운 task를 처리하지 못한다. ( 응답 없는 페이지라는 alert 창은 페이지 전체와 함께 해당 task를 최소시킬지 말지를 선택하게 한다. )
#### <mark style="background: #BBFABBA6;">예시 1: CPU 소모가 많은 task 쪼개기</mark>

CPU 소모가 아주 많은 task 하나가 있다고 가정해보자.

```js
let i = 0;

let start = Date.now();

function count() {

  // CPU 소모가 많은 무거운 작업을 수행
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("처리에 걸린 시간: " + (Date.now() - start) + "ms");
}

count();
```
1e9 (0이 9개)을 센 다음 alert를 하는 코드인데 해당 count()가 실행되는 동안 브라우저는 사용자 이벤트 처리나 DOM 관련 작업을 완전히 멈추게 되는 것을 확인할 수 있다.
( 실행시키고 페이지에 마우스 우클릭을 하면 alert가 나올때까지 아무것도 안 보이다가 alert가 나오고 마우스 우클릭시 나오는 메뉴가 나온다. )

코드를 쪼개서 이를 개선해보자.
```js
let i = 0;

let start = Date.now();

function count() {

  // 무거운 작업을 쪼갠 후 이를 수행 (*)
  do {
    i++;
	// 2* 1e6, 3* 1e6 등 1e6의 배수에서 do while 문을 나가게 된다.
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    // 위의 do while문을 1e3번 반복하면 도착
    alert("처리에 걸린 시간: " + (Date.now() - start) + "ms");
  } else {
    // 1e6의 배수이지만 1e9가 아닐 경우
    setTimeout(count); // 새로운 호출을 스케줄링 (**)
  }

}

count();
```

do while문을 1e3번 반복해서 alert가 나오게 되는데 그 이전까지 setTimeout으로 count를 넘기기 때문에 동기적인 코드들은 돌아갈 수 있게 되고 이 때문에 이벤트 핸들러, DOM 관련 동작 들을 해결할 수 있게 된다.

위 코드는 사실 조금의 시간차가 존재한다. 다음처럼 setTimeout을 앞으로 끌어오면 이를 해결할 수 있다.
```js
let i = 0;

let start = Date.now();

function count() {

  // 스케줄링 코드를 함수 앞부분으로 옮김
  if (i < 1e9 - 1e6) {
    setTimeout(count); // 새로운 호출을 스케줄링함
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("처리에 걸린 시간: " + (Date.now() - start) + "ms");
  }

}

count();
```

부분 카운팅 (`do...while`)이 일어나기 전에 부분 재스케줄링(`setTimeout`)이 일어나게 된다.

setTimeout 호출이 많은 경우, 브라우저 최소 대기 시간이 4밀리초이기 때문에 숫자 세기 전에 스케줄링을 하면 숫자를 세면서 대기 시간을 소모하기 때문에 실행이 더 빨라진다.
(setTimeout 로직이 뒤쪽에 있으면 setTimeout(count) 실행되고 바로 다음 macrotask로 count 함수가 실행돼야 되는데 안 가고 4ms 있다가 실행된다는 뜻)

#### <mark style="background: #BBFABBA6;">예시 2: Progress bar</mark>

task를 여러 개로 쪼갤 때의 장점은 진행 상태를 나타내주는 `progress bar`를 만들 때도 드러난다.

```js
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

브라우저는 시간이 오래 걸리든 아니든 상관 없이 현재 작업 중인 task가 끝나야 DOM 변경분을 화면에 렌더링한다.

그래서 위의 코드는 `progress bar`의 기능을 완수하지 못한다. i가 전부 지나가야(현재 작업 중인 task가 끝나야) DOM을 렌더링하기 때문이다.

```js
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // 무거운 작업을 쪼갠 후 이를 수행
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```
위처럼 코드를 분할하게 되면 i가 변화하는 과정을 출력해 줄 수 있다, `setTimeout`으로 `count`를 넘기기 때문에 count와 count 함수 사이에서 동기적인 동작들을 수행할 수 있게 되고 결론적으로 `progress.innerHTML`이 변경되었다는 DOM 변경 동작이 일어나게 된다.

#### <mark style="background: #BBFABBA6;">예시 3: 이벤트 처리가 끝난 이후에 작업</mark>

이벤트 핸들러를 만들 때 특정 액션을 모든 이벤트 버블링이 끝나고 실행시키고 싶다면 `ms`가 0인 `setTimeout`을 사용하면 된다.

```js
menu.onclick = function() {
  // ...

  // 클릭한 메뉴 내 항목 정보가 담긴 커스텀 이벤트 생성
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

  // 비동기로 커스텀 이벤트를 디스패칭
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

위를 살펴보면 "menu-open" 이라는 커스텀 이벤트를 만든 후 해당 이벤트를 setTimeout으로 넘겼다.

이제 menu의 click 이벤트가 완전히 핸들링된 후에 `menu-open` 이벤트를 dispatching하게 된다.

### <mark style="background: #FFF3A3A6;">Macrotask와 Microtask</mark>

#### <mark style="background: #BBFABBA6;">Microtask</mark>

`Microtask`는 주로 `Promise`를 사용해 만든다.

`Promise`와 함께 쓰이는 `.then/catch/finally`의 핸들러 (소비 함수)가 `Microtask`가 된다. 또는 `Promise`를 핸들링하는 `await`를 사용해 만들기도 한다.

> 이 외에도 표준 API인 `queueMicrotask(func)`를 사용해서 함수 `func`를 `Microtask Queue`에 넣어서 처리할 수 있다.

> 자바스크립트 엔진은 **Macrotask**를 하나 처리할 때마다 js 엔진은 다른 `Macrotask`를 수행하거나 렌더링하는 등의 작업을 하기 전에 **Microtask Queue**에 있는 모든 task를 실행한다.

```js
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");

// (현재 호출 스택에서 script 태그에 있는 코드를 읽는 Macrotask중이며 코드를 한 줄씩 넣으면서 실행 중에 있음)
// 1. setTimeout(()=>alert("timeout")) - 호출 스택에서 실행, ms가 지나면 콜백 함수를 Macrotask queue에 등록
// 2. Promise.resolve().then(()=>alert("promise")) - 콜백 함수를 Microtask Queue에 등록
// 3. alert("code") - 바로 호출된다. (현재 script 태그를 읽는 Macrotask를 수행 중이다.)
// 4. script 태그에 있는 코드를 읽는 Macrotask 종료
// 5. Microtask queue에 있는 then() 콜백 함수 실행 (호출 스택으로 이동해서 실행, 이 과정에서 이벤트 루프는 다 비워질 때까지 안 돌아감)
// 6. Microtask queue 비워짐
// 7. ()=>alert("timeout") - 다음 Macrotask 실행 (호출 스택에서 Macrotask 하나 이동) 
// (해당 Macrotask가 끝나면 다시 Microtask 실행해서 Microtask queue 비우고 렌더링 > 다음 Macrotask 실행 반복)
```

#### <mark style="background: #BBFABBA6;">처리 로직</mark>

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241109193930.png)

`Macrotask (script, mousemove, setTimeout 등)` 하나가 처리되고 난 후 `Microtask` 전부가 처리되고 그 이후 렌더링이 진행되는 것을 확인할 수 있다.

**Microtask는 다른 이벤트 핸들러나 렌더링 작업, 혹은 다른 Macrotask가 실행되기 전에 처리된다.**

script 태그에 있는 코드를 읽는 작업도 `Macrotask`이기 때문에 script 코드를 한 줄씩 호출 스택에 담고 실행하는 과정이 끝난 후에 Microtask들을 실행한다.

이런 처리순서가 아주 중요한 이유는 마우스 좌표 변경이나 네트워크 통신에 의한 데이터 변경같이 애플리케이션 환경에 변화를 주는 작업에 영향을 받지 않고 모든 `Microtask`를 동일한 환경에서 처리할 수 있기 때문이다.

"현재 실행 중인 macrotask 실행이 끝나면 > 현재 존재하는 모든 microtask 실행 > 렌더링 > 다음 macrotask 실행" 의 순서를 가진다.

위 과정을 확인하기 위해서 리페인트 전에 콜백 함수를 호출하는 **requestAnimationFrame**으로 확인해보자.

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241109221737.png)

> **requestAnimationFrame**
> 
> ![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241109214448.png)
> 
> 브라우저 리페인트 전에 애니메이션 처리를 하기 위해 사용하는 윈도우 메소드, 별도의 큐에서 관리되어 프레임 단위로 렌더링할 수 있도록 보장한다. ( 초당 프레임 기준은 모니터 주사율에 의해 설정된다. )
> 
> 프레임 단위의 렌더링을 보장하기 때문에 애니메이션 동작이 더 부드러워진다.

만약 임의로 특정 함수를 `Microtask Queue`로 보내고 싶다면 `queueMicrotask` 함수를 사용하면 된다. 
( `setTimeout`과 다른 점은 만약 `ms`가 0초인 `setTimeout`을 이용할 때는 `Macrotask queue`로 보내져서 기존의 `Microtask Queue`가 다 끝나고 다음 `Macrotask`가 실행될 때 특정 함수가 실행될 것이다.)
```js
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    // 무거운 작업을 쪼갠 후 이를 수행
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);
    
    if (i < 1e6) {
      queueMicrotask(count);
    }
  }

  count();
</script>
```

렌더링이 되기 전에 Microtask Queue에 있는 count 함수가 재귀 호출을 하며 Microtask Queue에 새로운 count 함수를 추가하는 방식이므로 실제 화면에는 최종값만 보이게 된다. ( microtask queue가 비워져야 브라우저 렌더링이 일어남. )

다음 예제를 통해 확실히 알아가보자.
```js
// sync, macro, micro 원소 안에 숫자가 있고 button으로 이들을 제어한다고 가정.
button.addEventListener('click',()=>{
	for (let i =0; i<=100000; i++){
		sync.innerHTML = i;
		
		setTimeout(()=>{
			macro.innerHTML = i;
		},0)
		
		queueMicrotask(()=>{
			micro.innerHTML = i;
		})
	}
})
```

위 핸들러를 실행시키면 다음의 결과가 나온다.
1. `sync`는 렌더링이 일어나지 않다가 100,000 상태가 된다.
2. `micro`는 렌더링이 일어나지 않다가 100,000 상태가 된다.
3. `macro`는 잠시 기다리다가 1부터 100,000까지 차례대로 렌더링된다.

![](https://codefug.github.io/assets/images/2024-11-10/macro%20task,%20micro%20task,%20call%20stack_241110_031903_1.jpg)

이때 차례대로 실행되는 코드들(`sync.innerHTML = i`, `setTimeout`, `queryMicrotask`) 이 실행되고 있을 때는 브라우저에서 다른 동작을 할 수 없다. ( 콜 스택에 있는거 다 버리고 동작을 진행할 수는 없으니 )

> `setTimeout`의 타이밍 함수 (시간을 새서 콜백을 던져주는 함수)는 `Macrotask queue`가 할당해주는 외부 쓰레드에서 진행되는데 대표적으로 브라우저의 `Web API`가 있다.

![](https://codefug.github.io/assets/images/2024-11-10/macro%20task,%20micro%20task,%20call%20stack_241110_031903_2.jpg)
![](https://codefug.github.io/assets/images/2024-11-10/macro%20task,%20micro%20task,%20call%20stack_241110_031903_3.jpg)

단, 만약 중간에 다른 `Macrotask`(마우스 이벤트 등등)가 `Macrotask queue`로 들어와서 먼저 실행 가능 상태가 된다면 `queue`에서는 해당 `Macrotask`를 처리할 것이다.
# <mark style="background: #FF5582A6;">async, await</mark>

`Promise`를 편하게 사용하기 위해 `async`, `await` 문법이 존재한다.

## <mark style="background: #FFB86CA6;">async function</mark>

```js
async funciton f(){
	return 1;
}
```

`function` 앞에 `async`를 붙이면 해당 함수는 항상 Promise를 반환한다.
만약 Promise가 아닌 값을 반환하더라도 fulfilled 상태의 Promise로 값을 감싸서 반환한다.
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241110152440.png)

즉 다음의 코드들은 같은 기능을 한다.
```js
async funciton f1(){
	return 1;
}

async funciton f2(){
	return Promise.resolve(1);
}
```

## <mark style="background: #FFB86CA6;">await</mark>

```js
// await는 async function 안에서만 동작한다.
let value = await promise;
```

`await` 키워드를 만나면 Promise가 처리될 때까지 기다린다. `await`키워드 아래에 있는 동일 블록의 코드들은 `Microtask Queue`로 이동한다. ( 기능적으로 `.then`으로 넘기는 것과 같다. )

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // Promise가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```

Promise가 처리될 때까지 기다리는 동안 엔진은 다른 일(다른 스크립트 실행, 이벤트 처리)을 처리할 수 있기 때문에 CPU 리소스가 낭비되지 않는다.

> 즉, `await`은 `promise.then`보다  좀 더 세련되게 Promise의 `result` 값을 얻을 수 있도록 해주는 문법이다.

**fetch와 체이닝 함께 응용** 파트에서 예시로 있었던 `showAvatar` 코드를 `async / await` 문법으로 정리해보면 다음과 같다.

```js
async function showAvatar(url){

	// JSON 읽기
	const loadJsonResponse = await fetch(url);
	const {name} = await loadJsonResponse.json();

	// github 사용자 정보 읽기
	const githubUserResponse = await fetch(`https://api.github.com/users/${name}`);
	const githubUser = await githubUserResponse.json();

	// 아바타 보여주기
	let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

	// 3초 대기
	await new Promise((resolve, reject)=> setTimeout(resolve,3000));
	// await가 실행되면 해당 Promise가 처리되는 동작을 executor로 잡고 그 아래의 코드들은 Microtask Queue로 간다고 생각하면 된다. (.then과 동작이 똑같음.)
	
	img.remove();

	return githubUser;
}

showAvatar();
```

> await은 최상위 레벨 코드에서 동작하지 않는다.
> 이를 위해서 `IIFE ( Immediately Invoked function expression )`를 사용할 수 있습니다.
```js
(async ()=>{
	let response = await fetch(`/article/promise-chaining/user.json`);
	let user = await response.json();
	...
})();
```

> `promise.then`처럼 `await`도 `thenable` 객체를 받을 수 있다.
```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000밀리 초 후에 이행됨(result는 this.num*2)
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // 1초 후, 변수 result는 2가 됨
  let result = await new Thenable(1);
  // new Promise((resolve)=>setTimeout(()=> resolve(this.num*2),1000)).then((result)=>alert(result)) 와 같다.
  alert(result);
}

f();
```

> `class method`에도 `async`를 사용할 수 있다. `async`가 붙은 메서드는 `async` 함수와 같이 Promise를 반환하며 await을 사용할 수 있다.
```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```

## <mark style="background: #FFB86CA6;">에러 핸들링</mark>

`await promise`는 Promise 객체의 `result`에 저장된 값을 반환한다.
반면 `Promise`가 거부되면 마치 `throw`문을 작성한 것처럼 에러를 던진다.

```js
// 아래 두 코드의 기능은 같다.
async function f() {
  await Promise.reject(new Error("에러 발생!"));
}

async function f() {
  throw new Error("에러 발생!");
}
```

`await`가 던진 에러는 `throw`가 던진 에러를 잡을 때처럼 `try...catch`를 사용해 잡을 수 있다.

```js
async function f() {

  try {
    let response = await fetch('http://유효하지-않은-주소');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```
에러가 발생하면 `catch` 블록으로 제어 흐름이 넘어가게 된다.

원래 `async function`에 리턴값이 없으면 `fulfilled Promise`에 `undefined`가 담겨서 리턴되지만

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241110193617.png)

`async function`에서 `await`한 `Promise`가 `reject`된다면 `rejected`된 `Promise`에 에러가 담겨서 리턴된다. (또한,에러도 발생한다.)

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241110193853.png)

위의 코드에서 `.catch`를 이어서 사용해서 해당 `Error`를 핸들링할 수 있다.

![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241110193713.png)

> 여기서 `.catch`로 핸들링 되지 않은 에러는 전역 에러로 처리되는데 이는 `unhandledrejection`이벤트의 핸들러로 처리할 수 있다.

> `.then`을 `await`가 대신해주고 `.catch`를 `try..catch`로 대신해주기 때문에 동일한 기능을 쓰지만 사용하는 쪽에서 훨씬 편하게 쓸 수 있다. 하지만 `await`은 최상위 레벨 코드에서는 사용할 수 없어서 (async가 없는 최상위 레벨 코드) `.then/ .catch`를 사용해야만 하는 경우가 발생한다.

> `async/ await`은 `Promise.all`과도 함께 쓸 수 있다, 에러 핸들링 역시 똑같이 `try...catch`를 활용할 수 있다.
```js
// Promise 처리 결과가 담긴 배열을 기다립니다.
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

> 감을 익히기 위한 세 가지 과제가 있습니다. 한번 풀어보면 좋을 것 같다.
> https://ko.javascript.info/async-await#tasks

# <mark style="background: #FF5582A6;">비동기 관련 문제 풀이</mark>

다음은 비동기 관련 로직을 완벽하게 이해하기 위해서 만들어 본 문제이다. 
각 `queue`와 `Web API`를 생각하면서 결과값은 무엇이고 왜인지 생각해보자.

```js
export const testFn = async () => {
  console.log(1); // 바로 실행
  setTimeout(() => { // setTimeout 바로 실행, Web API로 타이밍 함수 넘김
    console.log(2);
  }, 500);
  console.log(3); // 바로 실행
  new Promise(async (resolve) => { // executor 함수는 Promise 생성과 함께 바로 실행된다.
    console.log(4,"전")
    await setTimeout(() => { // 여기까지 바로 실행, await 아래 내부 코드들은 전부 Microtask Queue로
      console.log(4); // console.log(4)라는 콜백은 setTimeout이 실행되고 Web API에서 5000이라는 ms가 지난 후에 Macrotask queue로 전달된다.
    }, 5000);
    console.log(4, '다음');
    resolve(4);
  });
  console.log(5); // 바로 실행
  const t = await new Promise((resolve) => { // Promise 내부의 executor는 바로 실행되고 아래 코드들은 전부 Microtask queue로 이동
  // new Promise((resolve)=>{console.log(6); resolve('a')}).then((t)=>{console.log(t); console.log(7)})과 같다.
    console.log(6);
    resolve('a');
  });
  console.log(t);
  console.log(7);
};
```
![](https://codefug.github.io/assets/images/2024-11-10/Pasted%20image%2020241110155653.png)

## <mark style="background: #FFB86CA6;">풀이</mark>

|                    | 1번째 task (testFn이라는 Macrotask 실행)                                                                                | 2번째 task (testFn 관련 Microtask 전부 실행)                                                                             | 코드 실행부터 500ms 지남                                       | 3번째 task ( 2를 출력하는 Macrotask 실행 )                      | Microtask Queue 비어있는 것 확인하고 다음으로 넘어감                   | 코드 실행부터 5000ms 지남  | 4번째 task ( 4를 출력하는 Macrotask 실행) |
| :----------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------ | -------------------------------- |
| Macrotask queue 상태 |                                                                                                                  |                                                                                                                  | ()=>console.log(2)                                     |                                                        |                                                        | ()=>console.log(4) |                                  |
| Microtask queue 상태 | console.log(4, "다음"), resolve(4), console.log(t), console.log(7)                                                 |                                                                                                                  |                                                        |                                                        |                                                        |                    |                                  |
| Web API            | 500ms를 기다리면 ()=>console.log(2)를 task queue로 넘기는 동작 실행,<br>5,000ms를 기다리면 ()=>console.log(4)를 taskqueue로 넘기는 동작 실행 | 500ms를 기다리면 ()=>console.log(2)를 task queue로 넘기는 동작 실행,<br>5,000ms를 기다리면 ()=>console.log(4)를 taskqueue로 넘기는 동작 실행 | 5,000ms를 기다리면 ()=>console.log(4)를 taskqueue로 넘기는 동작 실행 | 5,000ms를 기다리면 ()=>console.log(4)를 taskqueue로 넘기는 동작 실행 | 5,000ms를 기다리면 ()=>console.log(4)를 taskqueue로 넘기는 동작 실행 |                    |                                  |
| 출력                 | 1, 3, 4 '전', 5, 6                                                                                                | 4 "다음", a, 7                                                                                                     |                                                        | 2                                                      |                                                        |                    | 4                                |

> `Macrotask` > `Microtask` > `requestAnimationFrame` > `브라우저 렌더링` 순서로 렌더링이 진행되기 때문에 위의 코드 실행 중간에 이벤트가 발생해서 `Macrotask`가 하나 생기게 되면 해당 `Macrotask`에 관련된 브라우저 렌더링이 일어나고 위의 코드로 복귀하게 될 수 있다.

# <mark style="background: #FF5582A6;">마무리</mark>

> 기존에는 비동기 코드가 Microtask Queue와 이벤트 루프를 활용해서 돌아간다는 정도만 알고 있었다면, 이제는 브라우저 렌더링 흐름과 함께 이해하면서 
> **비동기 방식이 왜 필요한지**를 더 정확히 알 수 있었다.  
> 기본기를 탄탄하게 다져 보자는 생각으로 시작한 글이기에, 촘촘하게 배우려고 노력했고, 파편화된 지식을 모을 좋은 기회가 되었다.  
> **이 기술이 왜 필요한지에** 집중하면서부터는 좀 더 다양한 시각으로 볼 수 있게 된 것 같다.  
> 이제 더 나아가 보자.

# <mark style="background: #FF5582A6;">참고 문헌</mark>
- https://wikibook.co.kr/react-deep-dive/
- https://ko.javascript.info/async
- https://product.kyobobook.co.kr/detail/S000001766397
- https://inpa.tistory.com/entry/%F0%9F%8C%90-requestAnimationFrame-%EA%B0%80%EC%9D%B4%EB%93%9C
- https://www.youtube.com/watch?v=8aGhZQkoFbQ