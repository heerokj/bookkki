import SkeletonBox from "./SkeletonBox";

export default function FeedListSkeleton() {
  return (
    <>
      <div className="skeleton-container border rounded-lg shadow-sm">
        <div className="skeleton-heading flex justify-between p-2">
          <div className="flex gap-2 h-[35px]">
            <SkeletonBox width="w-[35px]" height="h-[35px]" rounded="full" />
            <SkeletonBox width="w-28" height="h-4" className="mt-4" />
          </div>
        </div>
        <SkeletonBox height="h-[300px]" />
        <div className="skeleton-content h-[65px] p-2">
          <SkeletonBox width="w-28" height="h-4" className="my-3" />
          <SkeletonBox width="w-20" height="h-2" className="my-3" />
        </div>
      </div>
    </>
  );
}
