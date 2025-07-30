// API 라우트 호출 (api/cafes/..)

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
