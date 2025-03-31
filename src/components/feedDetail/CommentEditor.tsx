"use client";
import { useActionState, useEffect } from "react";
import { FeedComment } from "@/types/feed";
import createCommentAction from "@/lib/actions/create-comment-action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "boring-avatars";

export default function CommentEditor({
  focusTest,
  postId,
  onCommentAdd,
}: {
  focusTest: React.RefObject<HTMLInputElement | null>;
  postId: string;
  onCommentAdd: (newComment: FeedComment) => void;
}) {
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(
    createCommentAction,
    null
  );

  useEffect(() => {
    if (state?.status && state?.data?.length) {
      onCommentAdd(state.data[0]); // 전체 객체를 전달해야 함
    }
    focusTest.current?.focus();
  }, [state]); // state가 변경될 때만 실행

  return (
    <form action={formAction}>
      <div className="comment-input flex gap-2 border-t-[1px] p-3">
        {session?.user && session.user.image ? (
          <div className="w-[35px] h-[35px] overflow-hidden">
            <Image
              src={session.user.image}
              width={40}
              height={40}
              alt={session.user.name ?? "Avatar"}
              style={{ borderRadius: "50%" }}
              className="w-full h-full object-full"
            />
          </div>
        ) : (
          <Avatar name="Sacagawea" variant="beam" size={30} />
        )}
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
