import React from "react";

export default function CafeSearchForm() {
  return (
    <form>
      <div className="input-area flex ">
        <div className="inputWrapper flex gap-2 px-4 w-[400px] h-12 rounded-full bg-gray-100">
          <button>
            <img src="icons/search.svg" alt="search" width={20} height={20} />
          </button>
          <input
            placeholder="카페 검색"
            className="w-full h-full text-[17px] focus:outline-0 bg-transparent"
          />
        </div>
      </div>
    </form>
  );
}
