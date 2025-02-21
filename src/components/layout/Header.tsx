import Link from "next/link";
import HeaderClient from "./Header-client";

export default function Header() {
  return (
    <div className="flex justify-between items-center border-b-[1px] h-[64px] px-[50px] ">
      <div className="flex gap-[50px]">
        <Link href={"/"}>
          <img
            src="/images/bookkki-icon.png"
            alt="bookkki-icon"
            height={40}
            width={40}
          />
        </Link>
        <div className="flex gap-[50px] mt-[10px]">
          <Link href={"/feed"}>피드</Link>
          <Link href={"/my-books"}>내 서재</Link>
          <Link href={"/chatting"}>챗챗</Link>
        </div>
      </div>
      <HeaderClient />
    </div>
  );
}
