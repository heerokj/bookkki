"use client";

import React from "react";
import Image from "next/image";
import cafeImg from "/public/images/no-image-cafe.jpeg";
import { useGetInitialCafeList } from "@/hooks/use-cafe";
import MainCafeListSkeleton from "@/components/skeleton/MainCafeFeedListSkeleton";

export default function BookCafeList() {
  const { data: cafeList, isLoading, isError } = useGetInitialCafeList();

  if (isLoading) return <MainCafeListSkeleton />;
  if (isError) return <div>에러</div>;

  return (
    <ul className="cafe-wrapper flex gap-6 justify-between">
      {cafeList &&
        cafeList.map((cafe, index) => (
          <li
            className="bookkki-cafe-card hover:cursor-pointer"
            key={`${cafe.CNTC_RESRCE_NO}-${index}`}
          >
            <a>
              <div className="cafe-thumbnail h-[170px] w-[220px]">
                <Image
                  src={cafeImg}
                  width={150}
                  height={100}
                  alt="cafe"
                  className="w-full h-full rounded-md"
                />
              </div>
              <div className="cafe-info pt-2 pb-4 w-[210px]">
                <p className="cafe-name text-base font-bold text-wrap">
                  {cafe.TITLE}
                </p>
                <p className="cafe-address text-sm text-gray-400 ">
                  {cafe.ADDRESS}
                </p>
              </div>
            </a>
          </li>
        ))}
    </ul>
  );
}
