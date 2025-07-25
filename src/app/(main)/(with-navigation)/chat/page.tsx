import ChatRoomForm from "@/components/pages/chat/ChatRoomForm";
import ChatRoomList from "@/components/pages/chat/ChatRoomList";
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
      <ChatRoomForm />
      <ChatRoomList />
    </div>
  );
}
