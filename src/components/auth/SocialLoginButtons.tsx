"use server";
import { auth } from "@/auth";
import { SignInButton } from "./SignInBtn";

export default async function SocialLoinButtons() {
  const session = await auth();
  console.log("🚀 ~ SocialLoinButtons ~ session:", session);

  if (session?.user) {
    alert("로그인 되었습니다.");
  }

  return (
    <div className="social-login-buttons flex gap-4">
      <button>
        <img
          src="images/kakao_btn_square.png"
          alt="카카오"
          height={40}
          width={40}
          className="rounded-[50%]"
        />
      </button>
      <button>
        <img
          src="images/naver_btn_circle.png"
          alt="네이버"
          height={40}
          width={40}
        />
      </button>
      <SignInButton />
    </div>
  );
}
