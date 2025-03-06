"use client";
import { FeedComment, FeedData } from "@/types/feed";
import FeedContentProfileContainer from "./FeedContentProfileContainer";
import FeedContentLikeContainer from "./FeedContentLikeContainer";
import CommentEditor from "./CommentEditor";
import { useRef, useState } from "react";
import Profile from "../Profile";
import { deleteComment } from "@/hooks/fetchComments";
export default function FeedContent({
  feedData,
  commentDataList,
}: {
  feedData: FeedData;
  commentDataList: FeedComment[];
}) {
  const focusTest = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<FeedComment[]>(commentDataList);

  const handleCommentDelete = async (commentId: string, postId: string) => {
    alert("삭제하시겠습니까?");
    const data = await deleteComment(commentId, postId);
    setComments(data?.commentDataList as FeedComment[]);
  };

  return (
    <div className="feed-contents flex flex-col justify-between border-[1px] rounded-sm">
      <FeedContentProfileContainer />
      <div className="comments-section p-6 h-[280px] overflow-y-auto">
        <div className="pb-4">{feedData.content}</div>
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="flex justify-between py-2">
              <div className="flex gap-2">
                <Profile />
                <div>
                  <div className="flex gap-2">
                    <span className="text-[#313d44] font-bold">heerok</span>
                    <div>{comment.comment}</div>
                  </div>
                  <div>{comment.created_at}</div>
                </div>
              </div>
              <div className="text-[12px]">
                <button className="p-[2px]">수정</button>
                <button
                  className="p-[2px]"
                  onClick={() => handleCommentDelete(comment.id, feedData.id)}
                >
                  삭제
                </button>
              </div>
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
