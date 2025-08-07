import { XMLParser } from "fast-xml-parser";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cafeName = searchParams.get("keyword") || ""; //검색어
  const pageNo = Number(searchParams.get("pageNo")) || 1; //페이지 번호
  const numOfRows = Number(searchParams.get("numOfRows")) || 5; //한 페이지당 결과 수

  const start = (pageNo - 1) * numOfRows + 1; //1페이지 → start=1 / 2페이지 → start=11
  const to = pageNo * numOfRows; //페이지의 마지막 항목 번호

  try {
    const res = await fetch(
      `https://api.kcisa.kr/openapi/API_CIA_090/request?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}&keyword=${cafeName}&numOfRows=${numOfRows}&pageNo=${start}`
    );

    const xml = await res.text(); // XML 문자열로 받아오기
    const parser = new XMLParser();
    const json = parser.parse(xml); // JSON으로 변환

    const items = json.response.body.items.item ?? [];
    const totalCount = json.response.body.totalCount;
    const hasNext = to < (totalCount || 0); //현재 페이지 마지막 항목 번호(to)가 전체 결과 수(data.total)보다 작으면 → hasNext = true

    return Response.json({
      data: items,
      count: totalCount,
      hasNext,
      nextPage: pageNo + 1,
    });
  } catch (error) {
    console.error("API 라우트 실패", error);
    return new Response("Server error", { status: 500 });
  }
}
