---
title: 로그인 구현 (zustand, zod + react-hook-form, RTR)
excerpt: zustand를 이용한 로그인 상태 전역 관리, zod를 이용한 간단한 스키마 전개, react-hook-form을 이용한 간단한 validation, axios를 이용한 간단한 api 요청 처리
toc: true
toc_sticky: true
categories:
  - react
last_modified_at: 2024-06-17T24:00:00
header:
  teaser: /assets/images/Logo/zod.png
---

# 로그인

## 로그인 상태관리

상태 관리와 기존 context api의 가장 큰 차이점은 context api는 상태를 주입하는 것 뿐이기 때문에 불필요한 리렌더링이 발생할 수 있어 성능이 좋지 않다. 상태 관리 라이브러리를 사용하면 리렌더링이 발생하지 않고 컴포넌트에게 전역 상태를 사용할 수 있다는 장점이 있다.

### 기존 context를 이용한 로그인 상태 관리 (전역)

```tsx
import React, { createContext, useState } from "react";

type User = {
  accessToken: string;
};

export const AuthContext = createContext<{
  user: User | null;
  login: (accessToken: string) => void;
  logout: () => void;
}>({
  user: null,
  login: (accessToken: string) => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    document.cookie = `accessToken=${localStorage.getItem("accessToken")}`;
    setUser({ accessToken });
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
```

기존 로그인을 Context를 이용해서 구현한 방법이다.
하지만 이전에 이야기한 것처럼 useContext를 활용한 방식은 props drilling을 없애기 위해서 주입하는 것이라 불필요한 리렌더링이 발생하여 성능이 좋지 않을 수 있다.
이번에 전역 상태 관리 라이브러리 중 하나인 zustand를 간단하게 적용해보면서 이를 zustand를 적용한 방식으로 바꿔보자.

### zustand

![alt text](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image.png)

사이즈가 작고 빠르고 확장성 있는 상태 관리 라이브러리이다.
hook에 기반한 API를 가졌으며 flux와 비슷한 컨벤션을 가지고 있다. (redux와 유사한 로직)

#### 실제 적용

로그인 상태는 라우트가 바뀌어도 갖고 있어야 하는 정보이므로 persist라는 미들웨어를 사용해서 로컬스토리지에 저장한다.

```tsx
import Cookies from "js-cookie";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  accessToken: string;
};

type UserState = {
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const useStoreSlice: StateCreator<UserState> = (set) => ({
  user: null,
  login: (accessToken: string) => {
    return set(() => ({ user: { accessToken } }));
  },
  logout: () => set(() => ({ user: null })),
});

const persistedUserStore = persist<UserState>(useStoreSlice, {
  name: "user",
});

export const useUserStore = create(persistedUserStore);
```

이제 쓰고 싶은 컴포넌트에서 해당 store를 가져오면 된다.

```tsx
// 네트워크 요청을 보내기 전에 형식 검사
export function LoginPage() {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInSchema) });
```

위의 코드에서 useUserStore()로 한 스토어를 통째로 가져올 수 있는데 이는 스토어와 연결된 모든 컴포넌트들을 리렌더링시킬 수 있기 때문에 지양하는 것이 좋다.

되도록이면 위처럼 하나씩 가져오자.

이제 로컬스토리지에 담고 상태로 추적하며 이로 인해 컴포넌트가 바뀌는 함수는 처리가 완료되었다.

다음은 이제 refresh Token에 대해서 고민해보자.

> refresh Token이란 access Token을 받기 위한 또 하나의 토큰이다. access Token보다 expire time이 길다.
> 보통 세션 스토리지 (브라우저 닫히면 없어짐), 로컬 스토리지 (같은 Origin일 경우 expire time까지 있음), 쿠키 (네트워크 통신에서 사용한다. js-Cookies 같은 라이브러리로 편리하게 사용할 수 있다.)
> 에 저장해둔다.
> 끝에 나오겠지만 access Token과 refresh Token을 분리해서 관리하기 위해 refresh Token은 쿠키에, access Token은 로컬 스토리지에 저장하였다. (쿠키에 저장하는 것이 더 보안성이 좋다고 한다. (HTTPS로 인해) )

## RTR

> RTR은 결국 쓰지 않았습니다 그래도 스스로 분석해낸 과정을 보고 싶으시면 봐주시고 아니면 React-hook-form 으로 넘어가 주시면 됩니다!

