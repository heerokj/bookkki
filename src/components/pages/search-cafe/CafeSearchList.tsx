"use client";
import React from "react";
import CafeCard from "./CafeCard";
import KaKaoMap from "./KaKaoMap";
import { useGetSearchCafe } from "@/hooks/use-cafe";

export default function CafeSearchList({ searchText }: { searchText: string }) {
  // 검색 시 데이터 불러오기
  const { searchList, isLoading, isError } = useGetSearchCafe(searchText);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="search-wrap mt-7">
      <div className="search-result flex gap-6 h-[660px]">
        <div className="search-result-list w-1/2 flex flex-col gap-4">
          {searchList.map((cafe, index) => (
            <CafeCard
              key={`${cafe.CNTC_RESRCE_NO}-${index}`}
              title={cafe.TITLE}
              address={cafe.ADDRESS}
            />
          ))}
        </div>
        <KaKaoMap />
      </div>
    </div>
  );
}
