"use client";

import { HEADER_LISTS } from "@/shared/constants/header";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Profile from "../common/Profile";

export default function Header() {
  const userData = useContext(UserContext);

  return (
    <div className="flex justify-between items-center border-b-[1px] h-[64px]">
      <div className="flex gap-[50px]">
        <div className="flex gap-4 mt-[10px]">
          {HEADER_LISTS.map((header) => {
            return (
              <Link key={`header${header.href}`} href={header.href}>
                {header.text === "홈" ? (
                  <Image
                    src="/images/bookkki-icon.png"
                    alt="bookkki-icon"
                    height={40}
                    width={40}
                    className="w-[40px] h-[40px]"
                  />
                ) : (
                  <div className="text-[17px] px-4 pt-2 font-bold">
                    {header.text}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4">
        {userData ? (
          <>
            <div className="pt-2">
              <b>{userData.nickname}</b> 님 환영합니다!
            </div>
            <Profile info={userData} />
            <button
              onClick={() => signOut({ redirectTo: "/" })}
              className="w-[80px] h-[35px] p-[7px] px-[15px] rounded-md bg-[#84bbe1] hover:bg-[#00bbf9] text-white text-[13px]"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <button className="p-[7px] px-[15px] rounded-md bg-[#84bbe1] hover:bg-[#00bbf9] text-white text-[14px]">
                로그인
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
