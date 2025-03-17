import ChatForm from "@/components/chat/ChatRoomForm";
import ChatList from "@/components/chat/ChatRoomList";

export default function ChattingPage() {
  return (
    <div className="mb-6">
      <ChatForm />
      <ChatList />
    </div>
  );
}
