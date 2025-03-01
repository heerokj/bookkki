"use client";
import Profile from "../Profile";

export default function FeedContentProfileContainer() {
  return (
    <div className="feed-profile flex justify-between p-3 border-b-[1px]">
      <div className="flex gap-2">
        <Profile />
        <div>nickname</div>
      </div>
      <button onClick={() => alert("추후 업데이트 될 예정입니다🙂")}>
        <img src="/icons/ellipsis.svg" alt="ellipsis" width={20} />
      </button>
    </div>
  );
}
