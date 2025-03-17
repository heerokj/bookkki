"use client";

import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

const fetchChatRoom = async () => {
  try {
    const { error, data } = await supabase.from("chat").select();
    if (error) {
      console.error("채팅방 목록을 불러오는데 실패했습니다", error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export function useChatRoom() {
  return useQuery({
    queryKey: ["chatRooms"],
    queryFn: fetchChatRoom,
  });
}

const addChatRoom = async (roomTitle: string) => {
  alert("등록하시겠습니까?");

  try {
    const { error, data } = await supabase
      .from("chat")
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

export function useAddChatRoom() {
  const queryClient = useQueryClient(); // React Query 캐시 업데이트

  return useMutation({
    mutationFn: addChatRoom, // ✅ return 값이 있으므로 사용 가능
    onSuccess: () => {
      // 성공 시, 기존 채팅방 목록을 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["chatRooms"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
