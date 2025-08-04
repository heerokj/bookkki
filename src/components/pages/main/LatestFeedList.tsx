"use client";

import React from "react";
import Image from "next/image";
import { useGetInitialFeedList } from "@/hooks/use-feeds";
import MainCafeFeedListSkeleton from "@/components/skeleton/MainCafeFeedListSkeleton";

export default function LatestFeedList() {
  const { data: feedList, isError, isLoading } = useGetInitialFeedList();

  if (isLoading) return <MainCafeFeedListSkeleton />;
  if (isError) return <div>에러</div>;
  return (
    <div>
      <ul className="book-wrapper flex gap-6 justify-between">
        {feedList?.map((book, index) => (
          <li
            className="bookkki-book-card hover:cursor-pointer"
            key={`${book.id}-${index}`}
          >
            <a>
              <div className="book-thumbnail h-[170px] w-[220px]">
                <Image
                  src={book.image_urls[0]}
                  width={150}
                  height={100}
                  alt="book"
                  className="w-full h-full rounded-md"
                />
              </div>
              <div className="book-info pt-2 pb-4 w-[210px]">
                <p className="title text-base font-bold text-wrap">
                  {book.title ? book.title : "제목없음"}
                </p>
                <p className="author text-sm text-gray-400 truncate">
                  {book.content}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
