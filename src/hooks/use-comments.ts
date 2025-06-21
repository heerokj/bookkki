"use client";

import {
  deleteComment,
  insertComment,
  updateComment,
} from "@/lib/services/comments";
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
    mutationFn: ({
      commentId,
      comment,
    }: {
      commentId: number;
      comment: string;
    }) => updateComment(commentId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comment.all });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};

// 댓글 삭제
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comment.all });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