![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240614123700.png)

보통 refresh 와 access 는 로컬스토리지, 쿠키에 저장한다. 기본값으로 access는 30분~1시간, refresh token은 2주의 시간을 가진다.

Access Token이 만료되면 Refresh Token과 함께 교체해주는 것

![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240614123857.png)

클라에서 auth 요청 > Auth0에서 검증 후 검증 코드를 보내줌 > 검증 코드를 이용해서 access Token 요청 > Auth0가 access Token, refresh Token 줌 > 이후 access Token 만기시 > refresh Token으로 Auth0에 access Token 요청 > Auth0가 새로운 access Token와 새로운 refresh Token을 줌.

계속 갱신하기 때문에 이미 사용된 토큰으로 access Token을 요청하는 **replay attack**로부터 보호할 수 있다. 

**Replay Attack**  
공격자가 원본 메시지와 같은 자격증명을 얻기 위해 이전에 보내진 메시지를 가로채서 다시 보내는 것

#### RTR 구현

##### 예제 분석

다음은 참고한 문서에서 나온 예제이다.

```typescript
const refreshTokenRotation = () => {
  let accessToken: string = null;
  // accessToken 생성
  
  let expirationTime: number = null;
  // expirationTime 생성

  return {
    getAccessToken: async () => {
      const refreshToken = getRefreshToken();
      // getRefreshToken으로 refreshToken 가져오기
      
      if (!accessToken || expirationTime < new Date().getTime()) {
      // accessToken이 없거나 expirationTime이 지금보다 작으면 (만기되면)
      
        await axios
          .post("/api/refresh", {
            refreshToken,
          })
          // refresh 요청, 토큰을 담아서
          .then((res) => {
	      // 받은 응답으로 정보 저장
            accessToken = res.data.accessToken;
            expirationTime = res.data.expirationTime;
            setRefreshToken(res.data.refreshToken);
          })
          .catch(() => {
          // 안되면 로그인 만료되었다고 표현
            accessToken = null;
            expirationTime = null;
            alert("로그인이 만료 되었습니다.");
          });
      }
      return accessToken;
    },
    setAccessToken: (at: string, et: number) => {
      // 접근 토큰 설정
      accessToken = at;
      expirationTime = et;
    },
    deleteTokens() {
	  // 초기화 후 리프레쉬 토큰 삭제
      accessToken = null;
      expirationTime = null;
      deleteRefreshToken();
    },
  };
};
```

분석이 완료된 후 실제 코드와 연결하여 적용해보았다.

##### 응용 코드

```tsx
// shared/util/RTR.ts
import { authInstance } from "../api/axios";
import { deleteRefreshToken, getRefreshToken, setRefreshToken } from "./token";
import { InternalAxiosRequestConfig } from "axios";

// Refresh Token Rotation
export const refreshTokenRotation = () => {
  let accessToken: string | null = null;
  // accessToken 생성

  let expirationTime: number | null = null;
  // expirationTime 생성

  const setAccessToken = (at: string, et: number) => {
    // 접근 토큰 설정
    accessToken = at;
    expirationTime = et;
  };

  const deleteTokens = () => {
    // 초기화 후 리프레쉬 토큰 삭제
    accessToken = null;
    expirationTime = null;
    deleteRefreshToken();
  };

  const moveHome = () => {
    window.location.href = "/";
  };

  const isExpired = () => {
    const now = new Date().getTime();
    return (expirationTime as number) < now;
  };

  const getNewTokens = async () => {
    const refreshToken = getRefreshToken();
    // getRefreshToken으로 refreshToken 가져오기
    await authInstance
      .post("/auth/refresh-token", {
        refreshToken,
      })
      // refresh 요청, 토큰을 담아서
      .then((res) => {
        // 받은 응답으로 정보 저장
        const {
          data: { accessToken, expirationTime, refreshToken },
        } = res;
        setAccessToken(accessToken, expirationTime);
        setRefreshToken(refreshToken);
      })
      .catch(() => {
        // 안되면 로그인 만료되었다고 표현
        deleteTokens();
        alert("로그인이 만료 되었습니다.");
        moveHome();
      });
  };

  return {
    setAuthHeader: async function (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> {
      if (!accessToken || isExpired()) {
        await getNewTokens();
      }
      if (config !== undefined && config.headers !== undefined) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.error("axios config에 문제 발생");
      }
      return config;
    },
  };
};
```

