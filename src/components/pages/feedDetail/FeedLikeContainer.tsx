"use client";

import { getDistanceToNow } from "@/shared/utils/Date/date";
import { FeedData } from "@/types/feed";
import Image from "next/image";
import React, { MutableRefObject } from "react";

export default function FeedLikeContainer({
  feedData,
  focusTest,
}: {
  feedData: FeedData;
  focusTest: MutableRefObject<HTMLElement | null>;
}) {
  return (
    <div className="border-t-[1px] p-3">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <button onClick={() => alert("추후 업데이트 될 예정입니다🙂")}>
            <Image
              src="/icons/heart-black.svg"
              height={20}
              width={20}
              alt="heart"
            />
          </button>
          <button onClick={() => focusTest.current?.focus()}>
            <Image
              src="/icons/message-circle.svg"
              height={20}
              width={20}
              alt="message"
            />
          </button>
        </div>
        <button onClick={() => alert("추후 업데이트 될 예정입니다🙂")}>
          <Image
            src="/icons/bookmark.svg"
            height={20}
            width={20}
            alt="bookmark"
          />
        </button>
      </div>
      <div>
        <div className="pt-2">좋아요 00개 </div>
        <div className="text-[10px]">
          {" "}
          {getDistanceToNow(feedData.created_at)}
        </div>
      </div>
    </div>
  );
}
