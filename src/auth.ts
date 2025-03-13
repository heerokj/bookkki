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
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "./utils/supabase/server";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Kakao,
    Naver,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userID: { label: "userID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const supabase = await createClient();
        //authorize 함수에서 유저가 입력한 아이디, 패스워드를 받음
        const { userID, password } = credentials;

        //Supabase에서 해당 아이디의 유저를 조회
        const { data: loginUser, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", userID)
          .single();

        if (error || !loginUser) throw new Error("User not found");

        //패스워드 검증
        const isValid = bcrypt.compare(password as string, loginUser.password);
        if (!isValid) throw new Error("Invalid credentials");

        // 성공 시 유저 정보 반환
        return { id: loginUser.user_id, nickname: loginUser.nickname };
      },
    }),
  ],
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
