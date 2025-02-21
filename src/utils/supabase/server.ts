import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// // export const getIsLogin = async () => {
// //   const serverClient = createClient();
// //   const {
// //     data: { session },
// //   } = await serverClient.auth.getSession();
// //   return !!session;
// // };

// //Next.js 서버 환경 (server components, API routes, middleware 등)에서 사용 가능
// //쿠키 기반 인증 지원 → 로그인 상태를 유지할 수 있음
// //cookies()를 사용하여 Next.js의 서버 사이드 쿠키를 활용
