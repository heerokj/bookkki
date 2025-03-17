"use client";
import { useChatRoom } from "@/hooks/useChatting";

export default function ChatList() {
  const { isPending, isError, data, error } = useChatRoom();

  if (isPending) {
    return <span>로딩중입니다...</span>;
  }

  if (isError) {
    return <span>오류가 발생했습니다 : {error.message}</span>;
  }

  return (
    <div>
      <h1 className="text-[25px] font-bold">북끼 회원들과 소통해보아요</h1>
      <div className="my-10 flex flex-wrap justify-center gap-4">
        {data?.map((chat) => (
          <div
            key={chat.id}
            className="border-2 rounded-md w-[250px] h-[150px]"
          >
            <div>{chat.chat_room_title}</div>
            <button>입장하기</button>
          </div>
        ))}
      </div>
    </div>
  );
}
