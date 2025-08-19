import React from "react";
import SkeletonBox from "./SkeletonBox";

export default function SearchListSkeleton() {
  const count = 10;
  return (
    <div>
      <p className="py-[20px]"></p>
      <div className="grid grid-cols-5 gap-6">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <SearchCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}

const SearchCardSkeleton = () => {
  return (
    <div className="overflow-hidden">
      <SkeletonBox width="w-[220px]" height="h-[300px]" rounded="rounded-md" />
      <div className="pt-2 pb-4">
        <SkeletonBox width="w-30" height="h-3" className="my-3" />
        <SkeletonBox width="w-28" height="h-3" className="my-3" />
      </div>
    </div>
  );
};
