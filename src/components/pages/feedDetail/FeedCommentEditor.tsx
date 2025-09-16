"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Profile from "../../common/Profile";
import { useForm } from "react-hook-form";
import { useInsertComment } from "@/hooks/use-comments";
import { FeedComment } from "@/types/feed";

type FormValues = {
  postId: string;
  comment: string;
};

export default function FeedCommentEditor({
  postId,
  setComments,
}: {
  postId: string;
  setComments: React.Dispatch<React.SetStateAction<FeedComment[]>>;
}) {
  const userData = useContext(UserContext);
  const mutation = useInsertComment();

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    if (!userData) {
      alert("로그인이 필요합니다!");
      return;
    }

    mutation.mutate(
      {
        userId: userData.id,
        postId: data.postId,
        comment: data.comment,
      },
      {
        onSuccess: (data) => {
          if (data) {
            setComments((prev) => [...prev, data[0]]);
            reset();
          }
        },
      }
    );
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
