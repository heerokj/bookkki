"use client";

import Profile from "../Profile";
import { useRouter } from "next/navigation";

export default function HeaderClient() {
  const router = useRouter();
  const onclickSignIn = () => {
    router.push("/sign-in");
  };
  return (
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
  );
}
