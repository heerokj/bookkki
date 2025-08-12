import { fetchCafeList, fetchSearchCafe } from "@/lib/services/cafe";
import { CafeData } from "@/types/cafe";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// 기본 카페 데이터
export const useGetInitialCafe = () => {
  return useQuery<CafeData[]>({
    queryKey: ["cafes"],
    queryFn: fetchCafeList,
    staleTime: 1000 * 60 * 60 * 1, // 1시간
  });
};

// 카페 검색 무한스크롤
export const useGetSearchCafe = (keyword: string) => {
  const { data, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["cafeSearch", keyword, "infinite"],
      queryFn: ({ pageParam }) => fetchSearchCafe(keyword, 6, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.hasNext ? allPages.length + 1 : undefined;
      },
      enabled: Boolean(keyword?.trim()), // keyword가 있을 경우만 쿼리 실행 (undefined인 경우도 실행X)
      staleTime: 1000 * 60 * 60 * 1, // 1시간
      refetchOnWindowFocus: false,
    });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  };
};
