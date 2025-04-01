"use client";

import { deleteFeedAction } from "@/lib/actions/delete-feed-action";
import { fetchFeeds } from "@/lib/actions/read-feed-action";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetFeedList = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["feeds"],
      queryFn: ({ pageParam }) => fetchFeeds(pageParam, 10),
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
};

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedId: string) => deleteFeedAction(feedId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });
};
