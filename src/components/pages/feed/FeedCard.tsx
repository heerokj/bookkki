"use client";
import { FeedData } from "@/types/feed";
// import { useSession } from "next-auth/react";
import { UserContext } from "@/context/UserContext";
import { useDeleteFeed } from "@/hooks/use-feeds";
import { getDistanceToNow } from "@/shared/utils/Date/date";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Profile from "../../common/Profile";

export default function FeedCard(feedData: FeedData) {
  const { mutate: deleteFeed } = useDeleteFeed();
  const userData = useContext(UserContext);

  const handleDeleteFeed = () => {
    const isConfirmed = window.confirm("삭제하시겠습니까?");
    if (!isConfirmed) return;
    deleteFeed(feedData.id);
  };

  return (
    <>
      {feedData ? (
        <div
          key={feedData.id}
          className="feed-container border-[1px] rounded-2xl shadow-sm hover:scale-[1.02]"
        >
          <div className="feed-heading flex justify-between p-2">
            <div className="flex items-center gap-2">
              <Profile info={feedData.users} size={35} />
              <div>{feedData.users.nickname}</div>
            </div>
            {feedData.users.nickname === userData?.nickname && (
              <button onClick={handleDeleteFeed}>삭제</button>
            )}
          </div>
          <Link
            className="feed-body"
            href={`/feed/${feedData.id}`}
            // onClick={handleClickFeedCard}
          >
            <div className="overflow-hidden">
              {feedData.image_urls && (
                <div className="h-[300px]">
                  <Image
                    src={feedData.image_urls[0]}
                    alt="img"
                    height={250}
                    width={300}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="h-[65px] p-2">
              <div>{feedData.title}</div>
              <div className="text-[10px]">
                {getDistanceToNow(feedData.created_at)}
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div>피드가 없습니다. </div>
      )}
    </>
  );
}
