"use client";

import Avatar from "boring-avatars";
import Image from "next/image";

interface FeedUser {
  email: string;
  nickname: string;
  profile_url: string;
  user_id: string;
}

export default function FeedContentProfileContainer({
  feedUser,
}: {
  feedUser: FeedUser;
}) {
  return (
    <div className="feed-profile flex justify-between p-3 border-b-[1px]">
      <div className="flex gap-2">
        {feedUser.profile_url ? (
          <div className="w-[35px] h-[35px] overflow-hidden">
            <Image
              src={feedUser.profile_url}
              width={40}
              height={40}
              alt={feedUser.user_id ?? "Avatar"}
              style={{ borderRadius: "50%" }}
              className="w-full h-full object-full"
            />
          </div>
        ) : (
          <Avatar name="Harriet Tubman" variant="beam" size={30} />
        )}
        <div>{feedUser.nickname}</div>
      </div>
      <button onClick={() => alert("추후 업데이트 될 예정입니다🙂")}>
        <img src="/icons/ellipsis.svg" alt="ellipsis" width={20} />
      </button>
    </div>
  );
}
