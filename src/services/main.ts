const NAVER_CLIENT_ID = process.env.AUTH_NAVER_ID;
const NAVER_CLIENT_PW = process.env.AUTH_NAVER_SECRET;

export const fetchBooksData = (
  bookTitle: string,
  display: number,
  start: number
) => {
  const data = fetch(
    `https://openapi.naver.com/v1/search/book.json?query=${bookTitle}&display=${display}&start=${start}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_PW,
      },
    }
  ).then((res) => res.json());

  return data;
};
