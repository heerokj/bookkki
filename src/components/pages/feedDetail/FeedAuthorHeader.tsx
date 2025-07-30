"use client";

import { FeedUser } from "@/types/feed";
import Profile from "../../common/Profile";

export default function FeedAuthorHeader({ feedUser }: { feedUser: FeedUser }) {
  return (
    <div className="feed-profile flex justify-between p-3 border-b-[1px]">
      <div className="flex gap-3 items-center">
        <Profile info={feedUser} />
        <div className="text-lg">{feedUser.nickname}</div>
      </div>
      {/* <button onClick={() => alert("추후 업데이트 될 예정입니다🙂")}>
        <img src="/icons/ellipsis.svg" alt="ellipsis" width={20} />
      </button> */}
    </div>
  );
}
