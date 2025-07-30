import { XMLParser } from "fast-xml-parser";
export async function GET() {
  try {
    const res = await fetch(
      `https://api.kcisa.kr/openapi/API_CIA_090/request?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}&numOfRows=5&pageNo=1`
    );
    const xml = await res.text();
    const parser = new XMLParser();
    const json = parser.parse(xml);

    return Response.json(json);
  } catch (error) {
    console.error("API 라우트 실패", error);
    return new Response("Server error", { status: 500 });
  }
}
