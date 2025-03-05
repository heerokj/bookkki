"use server"; //TODO - use server꼭 적어줘야해?? 안쓰니까 오류났어
import { createClient } from "@/utils/supabase/server";

//서버 액션 역할을 할 함수
export default async function createCommentAction(_: any, formData: FormData) {
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
        user_id: "42d9022d-2a87-4e71-bf1b-369b5599d057",
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
