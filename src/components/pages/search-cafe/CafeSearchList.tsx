"use client";
import React from "react";
import CafeCard from "./CafeCard";
import KaKaoMap from "./KaKaoMap";
import { useGetCafeList } from "@/hooks/use-cafe";

export default function CafeSearchList() {
  const { data: cafeList, isLoading, isError } = useGetCafeList();

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="search-wrap mt-7">
      <div className="search-result flex gap-6">
        <div className="search-result-list w-1/2 flex flex-col gap-4">
          {cafeList?.map((cafe, index) => (
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
