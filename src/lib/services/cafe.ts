// API 라우트 호출 (app/api/..)
export const fetchCafeList = async () => {
  try {
    const res = await fetch(`/api/cafes`);

    if (!res.ok) {
      throw new Error("카페 데이터 fetch 실패");
    }

    const data = await res.json();
    const dataList = data.response.body.items.item;

    return dataList;
  } catch (error) {
    console.error("카페 데이터 fetch 실패", error);
    return [];
  }
};

// 카페 검색 API 호출
export const fetchSearchCafe1 = async (keyword: string) => {
  const text = keyword.trim();
  if (!text) return [];

  try {
    const res = await fetch(
      `/api/searchCafe?keyword=${encodeURIComponent(text)}`
    );

    if (!res.ok) {
      throw new Error("카페 검색 데이터 fetch 실패");
    }

    const data = await res.json();
    const dataList = data.response.body.items.item ?? [];

    return dataList;
  } catch (error) {
    console.error("카페 검색 데이터 fetch 실패", error);
  }
};

//서치 무한스크롤
export const fetchSearchCafe = async (
  keyword: string,
  numOfRows: number,
  pageNo: number
) => {
  const text = keyword.trim();
  if (!text) return [];

  try {
    const res = await fetch(
      `/api/searchCafe?keyword=${encodeURIComponent(
        text
      )}&numOfRows=${numOfRows}&pageNo=${pageNo}`
    );

    if (!res.ok) {
      throw new Error("Search Infinite API 에러");
    }

    return res.json();
  } catch (error) {
    console.error("Search Infinite API 에러", error);
  }
};
