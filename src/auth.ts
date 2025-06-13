// nextAuth의 configuration

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@/shared/utils/supabase/server";
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

        // credentials 인자 값을 통해 사용자가 입력한 이메일, 패스워드 추출
        if (!credentials?.userID || !credentials?.password) return null;

        //authorize 함수에서 유저가 입력한 아이디, 패스워드를 받음
        const { userID, password } = credentials;

        //Supabase에서 해당 아이디의 유저를 조회
        const { data: loginUser, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", userID)
          .single();

        if (error || !loginUser)
          throw new Error("로그인 정보가 일치하지 않습니다");

        // 패스워드 검증
        const isValid = await bcrypt.compare(
          password as string,
          loginUser.password
        );
        if (!isValid) throw new Error("로그인 정보가 일치하지 않습니다");

        // 성공 시 유저 정보 반환
        return {
          id: loginUser.id,
          userId: loginUser.user_id, //유저ID
          nickname: loginUser.nickname, //유저닉네임
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // const u = user as any; // 👈 이건 타입 회피용, typescript 안전 처리 시 확장 필요
        token.id = user.id;
        token.userId = user.userId;
        token.nickname = user.nickname;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.userId = token.userId as string;
        session.user.nickname = token.nickname as string;
      }
      return session;
    },
  },
});
