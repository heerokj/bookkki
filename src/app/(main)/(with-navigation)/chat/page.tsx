import ChatForm from "@/components/chat/ChatRoomForm";
import ChatList from "@/components/chat/ChatRoomList";

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
