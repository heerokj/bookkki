"use client";
import { useActionState, useContext, useEffect } from "react";
import { FeedComment } from "@/types/feed";
import Image from "next/image";
import Avatar from "boring-avatars";
import createCommentAction from "@/lib/actions/create-comment-action";
import { UserContext } from "@/context/UserContext";

export default function CommentEditor({
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
      <div className="comment-input flex gap-2 border-t-[1px] p-3">
        {userData && userData.profile_url ? (
          <div className="w-[35px] h-[35px] overflow-hidden">
            <Image
              src={userData.profile_url}
              width={40}
              height={40}
              alt={userData.nickname ?? "Avatar"}
              style={{ borderRadius: "50%" }}
              className="w-full h-full object-full"
            />
          </div>
        ) : (
          <Avatar name="Sacagawea" variant="beam" size={30} />
        )}
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
