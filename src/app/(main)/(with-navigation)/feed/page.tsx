import Link from "next/link";

// 피드 컴포넌트
const FeedItems = () => {
  // posts 테이블에서 데이터 가져오기
  return (
    <div className="grid grid-cols-3">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  );
};

//피드 페이지 컴포넌트
export default function Feed() {
  return (
    <div className="flex flex-col justify-center mx-[50px]">
      <div>
        <Link href={"/write"}>포스트쓰기</Link>
      </div>
      <FeedItems />
    </div>
  );
}
