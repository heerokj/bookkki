import React from "react";
import SkeletonBox from "./SkeletonBox";

export default function MainCafeFeedListSkeleton() {
  return (
    <ul className="cafe-wrapper flex gap-6 justify-between">
      <MainCafeSkeleton />
      <MainCafeSkeleton />
      <MainCafeSkeleton />
      <MainCafeSkeleton />
      <MainCafeSkeleton />
    </ul>
  );
}

const MainCafeSkeleton = () => {
  return (
    <li className="bookkki-cafe-card hover:cursor-pointer">
      <SkeletonBox height="h-[170px] w-[220px]" rounded="rounded-md" />
      <div className="cafe-info pt-2 pb-4 w-[210px]">
        <SkeletonBox width="w-13" height="h-4" />
        <SkeletonBox width="w-25" height="h-2" className="my-3" />
      </div>
    </li>
  );
};
