"use client";
import { FeedComment, FeedData } from "@/types/feed";
import FeedContentProfileContainer from "./FeedContentProfileContainer";
import FeedContentLikeContainer from "./FeedContentLikeContainer";
import CommentEditor from "./CommentEditor";
import { useContext, useRef, useState } from "react";
import { deleteComment } from "@/services/comments";
import Image from "next/image";
import Avatar from "boring-avatars";
import { UserContext } from "@/context/UserContext";
import { getDistanceToNow } from "@/shared/utils/Date/date";
export default function FeedContent({
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
    alert("삭제하시겠습니까?");
    const data = await deleteComment(commentId, postId);
    setComments(data?.commentDataList as FeedComment[]);
  };

  const handleCommentUpdate = async () => {};

  return (
    <div className="feed-contents flex flex-col justify-between border-[1px] rounded-sm">
      <FeedContentProfileContainer feedUser={feedData.users} />
      <div className="comments-section p-6 h-[280px] overflow-y-auto">
        <div className="pb-4">{feedData.content}</div>
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="flex justify-between py-2">
              {/* 왼쪽 부분 */}
              <div className="flex gap-2 flex-[8]">
                {comment.users?.profile_url ? (
                  <div className="w-[35px] h-[35px] overflow-hidden">
                    <Image
                      src={comment.users.profile_url}
                      width={40}
                      height={40}
                      alt={comment.users.user_id ?? "Avatar"}
                      style={{ borderRadius: "50%" }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Avatar name="Sacagawea" variant="beam" size={30} />
                )}
                <div className="flex flex-col gap-2 ">
                  <div className="text-[#313d44] font-bold">
                    {comment.users?.nickname}
                  </div>
                  <div className="text-[10px]">
                    {getDistanceToNow(comment.created_at)}
                  </div>
                </div>
                <div>{comment.comment}</div>
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
      <FeedContentLikeContainer feedData={feedData} focusTest={focusTest} />
      <CommentEditor
        postId={feedData.id}
        focusTest={focusTest}
        onCommentAdd={(newComment) =>
          setComments((prev) => [...prev, newComment])
        }
      />
    </div>
  );
}
