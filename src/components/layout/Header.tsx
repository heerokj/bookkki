"use client";

import { HEADER_LISTS } from "@/shared/constants/header";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Avatar from "boring-avatars";

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
            {userData.profile_url ? (
              <div className="w-[35px] h-[35px] overflow-hidden">
                <Image
                  src={userData.profile_url}
                  width={40}
                  height={40}
                  alt={userData.nickname ?? "Avatar"}
                  style={{ borderRadius: "50%" }}
                  className="w-full h-full object-full"
                />
              </div>
            ) : (
              <div className="w-[35px] h-[35px] overflow-hidden">
                <Avatar name="Sacagawea" variant="beam" size={30} />
              </div>
            )}
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
