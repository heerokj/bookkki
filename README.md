# 📚 북끼 Bookkki

## 📋 프로젝트 소개

Bookkki는 사용자가 읽은 책을 공유하고 기록하는 웹 어플리케이션입니다. 네이버 도서 API을 활용하여 도서를 제공하는 기능을 구현하였습니다.

#### 🔗 배포 주소 </br>[북끼 바로가기](https://bookkki.vercel.app/)

## 🏗️ 개발 환경 및 기술 스택

| 사용 기술           | 버전   |
| ------------------- | ------ |
| Next.js(App Router) | 15.3.0 |
| React               | 19.0.0 |
| TypeScript          | 5      |
| Tanstack Query      | 5.74.3 |
| Tailwind CSS        | 4      |

## 📂 파일 구조

<details>
<summary>펼쳐보기</summary>

<br>

```bash
📦src
 ┣ 📂app
 ┃ ┣ 📂(auth)
 ┃ ┃ ┣ 📂sign-in
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂sign-up
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂(main)
 ┃ ┃ ┣ 📂(with-navigation)
 ┃ ┃ ┃ ┣ 📂(with-searching)
 ┃ ┃ ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┃ ┣ 📜loading.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂feed
 ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┣ 📜loading.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📜loading.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂my-books
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜layout.tsx
 ┃ ┃ ┣ 📂write
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂books
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜not-found.tsx
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┣ 📂carousel
 ┃ ┣ 📂chat
 ┃ ┣ 📂common
 ┃ ┣ 📂feed
 ┃ ┣ 📂feedDetail
 ┃ ┣ 📂layout
 ┃ ┣ 📂main
 ┃ ┣ 📂skeleton
 ┃ ┗ 📂write
 ┣ 📂context
 ┣ 📂hooks
 ┣ 📂lib
 ┃ ┣ 📂actions
 ┃ ┗ 📂services
 ┣ 📂providers
 ┣ 📂shared
 ┣ 📂types
 ┗ 📜auth.ts
```

</details>

## 📌 주요 기능

1️⃣ <strong>도서 검색</strong>

- 원하는 도서를 검색할 수 있습니다.

2️⃣ <strong>피드 관리</strong>

- 이미지를 등록하여 원하는 내용을 사용자들과 공유할 수 있습니다
- 각 피드를 디테일하게 볼 수 있으며, 그 안에서 댓글을 달며 소통할 수 있습니다.

3️⃣ <strong>채팅 관리</strong>

- 사용자들과 대화할 수 있는 채팅방을 생성할 수 있습니다.

4️⃣ <strong>로그인/회원가입</strong>

- 북끼 회원가입을 할 수 있습니다.
- 회원가입한 아이디로 북끼에 로그인 할 수 있습니다.

## 💡 개선 사항

- [ ] 채팅 기능
- [ ] 반응형 디자인 적용
