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
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.feeds.all,
      queryFn: ({ pageParam }) => fetchFeedList(pageParam, 10),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지가 있으면 현재 페이지 + 1
        return lastPage?.hasNext ? allPages.length + 1 : undefined;
      },
      staleTime: 5000,
      refetchOnWindowFocus: false, // 창이 포커스를 받아도 자동 리패치 X
    });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
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
