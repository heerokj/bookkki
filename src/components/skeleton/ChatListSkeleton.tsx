import SkeletonBox from "./SkeletonBox";

export default function ChatListSkeleton() {
  return (
    <>
      <div className="border-2 rounded-md w-[250px] h-[200px] flex flex-col justify-center items-center">
        <SkeletonBox width="w-[150px]" height="h-[20px]" rounded="md" />
        <SkeletonBox
          width="w-[100px]"
          height="h-[40px]"
          rounded="md"
          className="mt-[30px] p-[7px]"
        />
      </div>
    </>
  );
}
