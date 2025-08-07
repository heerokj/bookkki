"use client";
import React, { useEffect } from "react";
import CafeCard from "./CafeCard";
import KaKaoMap from "./KaKaoMap";
import { useGetSearchCafe } from "@/hooks/use-cafe";
import { useInView } from "react-intersection-observer";

export default function CafeSearchList({ searchText }: { searchText: string }) {
  const [ref, inView] = useInView();
  // 검색 시 데이터 불러오기
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useGetSearchCafe(searchText);
  const searchCafe = data?.pages.flatMap((page) => page?.data) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <span>로딩중입니다...</span>;
  if (error) return <span>오류가 발생했습니다 : {error.message}</span>;

  return (
    <div className="search-wrap mt-7">
      <div className="search-result flex gap-6 h-[660px]">
        <div className="search-result-list w-1/2 overflow-y-auto">
          <div className="flex flex-col gap-4 ">
            {searchCafe.map((cafe, index) => (
              <CafeCard
                key={`${cafe.CNTC_RESRCE_NO}-${index}`}
                title={cafe.TITLE}
                address={cafe.ADDRESS}
              />
            ))}
          </div>
          <div ref={ref} className="text-center py-[40px]">
            {hasNextPage ? (
              <div>더보기</div>
            ) : (
              <div>모든 피드를 불러왔습니다.</div>
            )}
          </div>
        </div>
        <KaKaoMap />
      </div>
    </div>
  );
}
