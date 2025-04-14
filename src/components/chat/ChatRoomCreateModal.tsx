"use client";

import { useAddChatRoom } from "@/hooks/use-chats";
import { ModalProps } from "@/types/chat";
import React, { useEffect, useState } from "react";

const ChatRoomCrateModal = ({ title, setModal }: ModalProps) => {
  const [roomTitle, setRoomTitle] = useState("");
  const { mutate, isPending } = useAddChatRoom();

  // 모달 내부를 눌렀을 때 모달이 꺼지는 것을 방지
  const preventOffModal = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // 모달이 뜬 상태에서는 뒷 화면 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomTitle.trim()) return alert("방 제목을 입력해주세요");

    if (confirm("채팅방을 생성하시겠습니까?")) {
      mutate(roomTitle);
      setRoomTitle("");
      setModal();
    }
  };

  return (
    <div
      id="모달 외부"
      onClick={setModal}
      className="fixed inset-0 flex justify-center items-center text-center w-full h-full bg-gray-500/50"
    >
      <div
        id="모달"
        onClick={preventOffModal}
        className="bg-white w-1/3 h-1/4 rounded-md p-5"
      >
        <div className="text-gray-400 font-bold text-[20px] py-6">{title}</div>

        <div className="flex gap-2 justify-center my-8 ">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-[200px] mr-2"
              onChange={(e) => setRoomTitle(e.target.value)}
              value={roomTitle}
              placeholder="채팅방 이름"
            />
            <button className="w-[100px] h-[35px] rounded-md bg-[#84bbe1] hover:bg-[#00bbf9] text-white text-[13px]">
              {isPending ? "..." : "생성"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomCrateModal;