```tsx
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { refreshTokenRotation } from "../util/RTR";
  
const instance = axios.create({ baseURL: BASE_URL });
const authInstance = axios.create({ baseURL: BASE_URL });
const { setAuthHeader } = refreshTokenRotation();
authInstance.interceptors.request.use(setAuthHeader);
// interceptor에 RTR이 적용된 

export { authInstance, instance };
```

이제 authorization이 필요한 네트워크 요청에 사용되는 axios instance가 완성되었다. 자동으로 accessToken을 검사해서 없으면 refreshToken을 이용해서 재조정해준다.

```tsx
import { useStore } from "@/app/store";
import { postSignIn } from "@/shared/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

// schema 생성
const schema = z.object({
// form 요소 유효성 검사 지정
  email: z.string().email({ message: "잘못된 이메일 형식입니다" }), // error.[name].message에 담을 string 지정
  password: z.string().min(8, { message: "비밀번호를 8자 이상 입력해주세요" }),
});

// 네트워크 요청을 보내기 전에 형식 검사
export function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  // zod를 react-hook-form에서 사용하기 위한 resolver 지정

// 자체 async는 사용할 수 없다.
  const onSubmit = (d: FieldValues) => {
  // handleSubmit으로부터 FieldValues를 받아서 로그인 처리함.
  // 로그인 처리는 네트워크 요청 > accessToken을 zustand store에 담는 것으로 종료
  // login자체에 localStorage, cookie에 해당 값을 저장하고 상태를 바꾸는 로직이 들어가 있어서 login에 값만 보내면 되게 설계되어 있음.
    (async () => {
      const data = await postSignIn({
        email: d.email,
        password: d.password,
      });
      if (!data) return;
      login(data.accessToken);
      // 로그인 완료시 루트 라우트로 이동
      navigate("/");
    })();
  };

  return (
    <>
     {/* 이벤트 핸들러를 submit event로 보낸다. */}
      <form onSubmit={handleSubmit(onSubmit)}>
     {/* register를 이용해서 email을 지정 */}
        <input {...register("email")} />
     {/* zod에서 email을 가진 요소를 찾아서 그 안의 message(에러)를 꺼낸다. */}
        {errors.email?.message && <p style={{color:"red"}}>errors.email?.message as string}</p>}
        <input {...register("password")} />
        {errors.password?.message && (
          <p style={{color:"red"}}>{errors.password?.message as string}</p>
        )}
     {/* form event를 제출한다. */}
        <input type="submit" />
      </form>
      <Link to="/signup">회원가입</Link>
    </>
  );
}
```

> 하지만 위의 과정은 백엔드와의 소통이 필요하다. refresh 토큰을 받았을 때 refresh Token과 access Token을 같이 전달해주는 로직이 필요하고 더불어 두 개의 브라우저 (웹, 모바일) 에서 동시에 접속했을 때 하나의 기기에서 refresh Token을 받으면 다른 기기의 refresh Token은 stale하게 되어 로그아웃되는 사태가 발생한다.
> <s>수많은 삽질 끝에</s> 일반적으로 어떤 방식으로 로그인을 처리하는지 알아보았고 그 과정에서 알게된 기술을 몽땅 적용해보기로 하였다.
## react-hook-form

![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240721171036.png)

form validation은 항상 남아 있는 숙제이다.

처음 form을 접했을 때는 "그냥 state로 input마다 박아넣으면 안되나?" 라는 생각을 했었으나 이는 불필요한 리렌더링을 일으키게 된다.

이를 방지하기 위해 비제어 컴포넌트로 전부 만들면서 리렌더링을 줄이고 validation을 입히는 과정은 반복적이며 고통스럽다.

모든 과정을 자동화할 순 없을까? > 라이브러리 탄생

