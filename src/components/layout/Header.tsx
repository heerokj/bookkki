import Link from "next/link";
import HeaderClient from "./Header-client";

const Header_List = [
  {
    text: "홈",
    href: "/",
  },
  {
    text: "피드",
    href: "/feed",
  },
  {
    text: "채팅",
    href: "/chat",
  },
  {
    text: "내 서재",
    href: "/my-books",
  },
];

export default function Header() {
  return (
    <div className="flex justify-between items-center border-b-[1px] h-[64px]">
      <div className="flex gap-[50px]">
        <div className="flex gap-4  mt-[10px]">
          {Header_List.map((header) => {
            return (
              <Link key={`header${header.href}`} href={header.href}>
                {header.text === "홈" ? (
                  <img
                    src="/images/bookkki-icon.png"
                    alt="bookkki-icon"
                    height={40}
                    width={40}
                  />
                ) : (
                  <div className="p-2 px-6">{header.text}</div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <HeaderClient />
    </div>
  );
}
