"use client";
import { useGetFeedList } from "@/hooks/useFeeds";
import FeedCard from "./FeedCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function FeedCards() {
  const [ref, inView] = useInView();
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGetFeedList();

  //TODO -  차이점 뭐지?
  // const feedList = data?.pages.flatMap((page) => page?.data) || [];
  const feedList = data?.pages.flatMap((page) => page?.data) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <span>로딩중입니다...</span>;
  if (error) return <span>오류가 발생했습니다 : {error.message}</span>;

  //NOTE - 데이터 보낼때 {...post}를 자식컴포넌트로 보냄
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {feedList && feedList.length > 0 ? (
          feedList.map((post) => <FeedCard key={post.id} {...post} />)
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
      <div ref={ref} className="text-center">
        {hasNextPage ? <div>더보기</div> : <div>모든 피드를 불러왔습니다.</div>}
      </div>
    </div>
  );
}
