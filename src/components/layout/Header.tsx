"use client";

import { HEADER_LISTS } from "@/shared/constants/header";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center border-b-[1px] h-[64px]">
      <div className="flex gap-[50px]">
        <div className="flex gap-4  mt-[10px]">
          {HEADER_LISTS.map((header) => {
            return (
              <Link key={`header${header.href}`} href={header.href}>
                {header.text === "홈" ? (
                  <Image
                    src="/images/bookkki-icon.png"
                    alt="bookkki-icon"
                    height={40}
                    width={40}
                    className="pb-2"
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
        <Image src="/icons/moon.svg" alt="moon" height={25} width={25} />
        {status === "authenticated" && session?.user ? (
          <>
            <div className="pt-2">
              <b>{session.user.name}</b> 님 환영합니다!
            </div>
            {session.user.image && (
              <div className="w-[35px] h-[35px] overflow-hidden">
                <Image
                  src={session.user.image}
                  width={40}
                  height={40}
                  alt={session.user.name ?? "Avatar"}
                  style={{ borderRadius: "50%" }}
                  className="w-full h-full object-full"
                />
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
              <button
                // onClick={() => router.push("/sign-in")}
                className="p-[7px] px-[15px] rounded-md bg-[#84bbe1] hover:bg-[#00bbf9] text-white text-[14px]"
              >
                로그인
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
