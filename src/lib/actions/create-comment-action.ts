"use server";
import { auth } from "@/auth";
import { createClient } from "@/shared/utils/supabase/server";
import { FeedComment } from "@/types/feed";

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
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("로그인이 필요합니다.");
  }

  const supabase = await createClient();

  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;

  if (!comment || !postId) {
    return { status: false, error: "리뷰 내용을 입력해주세요." };
  }

  try {
    const { data, error } = await supabase.from("comments").insert({
      post_id: postId,
      comment: comment,
      user_id: session.user.id,
    }).select(`
    *,
    users!id(user_id, nickname, email, profile_url)
  `);

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
