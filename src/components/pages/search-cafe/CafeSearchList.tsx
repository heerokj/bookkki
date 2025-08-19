"use client";
import React, { useEffect, useMemo, useState } from "react";
import CafeCard from "./CafeCard";
import KaKaoMap from "./KaKaoMap";
import { useGetInitialCafe, useGetSearchCafe } from "@/hooks/use-cafe";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { CafeData } from "@/types/cafe";

export default function CafeSearchList() {
  const [ref, inView] = useInView();
  const [selectedCafe, setSelectedCafe] = useState<CafeData>();

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

  const searchList = useMemo(() => {
    return isSearchCafeList?.pages.flatMap((page) => page?.data) ?? [];
  }, [isSearchCafeList]);

  const showSearchStatus = keywordExistence && searchList.length >= 6; // 검색어 있거나 검색 결과가 6개 미만인경우

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (keywordExistence && searchList.length > 0) {
      setSelectedCafe(searchList[0]);
    } else if (!keywordExistence) {
      setSelectedCafe(initialCafeList?.[0]);
    }
  }, [initialCafeList, keywordExistence, searchList]);

  const handleClickCard = (clickCafe: CafeData) => {
    setSelectedCafe(clickCafe);
  };

  const list = keywordExistence ? searchList : initialCafeList;

  if (isInitialLoading) return <span>데이터 가져오는 중...</span>;
  if (isInitialError) return <span>오류가 발생했습니다</span>;
  if (isSearchError) return <span>검색 중 오류가 발생했습니다</span>;

  return (
    <div className="search-wrap mt-7 flex gap-2">
      <section className="search-result flex-1">
        <div className="search-result-list overflow-y-auto">
          <div className="flex flex-col gap-4">
            {list?.map((cafe) => (
              <div
                key={cafe.CNTC_RESRCE_NO}
                onClick={() => handleClickCard(cafe)}
              >
                <CafeCard title={cafe.TITLE} address={cafe.ADDRESS} />
              </div>
            ))}
            {keywordExistence &&
              !isSearchLoading &&
              (list?.length ?? 0) === 0 && (
                <p className="py-6 text-center text-gray-500">
                  검색 결과가 없습니다.
                </p>
              )}
          </div>

          {showSearchStatus && (
            <div ref={ref} className="text-center pt-4">
              {isSearchLoading ? (
                <div>데이터 가져오는 중...</div>
              ) : hasNextPage ? (
                <div>더보기</div>
              ) : (
                <div>모든 피드를 불러왔습니다.</div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="search-result-map flex-1">
        {selectedCafe && <KaKaoMap cafe={selectedCafe} />}
      </section>
    </div>
  );
}
