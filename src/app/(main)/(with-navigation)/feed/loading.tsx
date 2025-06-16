import FeedListSkeleton from "@/components/skeleton/FeedListSkeleton";
import React from "react";

export default function Loading() {
  const count = 6;
  return (
    <div className="mb-6">
      <div className="h-[50px]"></div>
      <div className="grid grid-cols-3 gap-4">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <FeedListSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}
