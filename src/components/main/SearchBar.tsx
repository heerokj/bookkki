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
    <div>
      <button onSubmit={onSubmit}>돋보기</button>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDownSearch}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
}
