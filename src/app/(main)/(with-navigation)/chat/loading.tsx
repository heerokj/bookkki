import ChatListSkeleton from "@/components/skeleton/ChatListSkeleton";
import React from "react";

export default function Loading() {
  const count = 16;

  return (
    <div className="my-10 flex flex-wrap justify-center gap-8">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <ChatListSkeleton key={index} />
        ))}
    </div>
  );
}
