import AuthForm from "@/components/pages/auth/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 - 북끼",
  description: "북끼 로그인 페이지 입니다.",
};

export default function SignInPage() {
  return <AuthForm mode="signIn" />;
}
