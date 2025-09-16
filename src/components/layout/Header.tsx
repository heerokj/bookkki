"use client";

import { HEADER_LISTS } from "@/shared/constants/header";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Profile from "../common/Profile";
import { usePathname } from "next/navigation";
import BlueButton from "../common/BlueButton";

export default function Header() {
  const userData = useContext(UserContext);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center border-b-[1px] h-16">
          {/* 왼쪽 */}
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
          {/* 오른쪽 */}
          <div className="flex gap-4">
            {userData ? (
              <div className="flex gap-4 items-center">
                <p>
                  <b>{userData.nickname}</b> 님 환영합니다!
                </p>
                <Profile info={userData} />
                <BlueButton
                  title="로그아웃"
                  onClick={() => signOut({ redirectTo: "/" })}
                />
              </div>
            ) : (
              <Link href="/sign-in">
                <BlueButton title="로그인" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
