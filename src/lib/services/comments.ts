//댓글 API 코드
"use client";
import { FeedComment } from "@/types/feed";
import { createClient } from "@/shared/utils/supabase/client";

const supabase = createClient();

//한 포스터 내에서 댓글 등록하기
export async function insertComment(
  userId: string,
  postId: string,
  comment: string
) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({ user_id: userId, post_id: postId, comment: comment }).select(`
        *,
        users!id(user_id, nickname, email, profile_url)
        `);

    if (error) {
      console.error(error.message);
      return;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

//한 포스터 내에서 댓글 수정하기
export async function updateComment(commentId: number, comment: string) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .update({ comment: comment })
      .eq("id", commentId).select(`
        *,
        users!id(user_id, nickname, email, profile_url)
        `);

    if (error) {
      console.error(error.message);
      return;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

//한 포스터 내에서 댓글 삭제하기
export async function deleteComment(commentId: number) {
  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .returns<FeedComment[]>();

    if (error) {
      console.error(error.message);
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
