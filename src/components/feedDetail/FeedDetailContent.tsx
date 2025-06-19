"use client";
import { FeedComment, FeedData } from "@/types/feed";
import { useContext, useRef, useState } from "react";
import { deleteComment } from "@/lib/services/comments";
import { UserContext } from "@/context/UserContext";
import { getDistanceToNow } from "@/shared/utils/Date/date";
import Profile from "../common/Profile";
import FeedCommentEditor from "./FeedCommentEditor";
import FeedLikeContainer from "./FeedLikeContainer";
import FeedProfileContainer from "./FeedProfileContainer";
export default function FeedDetailContent({
  feedData,
  commentDataList,
}: {
  feedData: FeedData;
  commentDataList: FeedComment[];
}) {
  const userData = useContext(UserContext);
  const focusTest = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<FeedComment[]>(commentDataList);

  const handleCommentDelete = async (commentId: string, postId: string) => {
    const isConfirmed = window.confirm("삭제하시겠습니까?");
    if (!isConfirmed) return;
    const data = await deleteComment(commentId, postId);
    setComments(data?.commentDataList as FeedComment[]);
  };

  const handleCommentUpdate = async () => {};

  return (
    <div className="feed-contents flex flex-col justify-between border-[1px] rounded-sm">
      <FeedProfileContainer feedUser={feedData.users} />
      <div className="comments-section px-6 h-[280px] overflow-y-auto">
        <div className="pb-4">{feedData.content}</div>
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
      <FeedLikeContainer feedData={feedData} focusTest={focusTest} />
      <FeedCommentEditor
        postId={feedData.id}
        focusTest={focusTest}
        onCommentAdd={(newComment) =>
          setComments((prev) => [...prev, newComment])
        }
      />
    </div>
  );
}
