"use client";
import React, { useEffect } from "react";
import CafeCard from "./CafeCard";
import KaKaoMap from "./KaKaoMap";
import { useGetInitialCafe, useGetSearchCafe } from "@/hooks/use-cafe";
import { useInView } from "react-intersection-observer";

export default function CafeSearchList({ searchText }: { searchText: string }) {
  const [ref, inView] = useInView();
  const isSearching = Boolean(searchText?.trim()); // 검색 중인지 여부 판단

  const {
    data: initialData,
    isLoading: isInitialLoading,
    isError: isInitialError,
  } = useGetInitialCafe();

  // 검색 시 데이터 불러오기
  const {
    data,
    isLoading: isSearchLoading,
    isError: isSearchError,
    fetchNextPage,
    hasNextPage,
  } = useGetSearchCafe(searchText);

  const searchData = data?.pages.flatMap((page) => page?.data) ?? [];

  useEffect(() => {
    if (!isSearching) return;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isSearching]);

  if (isInitialLoading) return <span>데이터 가져오는 중...</span>;
  if (isInitialError) return <span>오류가 발생했습니다</span>;
  if (isSearchLoading) return <span>검색중...</span>;
  if (isSearchError) return <span>검색 중 오류가 발생했습니다</span>;

  return (
    <div className="search-wrap mt-7">
      <div className="search-result flex gap-6 h-[730px]">
        <div className="search-result-list w-1/2 overflow-y-auto">
          <div className="flex flex-col gap-4 ">
            {initialData?.map((cafe, index) => (
              <CafeCard
                key={`${cafe.CNTC_RESRCE_NO}-${index}`}
                title={cafe.TITLE}
                address={cafe.ADDRESS}
              />
            ))}
          </div>
          <div ref={ref} className="text-center pt-4">
            {isSearching && (
              <div ref={ref} className="text-center">
                {isSearchLoading ? (
                  <div>로딩중...</div>
                ) : hasNextPage ? (
                  <div>더보기</div>
                ) : (
                  <div>모든 피드를 불러왔습니다.</div>
                )}
              </div>
            )}
          </div>
        </div>
        <KaKaoMap />
      </div>
    </div>
  );
}

/*
1. 첫 진입 시 데이터는 기본 데이터 (5개) - 더보기, 모든 피드를 불러왔습니다. 문구 없음
2. 검색하면 검색데이터 보여줌 & 기본 데이터는 사라짐
3. 검색바에 검색에 지우면 다시 기본데이터 보여줌
*/
