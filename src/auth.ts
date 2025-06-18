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
        // jwt의 user로 반환
        return {
          id: loginUser.id, //PK ID
          userId: loginUser.user_id, //유저ID
          name: loginUser.nickname, //유저닉네임
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const supabase = await createClient();
      // 소셜로그인 경우
      if (user && account?.provider !== "credentials") {
        // 유저 정보 추출
        const user_id = account?.providerAccountId;
        const nickname = user.name;
        const profile_url = user.image;
        const provider = account?.provider;

        // DB에 유저 존재 여부 확인
        const { data: loginUser } = await supabase
          .from("users")
          .select()
          .eq("user_id", user_id)
          .single();

        // 존재하지 않으면 유저 저장
        if (!loginUser) {
          const { data: insertedUser, error: Error } = await supabase
            .from("users")
            .insert({
              user_id,
              nickname,
              profile_url,
              provider,
            })
            .select()
            .single();

          if (Error) console.error("소셜로그인 유저 저장 실패:", Error.message);

          // 댓글 등록시 session의 정보를 사용하는데 그 전, session에 유저 pk ID 를 넣기위함
          if (insertedUser) {
            user.id = insertedUser.id;
          }
        } else {
          user.id = loginUser.id;
        }
        // 존재하면 패스
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userId = user.userId;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.userId = token.userId as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
