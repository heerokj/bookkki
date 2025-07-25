import React from "react";
import Image from "next/image";
import cafeImg from "../../../../public/images/no-image-cafe.jpeg";

export default function CafeCard() {
  return (
    <div className="search-cafe-card flex gap-4 border-2 rounded-lg p-2">
      <div className="h-[100px] w-[150px]">
        <Image
          src={cafeImg}
          width={150}
          height={100}
          alt="book"
          className="w-full h-full rounded-md"
        />
      </div>
      <div className="cafe-info pt-2">
        <p className="cafe-name text-lg font-bold text-wrap">소소책방</p>
        <p className="cafe-address text-sm text-gray-400">
          경상남도 진주시 망경동 망경북길 28 KR
        </p>
      </div>
    </div>
  );
}
