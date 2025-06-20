"use client";

import { insertComment, updateComment } from "@/lib/services/comments";
import { queryKeys } from "@/shared/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 댓글 등록
export const useInsertComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      postId,
      comment,
    }: {
      userId: string;
      postId: string;
      comment: string;
    }) => insertComment(userId, postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comment.all });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};

// 댓글 수정
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, comment }: { postId: string; comment: string }) =>
      updateComment(postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comment.all });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
