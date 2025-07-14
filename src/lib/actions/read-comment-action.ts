"use server";

import { createClient } from "@/shared/utils/supabase/server";
import { FeedComment } from "@/types/feed";

export const fetchCommentListAction = async (postId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
        *,
        users!id(user_id, nickname, email, profile_url )
        `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true })
    .returns<FeedComment[]>();

  if (error) {
    console.error("댓글 데이터를 불러오는데 오류가 발생:", error);
    return null;
  }

  return data;
};
