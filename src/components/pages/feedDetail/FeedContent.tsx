"use client";
import { FeedComment, FeedData } from "@/types/feed";
import { useContext, useRef, useState } from "react";
import { UserContext } from "@/context/UserContext";
import FeedCommentEditor from "./FeedCommentEditor";
import FeedLikeContainer from "./FeedLikeContainer";
import FeedAuthorHeader from "./FeedAuthorHeader";
import FeedCommentList from "./FeedCommentList";

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

  return (
    <div className="feed-contents flex flex-col justify-between border-[1px] rounded-sm">
      <FeedAuthorHeader feedUser={feedData.users} />
      <FeedCommentList
        feedData={feedData}
        userData={userData}
        comments={comments}
        setComments={setComments}
      />
      <FeedLikeContainer feedData={feedData} focusTest={focusTest} />
      <FeedCommentEditor postId={feedData.id} setComments={setComments} />
    </div>
  );
}
