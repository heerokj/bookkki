"use client";
import { FeedData } from "@/types/feed";
import FeedContentProfileContainer from "./FeedContentProfileContainer";
import FeedContentLikeContainer from "./FeedContentLikeContainer";
import CommentEditor from "./CommentEditor";
import { useRef } from "react";

export default function FeedContent({ feedData }: { feedData: FeedData }) {
  const focusTest = useRef<HTMLInputElement>(null);
  return (
    <div
      key={feedData.id}
      className="feed-contents flex flex-col justify-between border-[1px] rounded-sm"
    >
      <FeedContentProfileContainer />
      <div className="comments-section p-6 h-[280px] overflow-y-auto">
        <div>{feedData.content}</div>
        <div>댓글들</div>
      </div>
      <FeedContentLikeContainer feedData={feedData} focusTest={focusTest} />
      <CommentEditor focusTest={focusTest} postId={feedData.id} />
    </div>
  );
}
