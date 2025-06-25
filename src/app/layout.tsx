import type { Metadata } from "next";
import "./globals.css";
import SessionProviders from "@/providers/SessionProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "북끼",
  description: "텍스트 힙! 도서를 검색하고 읽은 책을 북끼와 공유해봐요!",
  openGraph: {
    title: "북끼",
    description: "텍스트 힙! 도서를 검색하고 읽은 책을 북끼와 공유해봐요!",
    images: "https://bookkki.vercel.app/opengraph-image.png",
    url: "https://bookkki.vercel.app",
    siteName: "Bookkki | 북끼",
    locale: "ko_KR",
    type: "website",
  },
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
