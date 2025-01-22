import Link from "next/link";

export default function Header() {
  return (
    <>
      <div>
        <span>로고</span>
        <Link href={"/feed"}>피드</Link>
        <Link href={"/"}>나의 책들</Link>
        <Link href={"/"}>챗챗</Link>
      </div>
      <div>다크모드 등등</div>
    </>
  );
}
