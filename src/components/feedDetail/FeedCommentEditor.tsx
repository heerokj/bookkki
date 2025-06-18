"use client";
import { useActionState, useContext, useEffect } from "react";
import { FeedComment } from "@/types/feed";

import createCommentAction from "@/lib/actions/create-comment-action";
import { UserContext } from "@/context/UserContext";
import Profile from "../common/Profile";

export default function FeedCommentEditor({
  focusTest,
  postId,
  onCommentAdd,
}: {
  focusTest: React.RefObject<HTMLInputElement | null>;
  postId: string;
  onCommentAdd: (newComment: FeedComment) => void;
}) {
  const userData = useContext(UserContext);
  const [state, formAction, isPending] = useActionState(
    createCommentAction,
    null
  );

  useEffect(() => {
    if (state?.status && state?.data?.length) {
      onCommentAdd(state.data[0]);
    }
    focusTest.current?.focus();
  }, [state]);

  return (
    <form action={formAction}>
      <div className="comment-input flex items-center gap-3 border-t-[1px] p-3">
        <Profile info={userData} />
        <input type="text" name="postId" value={postId} hidden readOnly />
        <input
          type="text"
          name="comment"
          placeholder="댓글 달기..."
          ref={focusTest}
          className="w-full p-2"
          disabled={isPending}
        />
        <button
          type="submit"
          className="w-[70px] h-[10px] text-lg mb-3 hover:text-gray-600"
        >
          {isPending ? "..." : "게시"}
        </button>
      </div>
    </form>
  );
}
