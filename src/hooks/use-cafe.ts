import {
  fetchCafeList,
  fetchSearchCafe,
  fetchSearchCafe1,
} from "@/lib/services/cafe";
import { normalizeItem } from "@/shared/utils/normalizeItem";
import { CafeData } from "@/types/cafe";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetInitialCafe = () => {
  return useQuery<CafeData[]>({
    queryKey: ["cafes"],
    queryFn: fetchCafeList,
    staleTime: 1000 * 60 * 5,
  });
};

//서치
export const useGetSearchCafe1 = (keyword: string) => {
  const { data, isLoading, isError } = useQuery<CafeData[]>({
    queryKey: ["cafeSearch", keyword], //NOTE - keyword
    queryFn: () => fetchSearchCafe1(keyword),
    enabled: Boolean(keyword?.trim()), // keyword가 있을 경우만 쿼리 실행 (undefined인 경우도 실행X)
    staleTime: 1000 * 60 * 60 * 1, // 1시간
  });

  return { searchList: normalizeItem(data), isLoading, isError };
};

//서치 무한스크롤
export const useGetSearchCafe = (keyword: string) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["cafeSearch", keyword, "infinite"],
      queryFn: ({ pageParam }) => fetchSearchCafe(keyword, 5, pageParam),
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
    error,
    fetchNextPage,
    hasNextPage,
  };
};
