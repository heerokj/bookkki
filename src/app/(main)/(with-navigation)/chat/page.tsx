import ChatForm from "@/components/chat/ChatRoomForm";
import ChatList from "@/components/chat/ChatRoomList";
import { META } from "@/shared/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "채팅 - 북끼 ",
  description: "유저들이 소통할 수 있는 채팅 페이지입니다.",
  openGraph: {
    title: "채팅 - 북끼",
    description: "북끼에서 우리 같이 실시간 소통해요!",
    images: META.ogImage,
  },
};

export default function ChattingPage() {
  return (
    <div className="mb-6">
      <ChatForm />
      <h1 className="text-3xl font-bold text-center py-8">
        북끼 회원들과 소통해보세요!
      </h1>
      <ChatList />
    </div>
  );
}
