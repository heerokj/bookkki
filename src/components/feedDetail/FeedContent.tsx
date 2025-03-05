"use client";
import { FeedComment, FeedData } from "@/types/feed";
import FeedContentProfileContainer from "./FeedContentProfileContainer";
import FeedContentLikeContainer from "./FeedContentLikeContainer";
import CommentEditor from "./CommentEditor";
import { useRef, useState } from "react";
export default function FeedContent({
  feedData,
  commentDataList,
}: {
  feedData: FeedData;
  commentDataList: FeedComment[];
}) {
  const focusTest = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<FeedComment[]>(commentDataList);

  return (
    <div className="feed-contents flex flex-col justify-between border-[1px] rounded-sm">
      <FeedContentProfileContainer />
      <div className="comments-section p-6 h-[280px] overflow-y-auto">
        <div className="pb-4">{feedData.content}</div>
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 py-2">
              <div>프로필</div>
              <div>
                <div className="flex gap-2">
                  <span className="text-[#313d44] font-bold">heerok</span>
                  <div>{comment.comment}</div>
                </div>
                <div>{comment.created_at}</div>
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
          setComments((prev) => [newComment, ...prev])
        }
      />
    </div>
  );
}
