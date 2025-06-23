import type { Metadata } from "next";
import "./globals.css";
import SessionProviders from "@/providers/SessionProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "북끼",
  description: "도서를 검색하고 읽은 책을 공유하는 서비스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SessionProviders>
          <ReactQueryProvider>
            <main>{children}</main>
          </ReactQueryProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
