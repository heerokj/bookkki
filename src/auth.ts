// nextAuth의 configuration
// NextAuth 설정 및 인증 함수 제공

// NOTE - 역할 정리
// NextAuth()를 호출하여 인증 설정을 만듦
// providers: [GitHub]를 통해 GitHub 소셜 로그인을 활성화
// auth: 현재 로그인된 사용자 정보를 가져오는 함수
// handlers: GET과 POST 요청을 처리하는 핸들러 (API 라우트에서 사용됨)

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
        const isValid = bcrypt.compare(password as string, loginUser.password); //bcrypt.compare는 비동기 함수

        //그런데 bcrypt.compare()는 평문 vs 해시된 비밀번호를 비교하는 함수..

        if (!isValid) throw new Error("패스워드가 잘못되었습니다");

        // 성공 시 유저 정보 반환
        return {
          id: loginUser.user_id,
          name: loginUser.nickname, // 토큰 name에 닉네임 넣기(일반 로그인 시)
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
      }
      return token;
    },
  },
});
