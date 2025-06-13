import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    userId?: string;
    nickname?: string;
  }

  interface Session {
    user: {
      id: string;
      userId?: string | null;
      nickname?: string | null;
    };
  }

  interface JWT {
    id: string;
    userId?: string | null;
    nickname?: string | null;
  }
}
