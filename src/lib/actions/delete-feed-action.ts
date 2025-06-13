"use server";

import { createClient } from "@/shared/utils/supabase/server";

export async function deleteFeedAction(feedId: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", feedId);
    if (error) {
      throw new Error("피드를 삭제하는 중 오류 발생" + error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}
