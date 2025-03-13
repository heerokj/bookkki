"use client";
import { FeedData } from "@/types/feed";
import Link from "next/link";
import Profile from "../Profile";
import { getDistanceToNow } from "@/utils/Date/date";

export default function FeedCard(data: FeedData) {
  return (
    <>
      {data ? (
        <div
          key={data.id}
          className="feed-container border-[1px] rounded-sm shadow-sm hover:scale-[1.02]"
        >
          <div className="feed-heading flex justify-between p-2">
            <div className="flex gap-2">
              <Profile />
              <div>nickname</div>
            </div>
            <button onClick={() => alert("준비중입니다.")}>
              <img src="/icons/ellipsis.svg" alt="ellipsis" width={15} />
            </button>
          </div>
          <Link className="feed-body" href={`/feed/${data.id}`}>
            <div className="overflow-hidden">
              {data.image_urls?.map((img) => (
                <div key={img} className="h-[300px]">
                  <img
                    src={img}
                    alt="img"
                    height={250}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="h-[65px] p-2">
              <div>{data.title}</div>
              <div className="text-[10px]">
                {getDistanceToNow(data.created_at)}
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
