"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState(""); //NOTE - next/navigation으로 부터 import 해주기
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };
  const onKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className="input-area flex flex-col text-center">
      <div className="inputWrapper flex gap-2 p-4 w-[600px] h-[46px] rounded-3xl shadow-md">
        <button onSubmit={onSubmit}>
          <img src="icons/search.svg" alt="search" width={20} height={20} />
        </button>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDownSearch}
          placeholder="검색어를 입력하세요"
          className="w-full h-full text-[15px] focus:outline-0"
        />
      </div>
    </div>
  );
}
