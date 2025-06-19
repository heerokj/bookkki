import { queryKeys } from "@/shared/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

// API 라우트 호출
export const fetchBooksData = async (
  bookTitle: string,
  pageParam: number,
  display: number
) => {
  const res = await fetch(
    `/api/books?query=${bookTitle}&page=${pageParam}&display=${display}`
  );

  if (!res.ok) {
    throw new Error("책 데이터를 가져오는 데 실패했습니다.");
  }

  return res.json();
};

// useInfiniteQuery
export default function useInfiniteBooksData({
  bookTitle,
}: {
  bookTitle: string;
}) {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.search.all(bookTitle),
      queryFn: ({ pageParam }) => fetchBooksData(bookTitle, pageParam, 10),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지가 있으면 현재 페이지 + 1
        return lastPage?.hasNext ? allPages.length + 1 : undefined;
      },
      refetchOnWindowFocus: false, // 창이 포커스를 받아도 자동 리패치 X
    });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  };
}
