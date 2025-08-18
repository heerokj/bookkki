"use client";

import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import searchIcon from "@/../../public/icons/search.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function CafeSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //NOTE -  초기 검색어가 없다면 "", 검색어가 변경된다면 searchText 변경
  const [searchText, setSearchText] = useState(
    searchParams.get("keyword") || ""
  );

  // 디바운스 값
  const debouncedText = useDebounce(searchText, 1000);

  //NOTE - 디바운스 값이 변경될 때 URL 쿼리 업데이트
  useEffect(() => {
    if (debouncedText.trim()) {
      router.push(`/cafe-book?keyword=${encodeURIComponent(debouncedText)}`);
    } else {
      router.push(`/cafe-book`);
    }
  }, [debouncedText, router]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="input-area flex ">
        <div className="inputWrapper flex gap-2 px-4 w-1/2 h-12 rounded-full bg-gray-100">
          <button type="button" aria-label="검색">
            <Image src={searchIcon} width={20} height={20} alt="search" />
          </button>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="카페 검색"
            className="w-full h-full text-[17px] focus:outline-0 bg-transparent"
          />
        </div>
      </div>
    </form>
  );
}
