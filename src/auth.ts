// nextAuth의 configuration
// NextAuth 설정 및 인증 함수 제공

// NOTE - 역할 정리
// NextAuth()를 호출하여 인증 설정을 만듦
// providers: [GitHub]를 통해 GitHub 소셜 로그인을 활성화
// auth: 현재 로그인된 사용자 정보를 가져오는 함수
// handlers: GET과 POST 요청을 처리하는 핸들러 (API 라우트에서 사용됨)
// signIn: 로그인 요청 함수
// signOut: 로그아웃 요청 함수

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import { createClient } from "./utils/supabase/server";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Kakao, Naver],
  callbacks: {
    async signIn({ user, account }) {
      const supabase = await createClient();
      //사용자 정보 없을 경우 로그인 차단
      if (!user) return false;

      //기존에 이미 로그인 한 회원인지 확인
      const { data: existingUser } = await supabase
        .from("users")
        .select("user_id")
        .eq("user_id", user.name)
        .single();

      if (existingUser?.user_id === user.name) {
        return true; // 로그인 성공
      } else {
        // 사용자 정보 DB에 저장
        const { error } = await supabase.from("users").insert({
          user_id: user.name,
          nickname: user.name,
          email: user.email,
          profile_url: user.image,
          provider: account?.provider,
        });
        if (error) {
          console.error("DB 저장 오류:", error);
          return false;
        }
      }
      return true; // 로그인 성공
    },
  },
});
