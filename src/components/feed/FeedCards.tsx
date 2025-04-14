"use client";
import { useGetFeedList } from "@/hooks/use-feeds";
import FeedCard from "./FeedCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function FeedCards() {
  const [ref, inView] = useInView();
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGetFeedList();

  const feedList = data?.pages.flatMap((page) => page?.data) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <span>로딩중입니다...</span>;
  if (error) return <span>오류가 발생했습니다 : {error.message}</span>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {feedList && feedList.length > 0 ? (
          feedList.map((post) => <FeedCard key={post.id} {...post} />)
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
      <div ref={ref} className="text-center pt-[40px]">
        {hasNextPage ? <div>더보기</div> : <div>모든 피드를 불러왔습니다.</div>}
      </div>
    </div>
  );
}
