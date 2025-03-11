//인증(Authentication )을 위한 api handler
//Next.js의 API Route 역할 = NextAuth의 API 엔드포인트를 설정하는 역할
//클라이언트가 /api/auth/* 경로로 요청을 보내면 NextAuth가 이를 처리
import { handlers } from "@/auth";

// handlers는 NextAuth()에서 제공하는 기본 핸들러
// GET과 POST 요청을 처리
// handlers 객체에 포함된 GET과 POST 메서드는 NextAuth의 API 요청을 처리하는 엔드포인트를 자동으로 생성하는 역할
export const { GET, POST } = handlers;
