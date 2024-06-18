---
title: "로그인 구현 (zustand, zod + react-hook-form, RTR)"
excerpt: "zustand를 이용한 로그인 상태 전역 관리, zod + react-hook-form 인증 유효성 검사, axios interceptor + RTR 방식으로 보안성 향상"
toc: true
toc_sticky: true
categories:
  - react
last_modified_at: 2024-06-17T24:00:00
header:
  teaser: /assets/images/Logo/react.png
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

![alt text](Pasted%20image.png)

사이즈가 작고 빠르고 확장성 있는 상태 관리 라이브러리이다.
hook에 기반한 API를 가졌으며 flux와 비슷한 컨벤션을 가지고 있다. (redux와 유사한 로직)

입문은 쉽지만 마스터가 어려운 느낌의 학습이었다. 입문 자체는 useContext처럼 쓸 수 있었다.

#### 실제 적용

스토어를 먼저 생성한 후

```tsx
import { create } from "zustand";
  
type User = {
  accessToken: string;
};
  
type Store = {
  user: User | null;
  login: (accessToken: string) => void;
  logout: () => void;
};
  
export const useStore = create<Store>()((set) => ({
  user: null,
  login: (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    document.cookie = `accessToken=${localStorage.getItem("accessToken")}`;
    return set(() => ({ user: { accessToken } }));
  },
  logout: () => set(() => ({ user: null })),
}));
```

이제 쓰고 싶은 컴포넌트에서 해당 store를 가져오면 된다.

```tsx
export const Header = () => {

  const { login, user } = useStore();

  return (
  //...
          <Link to="/login" className="link">
            <Button
              classNames={["button--small", "button--blue", "button"]}
              value="로그인"
              // 아직 fetch 로직이 없으니 
              // accessToken이 1234라고 가정
              onClick={() => login("1234")}
            />
          </Link>
```

굉장히 간단하게 로그인 기능을 zustand를 이용해서 구현해보았다.

다음은 이제 refresh Token에 대해서 고민해보자.

## refresh Token 처리

![](https://codefug.github.io/assets/images/2024-06-17/Pasted%20image%2020240614123700.png)

보통 refresh 와 access 는 로컬스토리지, 쿠키에 저장한다. 기본값으로 access는 30분~1시간, refresh token은 2주의 시간을 가진다.

### RTR

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
## react-hook-form
## react-hook-form zod resolver
## useNavigation
## 결과
### 인증 실패
### 없는 계정으로 인한 실패
### 정상 로그인
## 느낀점

## Reference
<a href="https://docs.pmnd.rs/zustand/getting-started/introduction">zustand 공식문서</a>

<a href="https://react-hook-form.com/">react-hook-form 공식문서</a>

<a href="https://zod.dev/">zod 공식 문서</a>

<a href="https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod">react-hook-form/zod resolver</a>

<a href="https://axios-http.com/docs/interceptors">axios interceptors</a>

<a href="https://reactrouter.com/en/main/hooks/use-navigate">react router useNavigate</a>

<a href="https://velog.io/@chchaeun/%EC%9D%B8%EC%A6%9D%EA%B3%BC">개발새발.log</a>

<a href="https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation#maintain-user-sessions-in-spas">auth0 by Okta</a>

>
> 개인 학습을 위한 자료입니다!
>
> 잘못된 내용이 있다면 말씀 부탁드립니다. 감사합니다.
>