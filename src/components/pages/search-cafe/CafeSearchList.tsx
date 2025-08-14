"use client";
import React, { useEffect } from "react";
import CafeCard from "./CafeCard";
import KaKaoMap from "./KaKaoMap";
import { useGetInitialCafe, useGetSearchCafe } from "@/hooks/use-cafe";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";

export default function CafeSearchList() {
  const [ref, inView] = useInView();

  // 쿼리 파라미터 가져오기
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") as string;

  // 검색어 있는지 판단 (리스트 분기처리용)
  const keywordExistence = Boolean(keyword?.trim());

  // 초기 데이터 불러오기
  const {
    data: initialCafeList,
    isLoading: isInitialLoading,
    isError: isInitialError,
  } = useGetInitialCafe();

  // 검색 시 데이터 불러오기
  const {
    data: isSearchCafeList,
    isLoading: isSearchLoading,
    isError: isSearchError,
    fetchNextPage,
    hasNextPage,
  } = useGetSearchCafe(keyword);

  const searchList =
    isSearchCafeList?.pages.flatMap((page) => page?.data) ?? [];
  const showSearchStatus = keywordExistence && searchList.length >= 6; // 검색어 있거나 검색 결과가 6개 미만인경우

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isInitialLoading) return <span>데이터 가져오는 중...</span>;
  if (isInitialError) return <span>오류가 발생했습니다</span>;
  if (isSearchLoading) return <span>검색중...</span>;
  if (isSearchError) return <span>검색 중 오류가 발생했습니다</span>;

  return (
    <div className="search-wrap mt-7">
      <div className="search-result flex gap-6 h-[700px]">
        <div className="search-result-list w-1/2 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {!keywordExistence &&
              initialCafeList?.map((cafe) => (
                <CafeCard
                  key={cafe.CNTC_RESRCE_NO}
                  title={cafe.TITLE}
                  address={cafe.ADDRESS}
                />
              ))}
            {keywordExistence &&
              searchList?.map((cafe) => (
                <CafeCard
                  key={cafe.CNTC_RESRCE_NO}
                  title={cafe.TITLE}
                  address={cafe.ADDRESS}
                />
              ))}
            {keywordExistence &&
              !isSearchLoading &&
              searchList.length === 0 && (
                <div className="py-6 text-center text-gray-500">
                  검색 결과가 없습니다.
                </div>
              )}
          </div>
          {showSearchStatus && (
            <div ref={ref} className="text-center pt-4">
              <div className="text-center">
                {isSearchLoading ? (
                  <div>데이터 가져오는 중...</div>
                ) : hasNextPage ? (
                  <div>더보기</div>
                ) : (
                  <div>모든 피드를 불러왔습니다.</div>
                )}
              </div>
            </div>
          )}
        </div>
        <KaKaoMap
          initialCafe={initialCafeList![0]}
          searchCafe={searchList![0]}
        />
      </div>
    </div>
  );
}
