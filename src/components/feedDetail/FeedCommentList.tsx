"use client";
import React, { useRef, useState } from "react";
import Profile from "../common/Profile";
import { getDistanceToNow } from "@/shared/utils/Date/date";
import { FeedComment, FeedData } from "@/types/feed";
import { deleteComment } from "@/lib/services/comments";
import { User } from "@/types/user";
import { useUpdateComment } from "@/hooks/use-comments";

export default function FeedCommentList({
  feedData,
  userData,
  comments,
  setComments,
}: {
  feedData: FeedData;

  userData: User;
  comments: FeedComment[];
  setComments: React.Dispatch<React.SetStateAction<FeedComment[]>>;
}) {
  const [editTargetId, setEditTargetId] = useState<number | null>(null);
  const [editComment, setEditComment] = useState("");
  const inputRef = useRef(null);

  const mutation = useUpdateComment();

  // 저장버튼
  const handleClickSave = async () => {
    mutation.mutate(
      {
        commentId: editTargetId as number,
        comment: editComment as string,
      },
      {
        onSuccess: (data) => {
          if (data) {
            const updatedComment = comments.map((comment) => {
              if (comment.id === data[0].id) {
                return {
                  ...comment,
                  comment: data[0].comment,
                };
              } else {
                return comment;
              }
            });
            setComments(updatedComment);
          }
          setEditTargetId(null);
          setEditComment("");
        },
      }
    );
  };

  //취소버튼
  const handleClickCancel = (id: number) => {
    if (editTargetId !== id) return;
    setEditTargetId(null);
    setEditComment("");
  };

  // 수정버튼
  const handleClickUpdate = (id: number, comment: string) => {
    setEditTargetId(id);
    setEditComment(comment);
  };

  // 삭제버튼
  const handleClickDelete = async (commentId: number, postId: string) => {
    const isConfirmed = window.confirm("삭제하시겠습니까?");
    if (!isConfirmed) return;
    const data = await deleteComment(commentId, postId);
    setComments(data?.commentDataList as FeedComment[]);
  };

  return (
    <div className="comments-section px-4 pb-4 h-[280px] overflow-y-auto">
      <div className="p-4">{feedData.content}</div>
      <div>
        {comments.map((comment) => {
          const isEditing = comment.id === editTargetId;

          return (
            <div key={comment.id} className="flex justify-between py-2">
              {/* 왼쪽 부분 */}
              <div className="flex gap-2 flex-[8]">
                <Profile info={comment.users} />
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="text-[#313d44] font-bold">
                      {comment.users?.nickname}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {getDistanceToNow(comment.created_at)}
                    </p>
                  </div>

                  {isEditing ? (
                    <input
                      ref={inputRef}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className=""
                    />
                  ) : (
                    <div className="w-full">{comment.comment}</div>
                  )}
                </div>
              </div>

              {/* 오른쪽 부분 */}
              {comment.users?.nickname === userData?.nickname && (
                <div className="button-bundle text-sm flex-[1] pl-2">
                  <button
                    className="p-[2px]"
                    onClick={() =>
                      isEditing
                        ? handleClickSave()
                        : handleClickUpdate(comment.id, comment.comment)
                    }
                  >
                    {isEditing ? "저장" : "수정"}
                  </button>

                  <button
                    className="p-[2px]"
                    onClick={() =>
                      isEditing
                        ? handleClickCancel(comment.id)
                        : handleClickDelete(comment.id, feedData.id)
                    }
                  >
                    {isEditing ? "취소" : "삭제"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
