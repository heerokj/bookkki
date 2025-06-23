"use server";

import { createClient } from "@/shared/utils/supabase/server";
import { FeedData } from "@/types/feed";

export const fetchFeedDetailAction = async (postId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
          *,
          users!id(user_id, nickname, email, profile_url )
          `
    )
    .eq("id", postId)
    .returns<FeedData[]>();

  if (error || !data || data.length === 0) {
    console.error("포스트 데이터를 불러오는데 오류가 발생:", error);
    return null;
  }

  return data[0];
};
