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
      <button onClick={onclickSignIn}>로그인</button>
      <button>다크모드</button>
    </div>
  );
}
