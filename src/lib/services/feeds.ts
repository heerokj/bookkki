"use client";

import { createClient } from "@/shared/utils/supabase/client";

const supabase = createClient();

export const fetchInitialFeedList = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .range(0, 4)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("최초 피드 목록을 불러오는데 실패했습니다", error.message);
    }
    return data;
  } catch (error) {
    console.error("최초 피드 목록을 불러오는데 실패했습니다", error);
  }
  return;
};

export const fetchFeedList = async (pageParam: number, limit: number) => {
  const from = (pageParam - 1) * limit;
  const to = pageParam * limit - 1;

  try {
    const { data, error, count } = await supabase
      .from("posts")
      .select(
        `
        *,
        users!id(user_id, nickname, email, profile_url )
        `,
        { count: "exact" }
      )
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error)
      console.error("피드 목록을 불러오는데 실패했습니다", error.message);

    const hasNext = to + 1 < (count || 0);

    return { data, hasNext, nextPage: pageParam + 1, count };
  } catch (error) {
    console.error(error);
    return { data: [], hasNext: false, nextPage: pageParam, count: 0 };
  }
};
