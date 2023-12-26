### 23/12/26

# Next.js - 생활코딩 정리

• `npx` : npm 패키지를 간편하게 실행할 수 있도록 도와주는 도구

```jsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html>
      {/* page.tsx가 return한 값을 children 자리에 가져다둠  */}
      <body>{children}</body>
    </html>
  );
}
```

<br>

### 배포판 vs dev

- 서버에서 클라이언트로 전송한 리소스 용량 비교
  - dev서버에서보다 build후 돌린 서버에서 리소스 용량이 훨씬 가볍다.

<br>

### 웹 바에 metadata설정

```jsx
export const metadata = {
  title: "devdevdev",
  description: "꿈빛 파티시엘 project", // html 확인
};
```

<br>

### 라우팅

- next는 app아래의 `page.tsx` 를 찾아 return값을 `layout.tsx`와 결합하여 최종적으로 렌더링!

/create 경로

**동작원리**

1. next는 app밑의 create가 있는지 찾고
2. 만약 있다면 `page.js` 를 찾는다.
3. `page.js` 내용을 create/layout에 결합하려고 하지만 `layout`이 없다
4. 그럼 부모폴더로 가서 다시 `layout.js` 를 찾는다.
5. 부모에는 존재하므로 부모의 `layout.js` 에 `{children}` 에 결합한다.

<br>

### 다이나믹 라우팅

- read/id값 라우팅 하는법

```jsx
export default function Read(props) {
  return (
    <>
      <h2>Read</h2>
      {/* props.params.id이 pathvariable 값이다! */}
      params.id : {props.params.id}
    </>
  );
}
```

<br>

### Next.js 의 SSR

- react는 js의 기술이기에 개발자도구 - `disable javascript`를 할 경우 웹페이지가 아예 렌더링 되지않는다.
- 하지만 next.js로 만든 페이지는 리로드 해도 렌더링이 잘됨!

⇒ 그 이유는 next.js 가 서버쪽에서 react를 실행해서 그 응답 결과를 .next에 저장해 그것을 응답함!

즉, js가 아닌 html를 응답한다. 따라서 잘 동작함!

<br>

### Next의 단점

- 한 컴포넌트 내용만 바뀌어도 전체 페이지를 리로딩한다.
- 이를 해결하기 위해 `<a>` 대신 `<Link>` 를 사용하자!

```jsx
import Link from "/next/link";
```

- 이렇게 하면 처음 방문한 페이지는 서버와 통신자체를 하지않음!!

⇒ SPA와 같은 부드러움 구현 가능

<br>

### 정적자원 사용하기

`public` 폴더 : 이미지와 같은 리소스를 위치시킴

- react와 동일

```jsx
<img src="/next.svg" alt="" />
```

<br>

### Next에서 css

최상단 - `layout.tsx` 는 루트 레이아웃이기때문에 어떤 페이지를 방문하던 로드된다

따라서 global.css를 최상단 layout.tsx에 적용

<br>

### backend

```bash
npx json-server --prot 9999 --watch db.json
```

```json
{
  "topics": [
    { "id": 1, "title": "html" },
    { "id": 2, "title": "css" }
  ],
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

```json
fetch("http://localhost:3000/topics").then((res)=>{
    return res.json();
}).then((res)=> console.log(res))
```

<br>

### data 이용하기

`server Compo` : 정보를 표시하지만 사용자와 상호작용을 하지 않는경우

`client Compo` : 사용자와 상호작용 하는경우

<br>

### 데이터 가져오기

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // 이렇게 하면 에러가 난다!
  //
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/topics")
      .then((res) => {
        return res.json();
      })
      .then((res) => setTopics(res));
  }, []);
  return (
```

**⇒ 서버 컴포넌트에서 useEffect,useState 같은 클라이언트 컴포넌트쪽 api를 사용하여서 에러가 난다!**

```tsx
const res = await fetch("http://localhost:9999/topics");
const topics = await res.json();
```

⇒ 서버쪽에서 동적으로 생성한 정적인 내용을 클라이언트가 그려주므로 `disable js`

를 해도 잘 동작한다.

<br>

### 참고

1.  **metadata**는 server component이다.
2.  `use client` 문을 최상단에 사용하면 client component가 된다.
