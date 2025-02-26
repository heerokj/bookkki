import FeedCards from "@/components/feed/FeedCards";
import Link from "next/link";

//SECTION - 피드 페이지 컴포넌트
export default async function Feed() {
  return (
    <div className="mb-6">
      <div className="write-icon-container flex justify-end">
        <Link href={"/write"} className="p-4">
          <img src="/icons/pencil-line.svg" alt="" width={20} height={20} />
        </Link>
      </div>
      <FeedCards />
    </div>
  );
}
