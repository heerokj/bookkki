import FeedContent from "@/components/feedDetail/FeedContent";
import FeedImage from "@/components/feedDetail/FeedImage";
import { createClient } from "@/utils/supabase/server";
import { FeedComment, FeedData } from "@/types/feed";
import Link from "next/link";

export default async function FeedDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const supabase = await createClient();

  // 포스트 데이터 가져오기
  const { data, error: feedError } = await supabase
    .from("posts")
    .select(
      `
        *,
        users!id(user_id, nickname, email, profile_url )
        `
    )
    .eq("id", id)
    .returns<FeedData[]>();

  // 댓글 데이터 가져오기
  const { data: commentDataList, error: commentError } = await supabase
    .from("comments")
    .select(
      `
      *,
      users!id(user_id, nickname, email, profile_url )
      `
    )
    .eq("post_id", id)
    .returns<FeedComment[]>();
  console.log("🚀 ~ commentDataList:", commentDataList);

  if (feedError) {
    console.error(feedError);
    return <div>데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  if (commentError) {
    console.error(commentError);
    return <div>댓글을 불러오는데 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="feed-image-container flex justify-end ">
        <Link href={"/feed"} className="p-4">
          <img src="/icons/arrow-left.svg" alt="arrow" width={20} height={20} />
        </Link>
      </div>
      <div className="feed-content-container grid grid-cols-2 mb-[50px] h-[500px]">
        <FeedImage feedImage={data[0]} />
        <FeedContent feedData={data[0]} commentDataList={commentDataList} />
      </div>
    </>
  );
}
