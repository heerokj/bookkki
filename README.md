## 목차

- [북끼 Bookkki](#북끼-bookkki)
- [배포 주소](#배포-주소)
- [개발 환경 및 기술 스택](#개발-환경-및-기술-스택)
- [주요 기능](#주요-기능)
- [기능 구현 소개](#기능-구현-소개)
  - [사용한 무한 스크롤](#useInfiniteQuery-기반-무한-스크롤-처리)
  - [다중 이미지 업로드 및 피드 CRUD](#다중-이미지-업로드-및-피드-CRUD)
  - [NextAuth 활용한 인증 구현](#NextAuth-활용한-인증-구현)
  - [Kakao Map 및 카페 공공데이터 활용](#Kakao-Map-및-카페-공공데이터-활용)
- [트러블 슈팅](#트러블-슈팅)

<br>

## 북끼 Bookkki

Bookkki는 사용자가 읽은 책을 자유롭게 공유하고 기록할 수 있는 독서 기반 커뮤니티 서비스입니다.<br>
독서가 거창한 일이 아닌 일상의 한 장면이 되기를 소망하며 진행했습니다. 이를 통해 재미있고 가벼운 독서 공유 문화가 퍼져나가길 꿈꿉니다.

<br>

## 배포 주소

[읽은 책을 공유해볼까요? - 북끼](https://bookkki.vercel.app/)

<br>

## 개발 환경 및 기술 스택

| 사용 기술           | 버전   |
| ------------------- | ------ |
| React               | 19.0.0 |
| Next.js(App Router) | 15.3.0 |
| TypeScript          | 5      |
| Tanstack Query      | 5.74.3 |
| Tailwind CSS        | 4      |

<br>

## 주요 기능

### <strong>메인 화면</strong>

![메인화면](https://github.com/user-attachments/assets/0e0f0fb4-9c81-4d2c-b5c3-62c700b088a4)

- 추천 도서, 최신 피드 5개, 추천 북카페 리스트를 확인할 수 있습니다.
- 피드를 클릭하면 해당 피드의 상세 페이지로 이동합니다. (모든 사용자 열람 가능)
- 추천 북카페를 클릭하면 해당 카페 위치가 표시된 지도 페이지로 이동합니다.

<br>

### <strong>검색 페이지</strong>

![검색 기능](https://github.com/user-attachments/assets/63022eec-b3b1-47c5-afa1-c756af1d150c)

- 원하는 도서를 검색할 수 있습니다.
- 검색 결과는 무한 스크롤 방식으로 제공됩니다.

<br>

### <strong>피드 페이지</strong>

![피드 댓글 작성](https://github.com/user-attachments/assets/2f8f4a11-85b3-4b78-befa-b301f308d88d)

- 북끼 회원들이 작성한 피드를 무한 스크롤로 확인할 수 있습니다.
- 피드를 클릭하면 상세 페이지로 이동하며, 이미지를 슬라이드 형태로 볼 수 있습니다.
- 회원 간 댓글 작성을 통해 소통할 수 있습니다.

<br>

### <strong>피드 작성 페이지</strong>

![피드작성](https://github.com/user-attachments/assets/48f52e53-5f4e-45a3-9d43-c5d645652c13)

- 여러 장의 이미지를 선택해 새로운 피드를 등록할 수 있습니다.
- 등록한 피드는 피드 페이지 상단에 즉시 반영되어 확인할 수 있습니다.

<br>

### <strong>북카페 페이지</strong>

![지도 기반 검색](https://github.com/user-attachments/assets/9d7e2d97-b2ea-41b1-a9c7-6269f63d77a0)

- 지도 기반 검색을 통해 원하는 북카페를 손쉽게 찾을 수 있습니다.
- 카페명을 검색하면 지도 상에서 해당 위치로 자동 이동합니다.
- 검색 결과 목록에서 카페를 클릭하면 해당 카페 위치가 지도에 표시됩니다.
- 북카페 목록은 무한 스크롤 방식으로 제공됩니다.

<br>

## 기능 구현 소개

### <strong>useInfiniteQuery 기반 무한 스크롤 처리</strong>

메인 페이지, 피드 페이지, 북카페 페이지에서 데이터 리스트가 있습니다. 많은 데이터를 로드해야 하는 상황에서 무한스크롤을 구현하는 방법은 다양하지만, 저는 `React Query`의 `useInfiniteQuery`를 사용해 클라이언트에서 데이터를 효율적으로 페이징 처리했습니다. 첫 페이지(초기 검색 결과)는 `SSR`로 미리 렌더링해 초기 로딩 속도와 SEO를 고려했습니다.<br>

네이버 도서 API를 활용한 검색 결과 리스트<br>
![메인 검색 페이지 무한스크롤](https://github.com/user-attachments/assets/75693cd6-5044-485d-bf63-01ace51c9074)<br><br>
공공데이터를 활용한 지도 기반 검색 리스트<br>
![지도검색 무한스크롤](https://github.com/user-attachments/assets/c5a64e7b-605a-4be7-aa8d-5acb99587fc9)<br><br>
피드 페이지에서의 피드 리스트<br>
![피드 페이지 무한스크롤](https://github.com/user-attachments/assets/730cc49d-daa0-4f9f-a5f5-4a146c2be85a)<br>

<br>

### <strong>다중 이미지 업로드 및 피드 CRUD</strong>

`React Hook Form`과 `React Query` 를 활용해 피드 작성 및 수정 기능을 구현했습니다. 다중 이미지 업로드는 `Supabase Storage` 를 사용하여 사용자가 선택한 이미지를 비동기적으로 업로드하고 업로드 완료 후 반환된 URL을 DB에 저장하도록 처리했습니다.

<br>

### <strong>NextAuth 활용한 인증 구현</strong>

`NextAuth`를 이용해 로그인 및 세션 관리를 구현했습니다. 회원가입은 Supabase를 통해 직접 처리하고 로그인은 NextAuth의 Credentials Provider를 사용하여 토큰 기반 인증 흐름을 구성했습니다. 로그인 시 받은 액세스 토큰은 쿠키에 저장되어 서버 컴포넌트에서도 안전하게 인증 정보를 사용할 수 있도록 설계했습니다. 또한 소셜로그인을 통해서 간편하게 회원가입을 할 수 있도록 했습니다.
<br>

### <strong>Kakao Map 및 카페 공공데이터 활용</strong>

`Kakao Map API` 를 사용해 지도 기반 검색 및 마커 표시 기능을 구현했습니다 또한 문화체육관광부에서 제공하는 카페 공공데이터를 활용하여 실제 존재하는 북카페 정보를 표시하고 사용자의 현재 위치 기반으로 가까운 카페를 탐색할 수 있도록 했습니다.
<br>

## 트러블 슈팅

### 1. 스토리지에 업로드한 이미지가 보이지 않음

- **이슈**<br />
  Supabase 스토리지에 업로드한 이미지의 URL을 확인해보면 `blob:http://~~` 형태로만 표시되고 실제 이미지가 보이지 않음

- **원인**<br />
  Supabase의 `.upload()`에 단순 문자열(URL)을 전달하고 있었음. Supabase는`File` 또는 `Blob` 객체만 업로드 할 수 있음

```typeScript
const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);
```

- **해결**<br />
  URL을 `File 객체` 로 변환 후 업로드하도록 수정함

```typeScript
// ❗ File 객체로 변환하는 함수
const convertURLtoFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], filename!, metadata);
  };

...

const newFile = await convertURLtoFile(file); // ❗ File 객체로 변환하기
const { error } = await supabase.storage
        .from("images")
        .upload(filePath, newFile)
```

<br />

### 2. 다중 이미지 등록 시 속도 지연

- **이슈**<br />
  여러 이미지를 동시에 업로드할 때 처리 속도가 느림

- **원인**<br />
  이미지 업로드를 `for...of` 루프로 순차적으로 처리하여 병목 현상이 발생함

- **해결**<br />
  업로드 작업을 병렬로 처리하기 위해 `Promise.all()` 을 사용함

```typeScript
const results = await Promise.all(
      convertURLtoFiles.map((file) =>
        supabase.storage.from("images").upload(`post/${uuid()}`, file)
      )
    );
```
