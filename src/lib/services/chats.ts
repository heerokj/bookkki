"use client";

import { createClient } from "@/shared/utils/supabase/client";

const supabase = createClient();

export const fetchChatRoom = async (pageParam: number, limit: number) => {
  const from = (pageParam - 1) * limit;
  const to = pageParam * limit - 1;

  try {
    const { data, error, count } = await supabase
      .from("chat_rooms")
      .select("*", { count: "exact" })
      .range(from, to);

    if (error) {
      console.error("채팅방 목록을 불러오는데 실패했습니다", error.message);
    }

    // data : 채팅 방 데이터
    // count : 총 데이터 수
    // hasNext : 다음 시작 데이터 유무 (t/f)
    // nextPage : 다음페이지
    const hasNext = to + 1 < (count || 0);
    return { data, count, hasNext, nextPage: pageParam + 1 };
  } catch (error) {
    console.error(error);
  }
};

export const addChatRoom = async (roomTitle: string) => {
  try {
    const { error, data } = await supabase
      .from("chat_rooms")
      .insert({
        chat_room_title: roomTitle,
      })
      .select();

    if (error) {
      console.error("채팅방 생성에 실패했습니다", error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("채팅방 생성에 실패했습니다.", error);
    throw new Error("채팅방 생성 오류");
    //NOTE -  useMutation에서 잡을 수 있도록 에러 던지기
    //throw new Error()가 없으면 useMutation에서 실패 감지를 못 함.
  }
};
