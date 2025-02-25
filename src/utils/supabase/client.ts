//Supabase의 서버 사이드 렌더링(SSR) 지원 기능을 활용
//createBrowserClient()를 사용하여 클라이언트 전용 Supabase 인스턴스를 생성
//내부적으로 localStorage, sessionStorage 등을 활용할 수 있다
//브라우저 쿠키나 세션을 기반으로 동작하므로, 서버에서는 접근할 수 없음
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const browserClient = createClient();

export default browserClient;

// const supabase = createClientJs();
// export default supabase;
//@supabase/supabase-js 자체는 클라이언트 전용이 아님
//@supabase/supabase-js는 클라이언트 & 서버에서 모두 사용 가능
//클라이언트에서도 fetch API를 통해 Supabase 서버에 요청
// import { createClient } from "@supabase/supabase-js";

// export const createClientJs = () =>
//   createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );
