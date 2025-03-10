"use client";

import { login } from "@/lib/actions/auth";

export default function SocialLoinButtons() {
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
      <button onClick={() => login()}>
        <img src="images/github_btn.png" alt="깃허브" height={40} width={40} />
      </button>
    </div>
  );
}
