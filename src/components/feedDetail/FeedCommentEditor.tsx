"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Profile from "../common/Profile";
import { useForm } from "react-hook-form";
import { useInsertComment } from "@/hooks/use-comments";

type FormValues = {
  postId: string;
  comment: string;
};

export default function FeedCommentEditor({
  postId,
}: {
  focusTest: React.RefObject<HTMLInputElement | null>;
  postId: string;
}) {
  const userData = useContext(UserContext);
  const mutation = useInsertComment();

  const { register, handleSubmit, getValues, reset } = useForm<FormValues>();
  console.log("🚀 ~ getValues:", getValues);
  console.log("🚀 ~ reset:", reset);

  if (!userData) return <div>유저 정보가 없습니다!</div>;

  const onSubmit = (data: FormValues) => {
    mutation.mutate({
      userId: userData.id,
      postId: data.postId,
      comment: data.comment,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="comment-input flex items-center gap-3 border-t-[1px] p-3">
        <Profile info={userData} />
        <input
          {...register("postId")}
          type="text"
          id="postId"
          value={postId}
          hidden
          readOnly
        />
        <input
          {...register("comment")}
          type="text"
          id="comment"
          placeholder="댓글 달기..."
          className="w-full p-2"
        />
        <button
          type="submit"
          className="w-[70px] h-[10px] text-lg mb-3 hover:text-gray-600"
        >
          게시
        </button>
      </div>
    </form>
  );
}
