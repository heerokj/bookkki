"use client";
import { FeedData } from "@/types/feed";
import { useSession } from "next-auth/react";
import { UserContext } from "@/context/UserContext";
import { useDeleteFeed } from "@/hooks/use-feeds";
import { getDistanceToNow } from "@/shared/utils/Date/date";
import { useContext } from "react";
import Image from "next/image";
import Avatar from "boring-avatars";
import Link from "next/link";

export default function FeedCard(feedData: FeedData) {
  const { mutate: deleteFeed } = useDeleteFeed();
  const userData = useContext(UserContext);
  const session = useSession();
  const handleClickFeedCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!session.data) {
      alert("로그인이 필요합니다");
      e.preventDefault();
    }
  };

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
          className="feed-container border-[1px] rounded-sm shadow-sm hover:scale-[1.02]"
        >
          <div className="feed-heading flex justify-between p-2">
            <div className="flex gap-2">
              {feedData.users.profile_url ? (
                <div className="w-[35px] h-[35px] overflow-hidden">
                  <Image
                    src={feedData.users.profile_url}
                    width={40}
                    height={40}
                    alt={feedData.users.user_id ?? "Avatar"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              ) : (
                <Avatar name="Sacagawea" variant="beam" size={30} />
              )}
              <div>{feedData.users.nickname}</div>
            </div>
            {feedData.users.nickname === userData?.nickname && (
              <button onClick={handleDeleteFeed}>삭제</button>
            )}
          </div>
          <Link
            className="feed-body"
            href={`/feed/${feedData.id}`}
            onClick={handleClickFeedCard}
          >
            <div className="overflow-hidden">
              {feedData.image_urls?.map((img) => (
                <div key={img} className="h-[300px] width-[300px]">
                  <Image
                    src={img}
                    alt="img"
                    height={250}
                    width={300}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
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
