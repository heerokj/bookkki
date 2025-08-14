import React from "react";
import Image from "next/image";
import cafeImg from "../../../../public/images/no-image-cafe.jpeg";

export default function CafeCard({
  title,
  address,
}: {
  title: string;
  address: string;
}) {
  return (
    <div className="search-cafe-card flex gap-4 border-2 rounded-lg p-2 ">
      <div className="h-[105px] w-[150px]">
        <Image
          src={cafeImg}
          width={150}
          height={100}
          alt="book"
          className="w-full h-full rounded-md"
          priority
        />
      </div>
      <div className="cafe-info pt-2">
        <p className="cafe-name text-lg font-bold text-wrap">{title}</p>
        <p className="cafe-address text-sm text-gray-400">{address}</p>
      </div>
    </div>
  );
}
