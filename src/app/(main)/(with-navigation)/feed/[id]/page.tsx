import FeedContent from "@/components/feedDetail/FeedContent";
import FeedImage from "@/components/feedDetail/FeedImage";
import { createClient } from "@/shared/utils/supabase/server";
import { fetchFeedDetailAction } from "@/lib/actions/read-feed-detail-action";
import { fetchCommentListAction } from "@/lib/actions/read-comment-action";
import type { Metadata } from "next";
import BackButton from "@/components/common/BackButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("title").eq("id", id);

  if (!data) {
    return {
      title: "피드 상세 - Not Found",
      description: "존재하지 않는 게시글입니다.",
    };
  }

  const postTitle = data[0].title;

  return {
    title: `${postTitle} - 북끼`,
    description: `게시글 "${postTitle}"의 상세 페이지입니다.`,
    openGraph: {
      title: `${postTitle} - 북끼`,
      description: `게시글 "${postTitle}"에 어떤 글이 올라왔을까요?`,
    },
  };
}

export default async function FeedDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const postDetailData = await fetchFeedDetailAction(id);
  const commentDataList = await fetchCommentListAction(id);

  if (!postDetailData) {
    return <div>삭제된 포스터거나 데이터를 불러오는데 오류가 발생했습니다</div>;
  }
  if (!commentDataList) {
    return <div>댓글 데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="feed-image-container flex justify-end ">
        <BackButton />
      </div>
      <div className="feed-content-container grid grid-cols-2 mb-[50px] h-[500px]">
        <FeedImage feedImage={postDetailData} />
        <FeedContent
          feedData={postDetailData}
          commentDataList={commentDataList}
        />
      </div>
    </>
  );
}
