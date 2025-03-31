const NAVER_CLIENT_ID = process.env.AUTH_NAVER_ID;
const NAVER_CLIENT_PW = process.env.AUTH_NAVER_SECRET;

export const fetchBooksData = (
  bookTitle: string,
  start: number,
  display: number
) => {
  const data = fetch(
    `https://openapi.naver.com/v1/search/book.json?query=${bookTitle}&start=${start}&display=${display}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": NAVER_CLIENT_ID!,
        "X-Naver-Client-Secret": NAVER_CLIENT_PW!,
      },
    }
  ).then((res) => res.json());

  return data;
};

//무한스크롤로 변경
// export const fetchBooksDatas = (
//   bookTitle: string,
//   pageParam: number,
//   display: number
// ) => {
//   const start = (pageParam - 1) * display + 1;
//   const to = pageParam * display;

//   fetch(
//     `https://openapi.naver.com/v1/search/book.json?query=${bookTitle}&start=${start}&display=${display}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Naver-Client-Id": NAVER_CLIENT_ID!,
//         "X-Naver-Client-Secret": NAVER_CLIENT_PW!,
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("🚀 ~ .then ~ data:", data);

//       // data : 책 데이터
//       // count : 총 데이터 수
//       // hasNext : 다음 시작 데이터 유무 (t/f)
//       // nextPage : 다음페이지
//       const hasNext = to < (data.total || 0);
//       return {
//         data: data.items,
//         count: data.total,
//         hasNext,
//         nextPage: pageParam + 1,
//       };
//     });
// };

//fetchBooksDatas를 async 함수로 만들고, return 추가
//리액트쿼리가 undefined 없이 데이터를 잘 받게 하기위해
// export const fetchBooksDatas = async (
//   bookTitle: string,
//   pageParam: number,
//   display: number
// ) => {
//   const start = (pageParam - 1) * display + 1;
//   const to = pageParam * display;

//   const res = await fetch(
//     `https://openapi.naver.com/v1/search/book.json?query=${bookTitle}&start=${start}&display=${display}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Naver-Client-Id": NAVER_CLIENT_ID!,
//         "X-Naver-Client-Secret": NAVER_CLIENT_PW!,
//       },
//     }
//   );

//   const data = await res.json();
//   console.log("🚀 ~ data:", data);

//   // data : 책 데이터
//   // count : 총 데이터 수
//   // hasNext : 다음 시작 데이터 유무 (t/f)
//   // nextPage : 다음페이지
//   const hasNext = to < (data.total || 0);

//   return {
//     data: data.items,
//     count: data.total,
//     hasNext,
//     nextPage: pageParam + 1,
//   };
// };
