"use client";

import { useInfiniteChatRoom } from "@/hooks/useChatting";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useEffect } from "react";

export default function ChatList() {
  const [ref, inView] = useInView();
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteChatRoom();

  const chatRoomList = data?.pages.flatMap((page) => page?.data) || [];

  console.log("렌더링//./");

  useEffect(() => {
    // inView가 true 일때만 실행
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <span>로딩중입니다...</span>;
  if (error) return <span>오류가 발생했습니다 : {error.message}</span>;

  return (
    <div>
      <h1 className="text-[25px] font-bold text-center py-8">
        북끼 회원들과 소통해보세요!
      </h1>
      <div className="my-10 flex flex-wrap justify-center gap-8">
        {chatRoomList && chatRoomList.length > 0 ? (
          chatRoomList.map((chat) => (
            <div
              key={chat.id}
              className="border-2 rounded-md w-[250px] h-[200px] text-center"
            >
              <p className="py-[20px] text-[16px]">{chat.chat_room_title}</p>
              <Link href={`/chat/${chat.id}`}>
                <button className="p-[7px] w-[100px] mt-[30px] rounded-md bg-[#7cb8e2] hover:bg-[#00bbf9] text-white text-[14px]">
                  입장하기
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div>채팅방이 없습니다.</div>
        )}
      </div>
      <div ref={ref} className="text-center">
        {hasNextPage ? (
          <div>더보기</div>
        ) : (
          <div>모든 채팅방을 불러왔습니다.</div>
        )}
      </div>
    </div>
  );
}
