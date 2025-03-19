//댓글 API 코드
"use client";
import { FeedComment } from "@/types/feed";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

//댓글 가져오기
export async function getCommentLists(post_id: string) {
  try {
    const { data: commentDataList, error: commentFetchError } = await supabase
      .from("comments")
      .select()
      .eq("post_id", post_id)
      .returns<FeedComment[]>();

    if (commentFetchError) {
      console.error(commentFetchError.message);
    }
    return { commentDataList, commentFetchError };
  } catch (error) {
    console.error(error);
  }
}

//댓글 삭제하기
export async function deleteComment(commentId: string, postId: string) {
  try {
    const { error: commentDeleteError } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .returns<FeedComment[]>();

    if (commentDeleteError) {
      console.error(commentDeleteError.message);
      return;
    }

    const data = await getCommentLists(postId);
    return data;
  } catch (error) {
    console.error(error);
  }
}
