import React from "react";
import CafeCard from "./CafeCard";

const CAFE = [1, 2, 3, 4, 5, 6, 7];
export default function CafeSearch() {
  return (
    <div className="search-wrap mt-7">
      <div className="search-result flex gap-6">
        <div className="search-result-list w-1/2 flex flex-col gap-4">
          {CAFE.map((cafe, index) => (
            <CafeCard key={`${cafe}-${index}`} />
          ))}
        </div>
        <div className="search-result-map w-1/2 border-2">지도</div>
      </div>
    </div>
  );
}
