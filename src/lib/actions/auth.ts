"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => {
  await signIn("github", { redirectTo: "/" }); //로그인 후 메인페이지로 이동
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
