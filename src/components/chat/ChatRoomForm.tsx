"use client";

import { useState } from "react";
import ChatRoomCrateModal from "./ChatRoomCreateModal";
import { useSession } from "next-auth/react";

export default function ChatForm() {
  const [showModal, setShowModal] = useState(false);
  const session = useSession();

  const onHandleModalStatus = () => {
    if (!session.data) {
      alert("로그인이 필요합니다");
      return;
    }
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="write-icon-container flex justify-end p-4">
        <button type="button" onClick={onHandleModalStatus}>
          <img src="/icons/square-plus.svg" alt="plus" width={20} height={20} />
        </button>
      </div>
      {showModal && (
        <ChatRoomCrateModal
          title="채팅방을 생성하세요"
          setModal={onHandleModalStatus}
        />
      )}
    </>
  );
}
