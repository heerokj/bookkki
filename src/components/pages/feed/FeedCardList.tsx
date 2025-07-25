"use client";
import { useGetFeedList } from "@/hooks/use-feeds";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loading from "@/app/(main)/(with-navigation)/feed/loading";
import FeedCard from "./FeedCard";

export default function FeedCardList() {
  const [ref, inView] = useInView();
  const { data, isError, isLoading, fetchNextPage, hasNextPage } =
    useGetFeedList();

  const feedList = data?.pages.flatMap((page) => page?.data) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <span>로딩중입니다...</span>;
  if (isError) return <span>오류가 발생했습니다</span>;

  return (
    <div className="feed-container">
      <div className="feed-wrap grid grid-cols-3 gap-4">
        {feedList && feedList.length > 0 ? (
          feedList.map((post) => <FeedCard key={post.id} {...post} />)
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
      <div ref={ref} className="text-center pt-[40px]">
        {hasNextPage ? <Loading /> : <div>모든 피드를 불러왔습니다.</div>}
      </div>
    </div>
  );
}
