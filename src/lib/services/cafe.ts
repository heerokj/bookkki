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
export const fetchSearchCafe = async (searchText: string) => {
  const keyword = searchText.trim();
  if (!keyword) return [];

  try {
    const res = await fetch(
      `/api/searchCafe?keyword=${encodeURIComponent(keyword)}`
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
