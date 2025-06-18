"use client";

import { addChatRoom, fetchChatRoom } from "@/lib/services/chats";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useInfiniteChatRoom = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["chatRooms"],
      queryFn: ({ pageParam }) => fetchChatRoom(pageParam, 20),
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

export function useAddChatRoom() {
  const queryClient = useQueryClient(); // React Query 캐시 업데이트

  return useMutation({
    mutationFn: addChatRoom, // ✅ return 값이 있으므로 사용 가능
    onSuccess: () => {
      // 성공 시, 기존 채팅방 목록을 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["chatRooms"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
