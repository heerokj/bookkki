export default function LoadingSkeleton() {
  return (
    <>
      <div className="skeleton-container border-[1px] rounded-sm shadow-sm">
        <div className="skeleton-heading flex justify-between p-2">
          <div className="flex gap-2 h-[35px]">
            <div className="skeleton-profile w-[35px] h-[35px] rounded-full bg-gray-300"></div>
            <div className="skeleton-nickname w-28 h-4 mt-4 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
        <div className="skeleton-img h-[300px] bg-gray-300"></div>
        <div className="h-[65px] p-2">
          <div className="w-28 h-4 bg-gray-300 rounded-sm"></div>
          <div className="w-20 h-2 my-3 bg-gray-300 rounded-sm"></div>
        </div>
      </div>
    </>
  );
}
