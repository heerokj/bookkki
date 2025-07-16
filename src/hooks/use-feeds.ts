"use client";

import { deleteFeedAction } from "@/lib/actions/delete-feed-action";
import { fetchFeedList } from "@/lib/services/feeds";
import { queryKeys } from "@/shared/constants/queryKey";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetFeedList = () => {
  const { data, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.feeds.all,
      queryFn: ({ pageParam }) => fetchFeedList(pageParam, 9),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // lastPage : 직전에 반환된 리턴값
        // allPages : 이제까지 받아온 전체 페이지
        // 마지막 페이지가 있으면 현재 페이지 + 1
        return lastPage?.hasNext ? allPages.length + 1 : undefined; // 마지막 페이지일 경우 undefined를 리턴하여 hasNextPage값을 false로 설정
      },
      staleTime: 5000,
      refetchOnWindowFocus: false, // 창이 포커스를 받아도 자동 리패치 X
    });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage, // 다음 페이지를 요청할 때 사용되는 메서드
    hasNextPage, // 다음 페이지가 있는지 판별하는 boolean 값
  };
};

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedId: string) => deleteFeedAction(feedId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feeds.all });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
