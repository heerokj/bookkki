import { FeedData } from "@/types/feed";
import Link from "next/link";
import Profile from "../Profile";

export default function FeedCard(data: FeedData) {
  return (
    <>
      {data ? (
        <div key={data.id} className="feed-item border-[1px] rounded-sm">
          <div className="flex justify-between p-2">
            <div className="flex gap-2">
              <Profile />
              <div>nickname</div>
            </div>
            <button>
              <img src="/icons/ellipsis.svg" alt="ellipsis" width={15} />
            </button>
          </div>
          <Link href={`/feed/${data.id}`}>
            <div>
              {data.image_urls?.map((img) => (
                <div key={img}>
                  <img src={img} alt="img" className="object-fill" />
                </div>
              ))}
            </div>
            <div className="p-2">
              <div>{data.title}</div>
              <div className="text-[10px]">{data.created_at}</div>
            </div>
          </Link>
        </div>
      ) : (
        <div>피드가 없습니다. </div>
      )}
    </>
  );
}
