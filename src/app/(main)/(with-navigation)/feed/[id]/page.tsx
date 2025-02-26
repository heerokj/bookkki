import Profile from "@/components/Profile";
import Profile2 from "@/components/Profile2";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function FeedDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("id", params.id);

  if (error) {
    console.error(error);
    return <div>데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="write-icon-container flex justify-end">
        <Link href={"/feed"} className="p-4">
          <img src="/icons/arrow-left.svg" alt="arrow" width={20} height={20} />
        </Link>
      </div>
      <div className="grid grid-cols-2 mb-[50px] h-[500px]">
        <div className="feed-image w-full h-full overflow-hidden">
          {data[0].image_urls?.map((img) => (
            <div key={img} className="w-full h-full">
              <img src={img} alt="img" className="w-full h-full object-fill" />
            </div>
          ))}
        </div>
        <div
          key={data[0].id}
          className="feed-contents flex flex-col justify-between border-[1px] rounded-sm"
        >
          <div className="feed-profile flex justify-between p-3 border-b-[1px]">
            <div className="flex gap-2">
              <Profile />
              <div>nickname</div>
            </div>
            <button>
              <img src="/icons/ellipsis.svg" alt="ellipsis" width={20} />
            </button>
          </div>
          <div className="comments-section p-6 h-[280px] overflow-y-auto">
            <div>{data[0].content}</div>
            <div>댓글들</div>
          </div>
          <div className="border-t-[1px] p-3">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <button>
                  <img src="/icons/heart-black.svg" alt="heart" />
                </button>
                <button>
                  <img src="/icons/message-circle.svg" alt="message" />
                </button>
              </div>
              <button>
                <img src="/icons/bookmark.svg" alt="bookmark" />
              </button>
            </div>
            <div>
              <div className="pt-2">좋아요 00개 </div>
              <div className="text-[10px]">{data[0].created_at}</div>
            </div>
          </div>
          <div className="comment-input flex gap-2 border-t-[1px] p-3">
            <Profile2 />
            <input
              type="text"
              placeholder="댓글 달기..."
              className="w-full p-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}
