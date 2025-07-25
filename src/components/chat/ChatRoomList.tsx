"use client";

import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useInfiniteChatRoom } from "@/hooks/use-chats";
import Loading from "@/app/(main)/(with-navigation)/chat/loading";
import BlueButton from "../common/BlueButton";

export default function ChatList() {
  const [ref, inView] = useInView();
  const session = useSession();
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteChatRoom();

  const chatRoomList = data?.pages.flatMap((page) => page?.data) || [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleClickChatRoom = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!session.data) {
      alert("로그인이 필요합니다");
      e.preventDefault();
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <span>오류가 발생했습니다 : {error.message}</span>;

  return (
    <>
      <div className="my-10 flex flex-wrap justify-center gap-8">
        {chatRoomList && chatRoomList.length > 0 ? (
          chatRoomList.map((chat) => (
            <div
              key={chat.id}
              className="border-2 rounded-md w-60 h-36 flex flex-col gap-6 p-4 items-center justify-between"
            >
              <p className="text-base">{chat.chat_room_title}</p>
              <Link href={`/chat/${chat.id}`} onClick={handleClickChatRoom}>
                <BlueButton title="입장하기" width="w-44" />
              </Link>
            </div>
          ))
        ) : (
          <div>채팅방이 없습니다.</div>
        )}
      </div>
      <div ref={ref} className="text-center">
        {hasNextPage ? <div>더보기</div> : <div>모든 방을 불러왔습니다.</div>}
      </div>
    </>
  );
}
