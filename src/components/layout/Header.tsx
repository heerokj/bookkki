import Link from "next/link";
import HeaderClient from "./Header-client";

export default function Header() {
  return (
    <div className="flex justify-between items-center border-b-[1px] h-[64px] px-[50px] ">
      <div className="flex gap-8">
        <Link href={"/"}>로고</Link>
        <Link href={"/feed"}>피드</Link>
        <Link href={"/my-books"}>내 서재</Link>
        <Link href={"/chatting"}>챗챗</Link>
      </div>
      <HeaderClient />
    </div>
  );
}
