// 서버에서 실행되는 API 라우트
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bookTitle = searchParams.get("query") || "";
  const pageParam = Number(searchParams.get("page")) || 1;
  const display = Number(searchParams.get("display")) || 10;

  const start = (pageParam - 1) * display + 1;
  const to = pageParam * display;

  const res = await fetch(
    `https://openapi.naver.com/v1/search/book.json?query=${bookTitle}&start=${start}&display=${display}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_AUTH_NAVER_ID!,
        "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_AUTH_NAVER_SECRET!,
      },
    }
  );

  const data = await res.json();
  const hasNext = to < (data.total || 0);

  return Response.json({
    data: data.items,
    count: data.total,
    hasNext,
    nextPage: pageParam + 1,
  });
}
