"use client";

import { HEADER_LISTS } from "@/shared/constants/header";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Profile from "../common/Profile";
import { usePathname } from "next/navigation";

export default function Header() {
  const userData = useContext(UserContext);
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center border-b-[1px] h-16">
      <div className="flex gap-[50px]">
        <div className="flex gap-10 items-center">
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
                  <p
                    className={`text-xl hover:text-gray-400 font-bold ${
                      pathname === header.href && "text-gray-400"
                    }`}
                  >
                    {header.text}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4">
        {userData ? (
          <div className="flex gap-4 items-center">
            <p>
              <b>{userData.nickname}</b> 님 환영합니다!
            </p>
            <Profile info={userData} />
            <button
              onClick={() => signOut({ redirectTo: "/" })}
              className="w-20 h-9 p-2 px-4 rounded-md bg-[#84bbe1] hover:bg-[#00bbf9] text-white text-[13px]"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Link href="/sign-in">
            <button className="p-2 px-4 rounded-md bg-[#84bbe1] hover:bg-[#00bbf9] text-white text-sm">
              로그인
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
