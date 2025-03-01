"use client";
import { useActionState } from "react";
import Profile2 from "../Profile2";
import createCommentAction from "@/action/create-comment-action";

export default function CommentEditor({
  focusTest,
  postId,
}: {
  focusTest: React.RefObject<HTMLInputElement | null>;
  postId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    createCommentAction,
    null
  );

  return (
    <form action={formAction}>
      <div className="comment-input flex gap-2 border-t-[1px] p-3">
        <Profile2 />
        {/* readOnly적어줘야한다. */}
        <input type="text" name="postId" value={postId} hidden readOnly />
        <input
          type="text"
          name="comment"
          placeholder="댓글 달기..."
          ref={focusTest}
          className="w-full p-2"
          disabled={isPending}
        />
        <button type="submit" className="relative w-[70px] h-[10px] p-2">
          {isPending ? "..." : "게시"}
        </button>
      </div>
    </form>
  );
}