공식문서에서도 설명보단 "그냥 일단 써봐" 하는 느낌으로 간단하게 보여주고 있다. 다음은 우리의 친구 "get started"의 코드이다.

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
```

위의 코드만 보고 따라치면 사실 간단한 validation은 완성이다.

하지만 부족한 점이 존재한다. register에 config로 들어가 있는 validation을 적는 과정도 귀찮아진다.

또한 다양한 옵션이 들어갔으면 좋겠고 그러한 스키마들을 분리해서 가독성을 높히고 싶다!

이 과정들도 귀찮지 아니한가? > schema 라이브러리 탄생

## react-hook-form zod resolver

![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240721171054.png)
<s>이 글을 쓰게된 이유이다. 멋있는 개발자가 된 느낌이었다. 이름도 어떻게 zod임?</s>

> TypeScript-first schema validation with static type inference

즉 정적 타입 추론을 위한 것

이것도 일단 써봐 느낌이다.

그래서 일단 써보았다.

```tsx
import { z } from "zod";

export const SignUpSchema = z
  .object({
    nickname: z.string().min(2, { message: "이름을 2자 이상 입력해주세요" }),
    email: z.string().email({ message: "잘못된 이메일 형식입니다" }),
    password: z
      .string()
      .min(8, { message: "비밀번호를 8자 이상 입력해주세요" }),
    passwordConfirmation: z
      .string()
      .min(8, { message: "비밀번호를 8자 이상 입력해주세요" }),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "비밀번호가 일치해야 합니다.",
        path: ["passwordConfirmation"],
      });
    }
  });

export type SignUpType = z.infer<typeof SignUpSchema>;
```

회원가입 관련 schema이다. 보다시피 파일을 분리시켜서 schema와 그 schema를 사용하는 react - hook -form을 분리시켰다.

코드의 가독성도 늘어나며 schema만 변경하면 되서 유지보수성이 늘어난다.

우리의 목적은 로그인이니 로그인 관련 schema와 react-hook-form 처리를 구현해보자.

```tsx
import { z } from "zod";
  
export const SignInSchema = z.object({
  email: z.string().email({ message: "잘못된 이메일 형식입니다" }),
  password: z.string().min(8, { message: "비밀번호를 8자 이상 입력해주세요" }),
});
  
export type SignInInput = z.infer<typeof SignInSchema>;
```

우선 string이고 기본적인 email validation을 입혔다. 원래는 noneEmpty 라는 메소드로 required 처리를 했다고 하는데 deprecated되었고 min으로 처리할 수 있게 되었다고 한다.

```tsx
export function LoginPage() {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInSchema) });
//...
return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email")} />
          {errors.email?.message && (
            <p style={{ color: "red" }}>{errors.email?.message as string}</p>
          )}
        </div>
        <div>
          <input {...register("password")} type="password" />
          {errors.password?.message && (
            <p style={{ color: "red" }}>{errors.password?.message as string}</p>
          )}
        </div>
        <input type="submit" />
      </form>
      <Link to="/signup">회원가입</Link>
    </>
```

위 코드처럼 zodResolver라는 함수에 넣어서 schema를 적용시킨다.

이제 끝난걸까?

아니다. RTR이 실패했기 때문에 또다른 refresh Token 여정을 떠나야 한다!

기존의 api 요청은 axios로 header나 기본 설정들을 간단하게 처리했었다.

refresh Token은 정말 기본적인 웹 개념이니깐 axios에서 처리할 수 있는 무언가를 만들지 않았을까? 하는 생각에 문서를 정독하였다.

그리고 찾아낸 interceptor

## axios interceptor
![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240721171000.png)
```tsx
// 요청 인터셉터 추가하기
axios.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  }, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  });

// 응답 인터셉터 추가하기
axios.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  }, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  });
```

공식문서에 존재하는 코드이다. 정말 간단하게 되어있지만 config를 전달해서 작업을 수행하고, Promise.reject(error)로 작업에 error를 던지는 등 해석해야 될만한 거리들이 많다.

늘 그랬듯 일단 부딪혀 보기로 했다.

```tsx
import { useUserStore } from "@/app/store";
import { BASE_URL } from "../constants/constants";

