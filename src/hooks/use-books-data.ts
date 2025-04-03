import { useInfiniteQuery } from "@tanstack/react-query";

export const fetchBooksDatas = async (
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

export default function useInfiniteBooksData({
  bookTitle,
}: {
  bookTitle: string;
}) {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["books", bookTitle],
      queryFn: ({ pageParam }) => fetchBooksDatas(bookTitle, pageParam, 10),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지가 있으면 현재 페이지 + 1
        return lastPage?.hasNext ? allPages.length + 1 : undefined;
      },
    });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  };
}
