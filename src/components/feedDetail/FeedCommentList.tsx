"use client";
import React from "react";
import Profile from "../common/Profile";
import { getDistanceToNow } from "@/shared/utils/Date/date";
import { FeedComment, FeedData } from "@/types/feed";
import { deleteComment } from "@/lib/services/comments";
import { User } from "@/types/user";

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
  const handleCommentDelete = async (commentId: string, postId: string) => {
    const isConfirmed = window.confirm("삭제하시겠습니까?");
    if (!isConfirmed) return;
    const data = await deleteComment(commentId, postId);
    setComments(data?.commentDataList as FeedComment[]);
  };

  const handleCommentUpdate = async () => {};

  return (
    <div className="comments-section px-6 h-[280px] overflow-y-auto">
      <div className="p-4">{feedData.content}</div>
      <div>
        {comments.map((comment) => (
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
                <div>{comment.comment}</div>
              </div>
            </div>
            {/* 오른쪽 부분 */}
            {comment.users?.nickname === userData?.nickname && (
              <div className="button-bundle text-[11px] flex-[1] pl-2">
                <button className="p-[2px]" onClick={handleCommentUpdate}>
                  수정
                </button>
                <button
                  className="p-[2px]"
                  onClick={() => handleCommentDelete(comment.id, feedData.id)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