import axios, {
  AxiosError,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { postAuthRefreshToken } from "./api";

// 재시도 확인 프로퍼티 설정
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 기본 설정
const baseConfig: CreateAxiosDefaults = {
  baseURL: `${BASE_URL}`,
};

// 쿠키 드러내고 인증 필요없는 인스턴스
export const instanceWithoutInterceptors = axios.create(baseConfig);

// 인증 필요한 인스턴스
export const instance = axios.create(baseConfig);

instance.interceptors.request.use(
  // 요청 전에 실행
  function (config) {
    // 토큰 가져오기
    const accessToken = useUserStore.getState().user?.accessToken;

    // 헤더에 토큰 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 설정 반환
    return config;
  },
  // 요청 에러 발생 시 실행
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // 응답 성공 시 실행
  function (response) {
    return response;
  },
  // 응답 에러 발생 시 실행
  async function (error: AxiosError) {
    // 에러 정보 가져오기
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    // 토큰 만료 시 재시도
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 토큰 재발급
        const response = await postAuthRefreshToken();
        // 토큰 갱신
        useUserStore.setState({
          user: { accessToken: response.accessToken },
        });

        // 헤더에 토큰 추가
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

        // 재시도
        return instance(originalRequest);
      } catch (error) {
        // 토큰이 만료되었을 때
        if (error instanceof AxiosError && error.response?.status === 403) {
          // 로그아웃
          useUserStore.getState().logout();
          return;
        }
      }
    }

    return Promise.reject(error);
  }
);
```

우선 모든 instance가 인증이 필요한 건 아니다. accessToken 없이도 접근할 수 있는 데이터가 있으니 분리해준다. (instanceWithoutInterceptors)

두 가지로 분기를 나눠야 한다.

### 요청 전

zustand로 accessToken을 저장하고 있으니 꺼내와주고 Authorization에 토큰을 담는다. 끝

### 요청 후

성공한 경우는 똑같지만 실패했을 때 refresh Token으로 accessToken을 받아와 줘야 한다.

보통 401 (Unauthorization Error)로 표현되고 지금 api에도 그렇기 때문에 맞게 처리해준다.

이후 instance 자체를 return으로 넣어서 다시 시도시켜주면 된다.

이렇게 되면 `_retry`로 인해서 단 한번만 refresh Token으로 access Token을 갱신해서 요청을 다시 시행하고 아닐 경우 Promise.reject로 가서 마무리된다.

## 결과

로그인과 동시에 accessToken은 localStorage로 들어가는 것을 확인할 수 있고

![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240721173745.png)

refreshToken은 쿠키에 잘 있는 것을 확인할 수 있다.

![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240721173806.png)

accessToken이 만료되면 network 탭에 다음과 같이 표시된다.

![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240721174651.png)

1. 인증이 필요한 요청을 실패한다.
2. refresh-token 요청을 보낸다. access Token을 갱신한다.
3. 다시 인증이 필요한 요청을 보낸다.
4. 인증이 필요한 요청을 기반으로 인증을 보낸다.

## 후기

로그인이라는 작지만 거대한 기능을 알아보았다.

자동 로그인이나 이를 감지하고 리렌더링되는 헤더 같은 컴포넌트 처리가 남아있긴 했지만

인증에 관련된 부분의 핵심적인 부분은 이정도인 것 같다. (OAuth나 OIDC 같은게 남긴 했지만)

바닐라로 구현할 경우 굉장히 어려울 법한 부분들을 다양한 라이브러리가 채워주는 풍성한 프론트엔드 환경을 확인할 수 있었다.

라이브러리를 학습하는 데 있어서 주저없어야 하는 부분이 이런 것 같다. 그냥 도구이기에 라는 마음가짐으로 임해보자.

## Reference
<a href="https://docs.pmnd.rs/zustand/getting-started/introduction">zustand 공식문서</a>

<a href="https://react-hook-form.com/">react-hook-form 공식문서</a>

<a href="https://zod.dev/">zod 공식 문서</a>

<a href="https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod">react-hook-form/zod resolver</a>

<a href="https://axios-http.com/docs/interceptors">axios interceptors</a>

<a href="https://github.com/colinhacks/zod/discussions">zod discussion</a>

<a href="https://velog.io/@chchaeun/%EC%9D%B8%EC%A6%9D%EA%B3%BC">개발새발.log</a>

<a href="https://medium.com/@kirankumal714/implementing-refresh-token-in-react-using-axios-zustand-and-react-query-a5dbac2944b6">Kiran Kumal Medium</a>

<a href="https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation#maintain-user-sessions-in-spas">auth0 by Okta</a>

>
> 개인 학습을 위한 자료입니다!
>
> 잘못된 내용이 있다면 말씀 부탁드립니다. 감사합니다.
>