"use server";
import { FeedComment } from "@/types/feed";
import { createClient } from "@/utils/supabase/server";

type StateType = {
  status: boolean;
  error: string;
  data?: FeedComment[] | null;
};

//서버 액션 역할을 할 함수
export default async function createCommentAction(
  prevState: StateType | null,
  formData: FormData
) {
  const supabase = await createClient();

  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;

  if (!comment || !postId) {
    return { status: false, error: "리뷰 내용을 입력해주세요." };
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        comment: comment,
        user_id: "2bfde77a-cf38-42e0-9293-6bcc277de8ad",
      })
      .select();

    if (error) {
      console.error(error);
    }
    //성공했다면 클라이언트 컴포넌트에 전달
    return {
      status: true,
      error: "",
      data,
    };
  } catch (error) {
    return { status: false, error: `리뷰 등록에 실패했습니다. : ${error}` };
  }
}
