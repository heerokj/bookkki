"use client";

import { login } from "@/lib/actions/auth";

export const SignInButton = () => {
  return (
    <button onClick={() => login()}>
      <img src="images/github_btn.png" alt="깃허브" height={40} width={40} />
    </button>
  );
};
