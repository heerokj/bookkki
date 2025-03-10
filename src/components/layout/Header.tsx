"use client";

import { HEADER_LISTS } from "@/shared/constants/header";
import { useRouter } from "next/navigation";
import Profile from "../Profile";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const onclickSignIn = () => {
    router.push("/sign-in");
  };
  return (
    <div className="flex justify-between items-center border-b-[1px] h-[64px]">
      <div className="flex gap-[50px]">
        <div className="flex gap-4  mt-[10px]">
          {HEADER_LISTS.map((header) => {
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
      <div className="flex gap-4">
        {/* <span>아래 Profile은 임시프로필</span> */}
        <Profile />
        <img src="/icons/moon.svg" alt="moon" height={20} width={20} />
        <button
          onClick={onclickSignIn}
          className="p-[7px] px-[13px] rounded-md bg-[#84bbe1] hover:bg-[#00bbf9] text-white text-[14px]"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
