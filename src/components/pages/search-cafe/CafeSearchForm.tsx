"use client";

import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import searchIcon from "@/../../public/icons/search.svg";
import Image from "next/image";

export default function CafeSearchForm({
  onChange,
}: {
  onChange: (text: string) => void;
}) {
  const [searchText, setSearchText] = useState("");

  // 디바운스된 값
  const debouncedText = useDebounce(searchText, 1000);

  // 디바운스된 값이 바뀔 때만 부모에게 전달
  useEffect(() => {
    onChange(debouncedText);
  }, [debouncedText, onChange]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="input-area flex ">
        <div className="inputWrapper flex gap-2 px-4 w-1/2 h-12 rounded-full bg-gray-100">
          <button>
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
