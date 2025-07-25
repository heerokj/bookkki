import AuthForm from "@/components/pages/auth/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 - 북끼",
  description: "북끼 회원가입 페이지 입니다.",
};

export default function SignUpPage() {
  return <AuthForm mode="signUp" />;
}
